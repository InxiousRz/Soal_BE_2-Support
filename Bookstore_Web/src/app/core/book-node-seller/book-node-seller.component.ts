import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailSellerComponent } from '../book-detail-seller/book-detail-seller.component';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-book-node-seller',
  templateUrl: './book-node-seller.component.html',
  styleUrls: ['./book-node-seller.component.css']
})
export class BookNodeSellerComponent implements OnInit {

  @Input('book_data') book_data: any;
  @Output('refresh_trigger') refresh_trigger = new EventEmitter<boolean>();

  constructor(
    private modalService: NgbModal,
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnInit(): void {
  }

  openDetail(){
    
    const modalRef = this.modalService.open(BookDetailSellerComponent, { size: 'xl', scrollable: true, centered: true });
    modalRef.componentInstance.book_data = this.book_data;
    

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === "REFRESH"){

        this.refresh_trigger.emit(true);

      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });

  }

  formatCurrencyReadable(currency: string){
    return "Rp. " + this.api_utilities.formatCurrency(currency);
  }

}
