import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';

@Component({
  selector: 'app-author-profile-update',
  templateUrl: './author-profile-update.component.html',
  styleUrls: ['./author-profile-update.component.css']
})
export class AuthorProfileUpdateComponent implements OnInit {

  user_data: any;

  name: string | null = null;
  pen_name: string | null = null;

  ngclass_name: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_pen_name: any = {
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
      this.getAuthorData();
    } else {
      this.api_utilities.renavigateLoginSilent()
    }
  }


  getAuthorData(){
    this.user_data = this.api_utilities.getCurrentUserData();
    this.assignAuthorValue()
  }

  assignAuthorValue(){
    this.name = this.user_data['Name'];
    this.pen_name = this.user_data['Pen_Name'];
  }

  validateForm(){

    let error: boolean = false;

    if(this.name == null
      || typeof this.name != 'string'
      || this.name == ""
    ){
      error = true;
      this.ngclass_name["is-invalid"] = true;
      this.ngclass_name["is-valid"] = false;
    } else {
      this.ngclass_name["is-invalid"] = false;
      this.ngclass_name["is-valid"] = true;
    }

    if(this.pen_name == null
      || typeof this.pen_name != 'string'
      || this.pen_name == ""
    ){
      error = true;
      this.ngclass_pen_name["is-invalid"] = true;
      this.ngclass_pen_name["is-valid"] = false;
    } else {
      this.ngclass_pen_name["is-invalid"] = false;
      this.ngclass_pen_name["is-valid"] = true;
    }


    return error;

  }

  updateProfile(){

    if(this.validateForm()){
      return;
    }

    if(this.name != null
      && this.pen_name != null
    ){

      this.api.updateAuthor(
        this.name,
        this.pen_name,
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          console.log(data);

          this.getMyProfile();
        }
        
      });
    }

  }


  getMyProfile(){
    

    this.api.getAuthorProfile()
    .subscribe((data: any)=>{

      if (data.body 
        && data.body["Success"]
      ){
        console.log(data);

        this.api_utilities.saveUserData(data.body['Modified_Payload']['Body']);
      }
      
    });

  }

  cancelUpdate(){
    this.router.navigate(['seller']);
  }


  toChangePassword(){
    this.router.navigate(['seller', 'change_password']);
  }

  openUpdateConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Update Your Profile";
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.updateProfile();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

  disableMe(){
    this.api.disableAuthorProfile()
    .subscribe((data: any)=>{

      if (data.body 
        && data.body["Success"]
      ){
        console.log(data);

        this.api_utilities.renavigateLoginSilent();
      }
      
    });
  }

  openDisableConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Disable Your Profile";
    modalRef.componentInstance.dangerous_warn = "Yo won't be able to access this account, this account will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.disableMe();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

}
