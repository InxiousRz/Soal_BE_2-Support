import { Component, OnInit, Injectable } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ApiUtilitiesService } from '../services/api-utilities.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbPagination, NgbPaginationPages } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';


/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
 @Injectable()
 export class CustomAdapter extends NgbDateAdapter<string> {
 
   readonly DELIMITER = '-';
 
   fromModel(value: string | null): NgbDateStruct | null {
     if (value) {
       const date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }
 
   toModel(date: NgbDateStruct | null): string | null {
     return date ? (date.day.toString().length == 1 ? "0" + date.day.toString() : date.day) + 
     this.DELIMITER + 
     (date.month.toString().length == 1 ? "0" + date.month.toString() : date.month) + 
     this.DELIMITER + date.year : null;
   }
 }
 
 /**
  * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
  */
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {
 
   readonly DELIMITER = '-';
 
   parse(value: string): NgbDateStruct | null {
     if (value) {
       const date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }
 
   format(date: NgbDateStruct | null): string {
     return date ? (date.day.toString().length == 1 ? "0" + date.day.toString() : date.day) + 
     this.DELIMITER + 
     (date.month.toString().length == 1 ? "0"+ date.month.toString() : date.month) + 
     this.DELIMITER + date.year : '';
   }
 }

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SalesPageComponent implements OnInit {

  show_sidenav: boolean = false;

  page: number = 1;
  data_per_page: number = 5;
  total_data: number = 5;

  search_filter: string | null = null;

  book_title_search: string | null = null;
  created_start_search: string | null = null;
  created_end_search: string | null = null;

  search_title_error: string | null = null;
  search_date_start_error: string | null = null;
  search_date_end_error: string | null = null;

  user_data: any;

  sales: any[] = [];

  

  ngclass_title: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_created_start: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  ngclass_created_end: any = {
    "form-control": true,
    "is-valid": false,
    "is-invalid": false
  };

  constructor(
    private router: Router,
    private api_utilities: ApiUtilitiesService,
    private api: ApiService
  ) { }

  ngOnInit(): void {


    if(this.api_utilities.checkLogin()){
      this.user_data = this.api_utilities.getCurrentUserData();
      this.loadSales();
    } else {
      this.api_utilities.renavigateLoginSilent()
    }
    
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

  toAddBook(){
    this.router.navigate(['seller', 'books', 'add'])
  }

  applySearchFilter(){
    if(this.validateForm()){
      return;
    }

    this.search_filter = (this.book_title_search == null || this.book_title_search == "" ? "any title" : this.book_title_search ) + 
      " | " + 
      (this.created_start_search == null ? "any time" : this.created_start_search ) + 
      "  >  " +
      (this.created_end_search == null ? "any time" : this.created_end_search);


    this.loadSales();
  }

  toAuthorProfile(){
    this.router.navigate(['seller', 'profile']);
  }

  loadSales(){

    let start_date_validate = this.validateDate(this.created_start_search);
    let end_date_validate = this.validateDate(this.created_end_search);

    this.api.getMySales(
      this.book_title_search == "" ? null : this.book_title_search,
      start_date_validate["Formatted"],
      end_date_validate["Formatted"],
      this.page,
      this.data_per_page
    ).subscribe((data: any)=>{

      if (data.body 
        && data.body["Success"]
      ){
        
        console.log(data);
        this.sales = data.body["Modified_Payload"]["Body"]['List_Data'];

        this.page = data.body["Modified_Payload"]["Body"]['Pagination_Data']['Current_Page'];
        this.data_per_page = data.body["Modified_Payload"]["Body"]['Pagination_Data']['Max_Data_Per_Page'];
        this.total_data = data.body["Modified_Payload"]["Body"]['Pagination_Data']['Total_All_Data'];

      }
      
    });
  }

  validateForm(){

    let error: boolean = false;

    if(typeof this.book_title_search != 'string' &&
    this.book_title_search != null
    ){
      error = true;
      this.ngclass_title["is-invalid"] = true;
      this.ngclass_title["is-valid"] = false;

      this.search_title_error = "Ivalid title";
    } else {
      this.ngclass_title["is-invalid"] = false;
      this.ngclass_title["is-valid"] = true;

      this.search_title_error = null;
    }


    if(
      this.created_start_search == null || 
      typeof this.created_start_search == 'string'
    ){
      
      if (this.created_start_search != null){
        
        let validate_start_date = this.validateDate(this.created_start_search);
        if (validate_start_date["Valid"] == false){
          
          error = true;
          this.ngclass_created_start["is-invalid"] = true;
          this.ngclass_created_start["is-valid"] = false;
    
          this.search_date_start_error = "Ivalid date ( must be 'DD-MM-YYYY' format )";

        } else {

          this.ngclass_created_start["is-invalid"] = false;
          this.ngclass_created_start["is-valid"] = true;
    
          this.search_date_start_error = null;
  
        }

      } else {

        this.ngclass_created_start["is-invalid"] = false;
        this.ngclass_created_start["is-valid"] = true;
  
        this.search_date_start_error = null;

      }

    } else {

      error = true;
      this.ngclass_created_start["is-invalid"] = true;
      this.ngclass_created_start["is-valid"] = false;

      this.search_date_start_error = "Ivalid date ( must be 'DD-MM-YYYY' format )";

    }



    if(
      this.created_end_search == null || 
      typeof this.created_end_search == 'string'
    ){
      
      if (this.created_end_search != null){
        
        let validate_end_date = this.validateDate(this.created_end_search);
        if (validate_end_date["Valid"] == false){
          
          error = true;
          this.ngclass_created_end["is-invalid"] = true;
          this.ngclass_created_end["is-valid"] = false;
    
          this.search_date_end_error = "Ivalid date ( must be 'DD-MM-YYYY' format )";

        } else {

          this.ngclass_created_end["is-invalid"] = false;
          this.ngclass_created_end["is-valid"] = true;
    
          this.search_date_end_error = null;
  
        }

      } else {

        this.ngclass_created_end["is-invalid"] = false;
        this.ngclass_created_end["is-valid"] = true;
  
        this.search_date_end_error = null;

      }

    } else {

      error = true;
      this.ngclass_created_end["is-invalid"] = true;
      this.ngclass_created_end["is-valid"] = false;

      this.search_date_end_error = "Ivalid date ( must be 'DD-MM-YYYY' format )";

    }


    return error;

  }

  validateDate(date_string: string | null){
    if(date_string == null){
      return {
        "Valid": false,
        "Formatted": null
      }
    }

    let is_error = false;
    let formatted_date: number | null = null;
    let date_validate = moment(date_string, 'DD-MM-YYYY', true).isValid();
    if(!date_validate){
      is_error = true;
    } else {
      formatted_date = moment(date_string, 'DD-MM-YYYY', true).unix();
    }

    return {
      "Valid": !is_error,
      "Formatted": formatted_date
    }
  }

  formatUnixReadable(unix: number){
    let readable = moment.unix(unix).format("DD-MM-YYYY");
    return readable;
  }

  formatCurrencyReadable(currency: string){
    return "Rp. " + this.api_utilities.formatCurrency(currency);
  }

}
