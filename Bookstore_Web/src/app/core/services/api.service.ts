import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiUtilitiesService } from './api-utilities.service';
import { LocalStorageService } from './local-storage.service';
import { finalize, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  project_config: any;
  mainlink: string = "NOT_ASSIGNED_YET";

  constructor(
    private http: HttpClient,
    private local_storage: LocalStorageService
  ) {
    // this.mainlink = "http://localhost:4050";
  }


  loadConfig(){

    if(this.mainlink == "NOT_ASSIGNED_YET"){
      this.http.get('assets/project_config.json')
      .subscribe((data)=>{
        this.setConfig(data)
      });
    }
    

  }

  loadConfigAsync(){

    if(this.mainlink == "NOT_ASSIGNED_YET"){
      return this.http.get('assets/project_config.json')
      .pipe(
        map((data: any)=>{
          this.setConfig(data["Modified_Payload"]["Body"])
        })
      );
    }

    return null;

  }

  setConfig(config: any){
    this.project_config = config;
    this.mainlink = config["Main_URL"];
  }


  // ============================================================================================================================
  // AUTHOR
  // ============================================================================================================================

  refreshToken() {

    console.log("Refresh Token =====================");

    let base_url = `${this.mainlink}/author/refresh_token`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {
        "Refresh_Token": this.local_storage.getItem("refresh_token")
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  loginAuthor(email: string, password: string) {

    let base_url = `${this.mainlink}/author/login`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {
        "Email": email,
        "Password": password,
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  logoutAuthor() {

    let base_url = `${this.mainlink}/author/logout`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.local_storage.getItem("access_token")
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {},
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  registerAuthor(name: string, pen_name: string, email: string, password: string) {

    let base_url = `${this.mainlink}/author/register`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {
        "Name": name,
        "Pen_Name": pen_name,
        "Email": email,
        "Password": password,
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  updateAuthor(name: string, pen_name: string) {

    let base_url = `${this.mainlink}/author/update`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.put(
      base_url,
      {
        "Name": name,
        "Pen_Name": pen_name
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  updateAuthorPassword(old_password: string, new_password: string) {

    let base_url = `${this.mainlink}/author/change_password`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.put(
      base_url,
      {
        "Old_Password": old_password,
        "New_Password": new_password
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  getAuthorProfile() {

    let base_url = `${this.mainlink}/author/get_my_profile`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.get(
      base_url,
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  resetAuthorPassword(email: string) {

    let base_url = `${this.mainlink}/author/forgot_password`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {
        "Email": email
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  disableAuthorProfile() {

    let base_url = `${this.mainlink}/author/delete`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.delete(
      base_url,
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  // ============================================================================================================================
  // BOOKS
  // ============================================================================================================================

  getBooks(name_search: string | null, author_id: number | null, page: number, limit: number) {

    let base_url = `${this.mainlink}/book/get`;

    // PARAMS
    // =====================================================================
    let query_param = new HttpParams();

    // TITLE
    if(name_search != null){
      query_param = query_param.set("Title", name_search.toString());
    }

    // AUTHOR
    if(author_id != null){
      query_param = query_param.set("Author_ID", author_id.toString());
    }

    // PAGE
    query_param = query_param.set("Page", page.toString());

    // LIMIT
    query_param = query_param.set("Limit", limit.toString());

    // console.log(query_param.toString());

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.get(
      base_url,
      {
        headers: header,
        params: query_param,
        observe: 'response'
      }
    );

    return result;
  }

  getMyBooks(name_search: string | null, page: number, limit: number) {

    let base_url = `${this.mainlink}/book/get_my_book`;

    // PARAMS
    // =====================================================================
    let query_param = new HttpParams();

    // TITLE
    if(name_search != null){
      query_param = query_param.set("Title", name_search.toString());
    }

    // PAGE
    query_param = query_param.set("Page", page.toString());

    // LIMIT
    query_param = query_param.set("Limit", limit.toString());

    // console.log(query_param.toString());

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.get(
      base_url,
      {
        headers: header,
        params: query_param,
        observe: 'response'
      }
    );

    return result;
  }

  getBookByID(book_id: number) {

    let base_url = `${this.mainlink}/book/get/` + book_id.toString();

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.get(
      base_url,
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  updateBookCover(cover_base64: string, cover_extension: string, book_id: number) {

    let base_url = `${this.mainlink}/book/update_cover/`+ book_id.toString();

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.put(
      base_url,
      {
        "Cover_Image_Base64": cover_base64,
        "Image_Extension": cover_extension,
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  updateBook(title: string, summary: string, price: number, stock: number, book_id: number) {

    let base_url = `${this.mainlink}/book/update/`+ book_id.toString();

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.put(
      base_url,
      {
        "Title": title,
        "Summary": summary,
        "Price": price,
        "Stock": stock,
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  addBook(title: string, summary: string, price: number, stock: number, cover_base64: string, cover_extension: string) {

    let base_url = `${this.mainlink}/book/add`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {
        "Title": title,
        "Summary": summary,
        "Price": price,
        "Stock": stock,
        "Cover_Image_Base64": cover_base64,
        "Image_Extension": cover_extension,
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  deleteBook(book_id: number) {

    let base_url = `${this.mainlink}/book/delete/` + book_id.toString();

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.delete(
      base_url,
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }


  // ============================================================================================================================
  // SALES
  // ============================================================================================================================
  

  createSales(name: string, email: string, quantity: number, book_id: number) {

    let base_url = `${this.mainlink}/sales/add`;

    // PARAMS
    // =====================================================================

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.post(
      base_url,
      {
        "Name": name,
        "Email": email,
        "Quantity": quantity,
        "Book_ID": book_id
      },
      {
        headers: header,
        observe: 'response'
      }
    );

    return result;
  }

  getMySales(book_title: string | null, created_start: number | null, created_end: number | null, page: number, limit: number) {

    let base_url = `${this.mainlink}/sales/get_my_sales`;

    // PARAMS
    // =====================================================================
    let query_param = new HttpParams();

    // TITLE
    if(book_title != null){
      query_param = query_param.set("Book_Title", book_title.toString());
    }

    // TITLE
    if(created_start != null){
      query_param = query_param.set("Created_Time_Start", created_start.toString());
    }

    // TITLE
    if(created_end != null){
      query_param = query_param.set("Created_Time_End", created_end.toString());
    }

    // PAGE
    query_param = query_param.set("Page", page.toString());

    // LIMIT
    query_param = query_param.set("Limit", limit.toString());

    // console.log(query_param.toString());

    // HEADER
    // =====================================================================
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(base_url)

    let result = this.http.get(
      base_url,
      {
        headers: header,
        params: query_param,
        observe: 'response'
      }
    );

    return result;
  }
  
}
