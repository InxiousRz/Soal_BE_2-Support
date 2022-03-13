import { Component, OnInit } from '@angular/core';
import { BookListviewComponent } from '../book-listview/book-listview.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-dashboard-general-page',
  templateUrl: './dashboard-general-page.component.html',
  styleUrls: ['./dashboard-general-page.component.css']
})
export class DashboardGeneralPageComponent implements OnInit {

  is_loged_in: boolean = false;
  show_sidenav: boolean = false;

  pending_search_filter: string = "";
  search_filter: string | null = null;

  user_data: any;

  constructor(
    private router: Router,
    private api_utilities: ApiUtilitiesService,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.user_data = this.api_utilities.getCurrentUserData();

  }

  toLoginPage(){
    this.router.navigate(['login']);
  }

  sideNavHandler(state: boolean){

    if(state == true){
      this.show_sidenav = true;
    } else {
      this.show_sidenav = false;
    }
    
  }

  checkLogin(){

    return this.api_utilities.checkLogin()

  }

  logout(){
    this.api.logoutAuthor()
    .subscribe((data: any)=>{

      if (data.body 
        && data.body["Success"]
      ){
        
        console.log(data);
        this.api_utilities.logoutClearAuth();
        this.router.navigate(['dashboard']);

      }
      
    });
  }

  applySearchFilter(){
    console.log(this.search_filter)
    this.search_filter = this.pending_search_filter == "" ? null : this.pending_search_filter;
    console.log(this.pending_search_filter)
  }

  toAuthorProfile(){
    this.router.navigate(['seller', 'profile']);
  }

}
