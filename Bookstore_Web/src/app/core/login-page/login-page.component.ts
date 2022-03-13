import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  selected_form: number = 1;
  email: string= "";
  password: string = "";

  reg_name: string = "";
  reg_pen_name: string = "";
  reg_email: string = "";
  reg_password: string = "";

  forgot_email: string = "";
  new_password: string = "";

  constructor(
    private api: ApiService,
    private local_storage: LocalStorageService,
    private api_utilities: ApiUtilitiesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  switchForm(identifier: number){

    this.selected_form = identifier;

  }


  login(){

    if(this.email != null && this.password != null){

      this.api.loginAuthor(
        this.email,
        this.password
      ).subscribe((data: any)=>{

        if (data.body 
          && data.body["Success"]
        ){
          
          this.local_storage.setItem(
            "refresh_token",
            data.body["Modified_Payload"]["Body"]["Refresh_Token"]
          );
  
          this.local_storage.setItem(
            "access_token",
            data.body["Modified_Payload"]["Body"]["Access_Token"]
          );

          this.api_utilities.decryptAuthandSaveUserData(
            data.body["Modified_Payload"]["Body"]["Access_Token"]
          );

          this.router.navigate(['seller']);
        }
        
      });

    }

  }


  register(){

    if(this.reg_email != null && this.reg_password != null){

      this.api.registerAuthor(
        this.reg_name,
        this.reg_pen_name,
        this.reg_email,
        this.reg_password
      ).subscribe((data: any)=>{

        if (data.body 
          && data.body["Success"]
        ){
          
          this.reg_name = "";
          this.reg_pen_name = "";
          this.reg_email = "";
          this.reg_password = "";
          this.switchForm(3);

        }
        
      });

    }

  }

  toDashboard(){
    this.router.navigate(['dashboard']);
  }

  forgotPassword(){
    if(this.forgot_email != null){

      this.api.resetAuthorPassword(
        this.forgot_email
      ).subscribe((data: any)=>{

        if (data.body 
          && data.body["Success"]
        ){
          
          this.new_password = data.body["Modified_Payload"]["Body"]["New_Password"];
          this.forgot_email = "";
          this.switchForm(5);

        }
        
      });

    }
  }

}
