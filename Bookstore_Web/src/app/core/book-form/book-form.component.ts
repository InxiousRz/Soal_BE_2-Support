import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {


  img_cover_source: string | ArrayBuffer | null = "assets/nocover.jpg";
  img_cover_base64: string | null = null;
  img_cover_ext: string | null = null;

  title: string | null = "";
  summary: string | null = "";
  price: number | null = null;
  stock: number | null = null;
  cover_url: string | null = "assets/nocover.jpg";


  ngclass_title: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_summary: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_price: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_stock: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_cover: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  constructor(
    private router: Router,
    private api: ApiService,
    private modalService: NgbModal,
    private api_utilities: ApiUtilitiesService
  ) { }

  ngOnInit(): void {
    if(this.api_utilities.checkLogin()){
      // pass
    } else {
      this.api_utilities.renavigateLoginSilent()
    }
  }


  displayFile(event: any){

    console.log(event.target.files);

    let file = event.target.files[0];

    if(file){

      let filename = file.name
      let mime = file.type

      this.img_cover_ext = filename.split(".").pop();

      let reader = new FileReader();

      reader.onload = e => {
        // console.log(reader.result);
        this.img_cover_source = reader.result;

        if(reader.result != null
          &&  typeof reader.result === 'string'
        ){
          const base64_string = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

          // log to console
          // logs wL2dvYWwgbW9yZ...
          // console.log(base64String);
          this.img_cover_base64 = base64_string;
        }
        
      } 
      reader.readAsDataURL(file);

    }

  }

  validateForm(){

    let error: boolean = false;

    if(this.title == null
      || typeof this.title != 'string'
      || this.title == ""
    ){
      error = true;
      this.ngclass_title["is-invalid"] = true;
      this.ngclass_title["is-valid"] = false;
    } else {
      this.ngclass_title["is-invalid"] = false;
      this.ngclass_title["is-valid"] = true;
    }

    if(this.summary == null
      || typeof this.summary != 'string'
      || this.summary == ""
    ){
      error = true;
      this.ngclass_summary["is-invalid"] = true;
      this.ngclass_summary["is-valid"] = false;
    } else {
      this.ngclass_summary["is-invalid"] = false;
      this.ngclass_summary["is-valid"] = true;
    }

    if(this.price == null
      || typeof this.price != 'number'
      || this.price <= 0
    ){
      error = true;
      this.ngclass_price["is-invalid"] = true;
      this.ngclass_price["is-valid"] = false;
    } else {
      this.ngclass_price["is-invalid"] = false;
      this.ngclass_price["is-valid"] = true;
    }

    if(this.stock == null
      || typeof this.stock != 'number'
      || this.stock < 1
    ){
      error = true;
      this.ngclass_stock["is-invalid"] = true;
      this.ngclass_stock["is-valid"] = false;
    } else {
      this.ngclass_stock["is-invalid"] = false;
      this.ngclass_stock["is-valid"] = true;
    }

    if(this.img_cover_base64 == null
      || typeof this.img_cover_base64 != 'string'
      || this.img_cover_base64 == ""
    ){
      error = true;
      this.ngclass_cover["is-invalid"] = true;
      this.ngclass_cover["is-valid"] = false;
    } else {
      this.ngclass_cover["is-invalid"] = false;
      this.ngclass_cover["is-valid"] = true;
    }

    return error;

  }

  addBook(){

    if(this.validateForm()){
      return;
    }
    
    if(this.title != null
      && this.summary != null
      && this.price != null
      && this.stock != null
      && this.img_cover_base64 != null
      && this.img_cover_ext != null
    ){

      this.api.addBook(
        this.title,
        this.summary,
        this.price,
        this.stock,
        this.img_cover_base64,
        this.img_cover_ext
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          console.log(data);

          this.router.navigate(['seller']);
        }
        
      });
    }

  }

  cancelAdd(){
    this.router.navigate(['seller']);
  }

  openAddConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Add Book";
    modalRef.componentInstance.warn_target = this.title;
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.addBook();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

}
