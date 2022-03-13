import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';

@Component({
  selector: 'app-book-order',
  templateUrl: './book-order.component.html',
  styleUrls: ['./book-order.component.css']
})
export class BookOrderComponent implements OnInit {

  @Input('book_data') book_data: any;

  rec_name: string | null = null;
  rec_email: string | null = null;
  quantity: number | null = 1;

  ngclass_rec_name: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_rec_email: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_quantity: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  constructor(
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private api: ApiService,
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnInit(): void {
    this.loadBookData();
  }

  validateForm(){

    let error: boolean = false;

    if(this.rec_name == null
      || typeof this.rec_name != 'string'
      || this.rec_name == ""
    ){
      error = true;
      this.ngclass_rec_name["is-invalid"] = true;
      this.ngclass_rec_name["is-valid"] = false;
    } else {
      this.ngclass_rec_name["is-invalid"] = false;
      this.ngclass_rec_name["is-valid"] = true;
    }

    if(this.rec_email == null
      || typeof this.rec_email != 'string'
      || this.rec_email == ""
      || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.rec_email) == false
    ){
      error = true;
      this.ngclass_rec_email["is-invalid"] = true;
      this.ngclass_rec_email["is-valid"] = false;
    } else {
      this.ngclass_rec_email["is-invalid"] = false;
      this.ngclass_rec_email["is-valid"] = true;
    }

    if(this.quantity == null
      || typeof this.quantity != 'number'
      || this.quantity <= 0
      || this.quantity > this.book_data["Stock"]
    ){
      error = true;
      this.ngclass_quantity["is-invalid"] = true;
      this.ngclass_quantity["is-valid"] = false;
    } else {
      this.ngclass_quantity["is-invalid"] = false;
      this.ngclass_quantity["is-valid"] = true;
    }

    return error;

  }


  createOrder(){

    if(this.validateForm()){
      return;
    }
    
    if(this.rec_name != null
      && this.rec_email != null
      && this.quantity != null
    ){

      this.api.createSales(
        this.rec_name,
        this.rec_email,
        this.quantity,
        this.book_data["Book_ID"]
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          console.log(data);

          // this.router.navigate(['seller']);

          this.activeModal.close("REFRESH");
        }
        
      });
    }

  }

  openUpdateConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Confirm Your Order ?";
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.createOrder();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }

  cancelOrder(){

    this.activeModal.dismiss("CANCEL");

  }

  loadBookData(){
    this.api.getBookByID(
      this.book_data["Book_ID"]
    ).subscribe((data: any)=>{

      if (data.body 
        && data.body["Success"]
      ){
        
        console.log(data);
        this.book_data = data.body["Modified_Payload"]["Body"];

      } else {
        this.activeModal.close("REFRESH");
      }
      
    });
  }

  formatCurrencyReadable(currency: string){
    return "Rp. " + this.api_utilities.formatCurrency(currency);
  }


  getTotalPrice(){
    return this.formatCurrencyReadable((Math.max(
      Number(
        (this.book_data['Price'] == '' || this.book_data['Price'] == '') == true ? 0 : this.book_data['Price']), 
        0
        ) * 
      Math.max(this.quantity == null ? 0 : this.quantity, 0)).toString());
  }
}
