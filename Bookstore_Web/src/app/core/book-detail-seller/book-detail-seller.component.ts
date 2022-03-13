import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-book-detail-seller',
  templateUrl: './book-detail-seller.component.html',
  styleUrls: ['./book-detail-seller.component.css']
})
export class BookDetailSellerComponent implements OnInit {

  @Input('book_data') book_data: any;

  constructor(
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private router: Router,
    private api: ApiService,
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnInit(): void {
    this.loadBookData();
  }


  openEditForm(){
    
    this.activeModal.close();
    this.router.navigate(['seller', 'books', 'update', this.book_data["Book_ID"]]);
    console.log("aaaa")

  }

  deleteBook(){


    if(this.book_data['Book_ID'] != null
    ){

      this.api.deleteBook(
        this.book_data['Book_ID'],
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          console.log(data);

          this.activeModal.close("REFRESH");
        }
        
      });
    }

    

  }


  openDeleteConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Delete Book";
    modalRef.componentInstance.warn_target = this.book_data['Title'];
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.deleteBook();
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
