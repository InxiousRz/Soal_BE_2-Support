import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BookOrderComponent } from '../book-order/book-order.component';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-book-node',
  templateUrl: './book-node.component.html',
  styleUrls: ['./book-node.component.css']
})
export class BookNodeComponent implements OnInit {

  @Input('book_data') book_data: any;
  @Output('refresh_trigger') refresh_trigger = new EventEmitter<boolean>();

  constructor(
    private modalService: NgbModal,
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnInit(): void {

    // console.log(this.book_data)

  }

  openDetail(){
    
    const modalRef = this.modalService.open(BookDetailComponent, { size: 'xl', scrollable: true, centered: true });
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

  openOrder(){
    
    const modalRef = this.modalService.open(BookOrderComponent, { size: 'xl', scrollable: true, centered: true, backdrop: 'static' });
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
