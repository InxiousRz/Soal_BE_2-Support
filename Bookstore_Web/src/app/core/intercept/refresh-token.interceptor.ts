import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of, finalize } from "rxjs";
import { catchError, filter, take, switchMap, map, tap} from "rxjs/operators";
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { ApiService } from '../services/api.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {


  refresh_token_inprogress: boolean = false;
  private refresh_token_subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private api_utilities: ApiUtilitiesService,
    private api: ApiService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const is_loged_in = this.api_utilities.checkLogin();
    if (is_loged_in) {
        let access_token = this.api_utilities.getActiveAccessToken();
        if(access_token){
          request = request.clone({headers: request.headers.set('Authorization', "Bearer " + access_token)});
        }
    }

    this.logWhatWeSend(request);

    return next.handle(request).pipe(

      // CATCH ERR
      catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<unknown>>) => {


        // UNAUTHORIZED
        if (error && error.status === 401) {

          console.log(error.error);

           // REFRESH TOKEN INVALID / EXPIRED
          if (
            error.error["error_key"] == "error_refresh_token_invalid" 
            || error.error["error_key"] == "error_refresh_token_expired" 
            || error.error["error_key"] == "error_invalid_token"
          ){

            this.api_utilities.renavigateLogin(
              error.error["error_message"],
              JSON.stringify(error.error, null, 2),
            );

            return next.handle(request);
          }

          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refresh_token_inprogress) {
            // If refresh_token_inprogress is true, we will wait until refresh_token_subject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refresh_token_subject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(request))
            );

          } else {

            this.refresh_token_inprogress = true;

            // Set the refresh_token_subject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refresh_token_subject.next(null);
            
            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {      

                this.refresh_token_subject.next(success);

                let new_access_token = this.api_utilities.getActiveAccessToken();
                if(new_access_token){
                  request = request.clone({headers: request.headers.set('Authorization', "Bearer " + new_access_token)});
                }
                

                return next.handle(request);
              }),
              // When the call to refreshToken completes we reset the refresh_token_inprogress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refresh_token_inprogress = false)
            );
          }
        } else {
          return throwError(() => error);
        }
      }),
      

      // TRANSLATE RESULT
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const modEvent = event.clone({ 
            body: this.api_utilities.translateResult(
              event,
              request.method,
              request.url
            )
          });
          
          return modEvent;
        }

        return event;
      })

    );
  }

  private refreshAccessToken(): Observable<any> {

    return this.api.refreshToken().pipe(
      map((response: HttpResponse<any>)=>{

        console.log(response);

        if(response.status === 200){

          if(response.body["Success"]){

            console.log("SET NEW TOKEN");

            this.api_utilities.loginAssignAuth(
              response.body["Modified_Payload"]["Body"]["Refresh_Token"],
              response.body["Modified_Payload"]["Body"]["Access_Token"]
            );


          } else {

            this.api_utilities.renavigateLogin(
              response.body["Modified_Payload"]["Body"]["error_message"],
              JSON.stringify(response.body["Modified_Payload"], null, 2),
            );

          }

        } 

        if(response.status === 401){

          this.api_utilities.renavigateLogin(
            response.body["Modified_Payload"]["Body"]["error_message"],
            JSON.stringify(response.body["Modified_Payload"], null, 2),
          );

        }

        return "OK";
        
      })
    );

  }

  logWhatWeSend(request: HttpRequest<any>){
    console.log("\n");
    console.log("SENDING");
    console.log("=======================================");
    console.log(request);
    console.log("=======================================");
  }

}
