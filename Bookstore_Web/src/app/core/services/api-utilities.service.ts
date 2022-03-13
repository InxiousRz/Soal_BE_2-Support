import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DialogueErrorComponent } from '../dialogue-error/dialogue-error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogueInfoComponent } from '../dialogue-info/dialogue-info.component';



@Injectable({
  providedIn: 'root'
})
export class ApiUtilitiesService {

  jwt_helper = new JwtHelperService();

  constructor(
    private router: Router,
    private local_storage: LocalStorageService,
    private modalService: NgbModal,
  ) { }

  translateResult(response: HttpResponse<any>, api_method: string, api_url: string){

        let header = response.headers;
        let body = response.body;
        let status = response.status;

        let success: boolean = false;
        let return_data: any;
        let error_desc: any;
        let api_data = {
          "Path": api_url,
          "Type": api_method
        }

        if(body["message"] == "Success"){
          success = true;
          return_data = {
            "Body": body["data"],
            "Response": response
          };
        } else if (body["message"] == "Failed"){
          success = false;
          error_desc = body;
          return_data = {
            "Body": body,
            "Response": response
          };

          this.openErrorDetailForm(
            JSON.stringify(error_desc, null, 2),
            JSON.stringify(api_data, null, 2),
            status.toString(),
          )
          
        } else {
          
          success = true;
          return_data = {
            "Body": body,
            "Response": response
          };

        }

        

        return {
          "Success": success,
          "Modified_Payload": return_data
        };
  }

  renavigateLogin(error: string, error_data: string){
    
    this.router.navigate(['login']); // RELOGIN
    this.openInfoDetailForm("Your Login session have been expired, please Re-Login.")
  
  }

  loginAssignAuth(refresh_token: string, access_token: string){

    this.local_storage.setItem(
      "refresh_token",
      refresh_token
    );

    this.local_storage.setItem(
      "access_token",
      access_token
    );

  }

  logoutClearAuth(){
    this.local_storage.clear();
  }

  checkLogin(){
    if(this.local_storage.getItem('refresh_token') != null){
      return true;
    }

    return false;
  }

  decryptAuthandSaveUserData(access_token: string){

    let valid_data = this.jwt_helper.decodeToken(access_token);
    console.log(valid_data)

    this.local_storage.setItem('user_data', JSON.stringify(valid_data));

  }

  saveUserData(user_data: any){

    console.log(user_data)

    this.local_storage.setItem('user_data', JSON.stringify(user_data));

  }

  getCurrentUserData(){


    let data = this.local_storage.getItem('user_data');
    let returning: any | null = null;

    if(data){
      returning = JSON.parse(data);
    }

    return returning;

  }


  getActiveAccessToken(){
    return this.local_storage.getItem('access_token');
  }

  getActiveRefreshToken(){
    return this.local_storage.getItem('refresh_token');
  }

  openErrorDetailForm(error: string, on: any, status_code: string){
    const modalRef = this.modalService.open(DialogueErrorComponent, { size: 'xl', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.name = 'Error Page';
    modalRef.componentInstance.error = error;
    modalRef.componentInstance.on = on;
    modalRef.componentInstance.status_code = status_code;
    

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

  openInfoDetailForm(what_happen: any){
    const modalRef = this.modalService.open(DialogueInfoComponent, { size: 'xl', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.name = 'Notifiaction Page';
    modalRef.componentInstance.what_happen = what_happen;
    

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

  renavigateLoginSilent(){
    this.router.navigate(['login']); // RELOGIN
  }

  renavigateDashboard(){
    this.router.navigate(['dashboard']); // RELOGIN
  }

  formatCurrency(currency: string){
    return  Number(currency).toFixed(10).replace(/\d(?=(\d{3})+\.)/g, '$&.').split('.0000000000')[0]; // sry im Lazy
  }

}
