import { Component, OnChanges, Input } from '@angular/core';
import { BookNodeSellerComponent } from '../book-node-seller/book-node-seller.component';
import { ApiService } from '../services/api.service';
import { ApiUtilitiesService } from '../services/api-utilities.service';

@Component({
  selector: 'app-book-listview-seller',
  templateUrl: './book-listview-seller.component.html',
  styleUrls: ['./book-listview-seller.component.css']
})
export class BookListviewSellerComponent implements OnChanges {

  @Input('name_search') name_search: string | null = null;

  page: number = 1;
  data_per_page: number = 5;
  total_data: number = 5;

  fetched_books: any[] = [];

  constructor(
    private api: ApiService,
    private api_utilities: ApiUtilitiesService,
  ) { }

  ngOnChanges(): void {

    
    if(this.api_utilities.checkLogin()){
      this.loadBooks(this.name_search);
    }

  }

  pageHandler(page_number: number){

    this.loadBooks(this.name_search);
    console.log(page_number);

  }


  loadBooks(name_search: string | null){
    this.api.getMyBooks(
      name_search,
      this.page,
      this.data_per_page
    ).subscribe((data: any)=>{

      if (data.body 
        && data.body["Success"]
      ){
        
        console.log(data);
        this.fetched_books = data.body["Modified_Payload"]["Body"]['List_Data'];

        this.page = data.body["Modified_Payload"]["Body"]['Pagination_Data']['Current_Page'];
        this.data_per_page = data.body["Modified_Payload"]["Body"]['Pagination_Data']['Max_Data_Per_Page'];
        this.total_data = data.body["Modified_Payload"]["Body"]['Pagination_Data']['Total_All_Data'];

      }
      
    });
  }

  selectDataPerPageHandler(){
    this.loadBooks(this.name_search);
    console.log(this.data_per_page);
  }

  refreshTriggerHandler(state: boolean){

    if(state == true){
      this.loadBooks(this.name_search);
    }

  }

}
