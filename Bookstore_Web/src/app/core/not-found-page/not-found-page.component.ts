import { Component, OnInit } from '@angular/core';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnInit(): void {
  }

  gotoSafety(){
    this.api_utilities.renavigateDashboard();
  }

}
