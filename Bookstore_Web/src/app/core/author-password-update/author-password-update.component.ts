import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';

@Component({
  selector: 'app-author-password-update',
  templateUrl: './author-password-update.component.html',
  styleUrls: ['./author-password-update.component.css']
})
export class AuthorPasswordUpdateComponent implements OnInit {

  old_password: string | null = null;
  new_password: string | null = null;
  new_password_re: string | null = null;

  ngclass_old_password: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_new_password: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_new_password_re: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  constructor(
    private router: Router,
    private api: ApiService,
    private api_utilities: ApiUtilitiesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if(this.api_utilities.checkLogin()){
      // pass
    } else {
      this.api_utilities.renavigateLoginSilent()
    }
  }

  validateForm(){

    let error: boolean = false;

    if(this.old_password == null
      || typeof this.old_password != 'string'
      || this.old_password == ""
    ){
      error = true;
      this.ngclass_old_password["is-invalid"] = true;
      this.ngclass_old_password["is-valid"] = false;
    } else {
      this.ngclass_old_password["is-invalid"] = false;
      this.ngclass_old_password["is-valid"] = true;
    }

    if(this.new_password == null
      || typeof this.new_password != 'string'
      || this.new_password == ""
    ){
      error = true;
      this.ngclass_new_password["is-invalid"] = true;
      this.ngclass_new_password["is-valid"] = false;
    } else {
      this.ngclass_new_password["is-invalid"] = false;
      this.ngclass_new_password["is-valid"] = true;
    }

    if(this.new_password_re == null
      || typeof this.new_password_re != 'string'
      || this.new_password_re == ""
      || this.new_password_re != this.new_password
    ){
      error = true;
      this.ngclass_new_password_re["is-invalid"] = true;
      this.ngclass_new_password_re["is-valid"] = false;
    } else {
      this.ngclass_new_password_re["is-invalid"] = false;
      this.ngclass_new_password_re["is-valid"] = true;
    }


    return error;

  }

  updatePassword(){
    
    if(this.validateForm()){
      return;
    }

    if(this.old_password != null
      && this.new_password != null
      && this.new_password_re == this.new_password
    ){

      this.api.updateAuthorPassword(
        this.old_password,
        this.new_password,
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          console.log(data);
          this.cancelChangePassword();
        }
        
      });
    }

  }

  cancelChangePassword(){
    this.router.navigate(['seller', 'profile']);
  }

  toLogOut(){
    this.router.navigate(['login']);
  }

  openUpdateConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Update Your Password";
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.updatePassword();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

}
