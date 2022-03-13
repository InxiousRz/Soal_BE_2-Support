import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output() side_nav_event = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  hideSideNav(){
    this.side_nav_event.emit(false);
  }

  toDashboard(){
    this.hideSideNav();
    this.router.navigate(['dashboard']);
  }

  toDashboardSeller(){
    this.hideSideNav();
    this.router.navigate(['seller']);
  }

}
