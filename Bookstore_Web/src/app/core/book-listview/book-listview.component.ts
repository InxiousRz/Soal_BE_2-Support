import { Component, OnChanges, Input } from '@angular/core';
import { BookNodeComponent } from '../book-node/book-node.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-book-listview',
  templateUrl: './book-listview.component.html',
  styleUrls: ['./book-listview.component.css']
})
export class BookListviewComponent implements OnChanges {

  @Input('name_search') name_search: string | null = null;

  page: number = 1;
  data_per_page: number = 5;
  total_data: number = 5;

  fetched_books: any[] = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnChanges(): void {

    this.loadBooks(this.name_search);

  }

  pageHandler(page_number: number){

    this.loadBooks(this.name_search);
    console.log(page_number);

  }


  loadBooks(name_search: string | null){
    this.api.getBooks(
      name_search,
      null,
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
