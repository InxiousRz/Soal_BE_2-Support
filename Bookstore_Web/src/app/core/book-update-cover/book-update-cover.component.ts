import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { DialogueConfirmationComponent } from '../dialogue-confirmation/dialogue-confirmation.component';

@Component({
  selector: 'app-book-update-cover',
  templateUrl: './book-update-cover.component.html',
  styleUrls: ['./book-update-cover.component.css']
})
export class BookUpdateCoverComponent implements OnInit {

  @Input('cover_url') cover_url: string | null = null;
  @Input('book_id') book_id: number | null = null;
  @Input('book_title') book_title: string | null = null;

  img_cover_source: string | ArrayBuffer | null = "assets/nocover.jpg";
  img_cover_base64: string | null = null;
  img_cover_ext: string | null = null;

  ngclass_cover: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  constructor(
    private api: ApiService,
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  cancelUpdate(){

    this.activeModal.dismiss("CANCEL");

  }

  validateCover(){

    let error: boolean = false;

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


  updateCover(){

    if(this.validateCover()){
      return;
    }


    if(this.img_cover_base64 != null
      && this.img_cover_ext != null
      && this.book_id != null
    ){

      this.api.updateBookCover(
        this.img_cover_base64,
        this.img_cover_ext,
        this.book_id
      ).subscribe((data: any)=>{
  
        if (data.body 
          && data.body["Success"]
        ){
          console.log(data);

          this.activeModal.close("OK");
        }
        
      });
    }

    

  }

  openUpdateConfirmationDialogue(){

    const modalRef = this.modalService.open( DialogueConfirmationComponent, { size: 'md', scrollable: true, centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = "ACTION";
    modalRef.componentInstance.warn = "Update Cover";
    modalRef.componentInstance.warn_target = this.book_title;
    // modalRef.componentInstance.dangerous_warn = "This Task will be archived.";

    // modalRef.dismissed.subscribe((data)=>{
    //   console.log("=============== DISSMISS  ==");
    //   console.log(data);
    // });

    modalRef.closed.subscribe((data)=>{

      if(data === true){
        this.updateCover();
      }
      

    });

    // modalRef.hidden.subscribe((data)=>{
    //   console.log("=============== HIDDEN  ==");
    //   console.log(data);
    // });
  }


}
