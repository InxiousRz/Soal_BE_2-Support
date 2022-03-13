import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookOrderComponent } from '../book-order/book-order.component';
import { ApiService } from '../services/api.service';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input('book_data') book_data: any;

  constructor(
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private api: ApiService,
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnInit(): void {
    this.loadBookData();
  }

  openOrder(){
    
    const modalRef = this.modalService.open(BookOrderComponent, { size: 'xl', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.book_data = this.book_data;
    

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === "REFRESH"){

        this.activeModal.close("REFRESH");

      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });

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

}
