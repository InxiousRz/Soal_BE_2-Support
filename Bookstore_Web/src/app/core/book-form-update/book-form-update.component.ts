import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookUpdateCoverComponent } from '../book-update-cover/book-update-cover.component';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';



@Component({
  selector: 'app-book-form-update',
  templateUrl: './book-form-update.component.html',
  styleUrls: ['./book-form-update.component.css']
})
export class BookFormUpdateComponent implements OnInit {

  book_id: number | null = null;
  book_data: any;

  route_sub: any;

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private modalService: NgbModal,
    private api_utilities: ApiUtilitiesService
  ) { }

  ngOnInit(): void {

    if(this.api_utilities.checkLogin()){
      this.route_sub = this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log("GOT UPDATE ID :: " + params['id']);
        this.book_id = Number(params['id']);
  
        this.getBookData();
      });
    } else {
      this.api_utilities.renavigateLoginSilent()
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


    return error;

  }


  updateBook(){

    if(this.validateForm()){
      return;
    }
    
    if(this.title != null
      && this.summary != null
      && this.price != null
      && this.stock != null
      && this.book_id != null
    ){

      this.api.updateBook(
        this.title,
        this.summary,
        this.price,
        this.stock,
        this.book_id
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

  cancelUpdate(){
    this.router.navigate(['seller']);
  }

  getBookData(){

    if(this.book_id != null){
      this.api.getBookByID(
        this.book_id
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          
          console.log(data);
          this.book_data = data.body["Modified_Payload"]["Body"];

          this.assignBookValue();
  
        }
        
      });
    }
    
  }

  assignBookValue(){

    this.title = this.book_data["Title"];
    this.summary = this.book_data["Summary"];
    this.price = Number(this.book_data["Price"]);
    this.stock = Number(this.book_data["Stock"]);
    this.cover_url = this.book_data["Cover_URL"];

  }

  openCoverUpdate(){
    
    const modalRef = this.modalService.open(BookUpdateCoverComponent, { size: 'xl', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.cover_url = this.book_data["Cover_URL"];
    modalRef.componentInstance.book_id = this.book_id;
    modalRef.componentInstance.book_title = this.title;
    

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === "OK"){

        this.getBookData()

      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });

  }

  openUpdateConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Update Book";
    modalRef.componentInstance.warn_target = this.title;
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.updateBook();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }


}
