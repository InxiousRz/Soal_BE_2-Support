import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogue-info',
  templateUrl: './dialogue-info.component.html',
  styleUrls: ['./dialogue-info.component.css']
})
export class DialogueInfoComponent implements OnInit {

  @Input('what_happen') what_happen: string = "";

  modal: NgbActiveModal;

  constructor(
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal
  ) {
      this.modal = activeModal;
  }

  ngOnInit(): void {
  }

}
