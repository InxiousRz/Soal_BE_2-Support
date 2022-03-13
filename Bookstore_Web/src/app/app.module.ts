import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './core/login-page/login-page.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { BookNodeComponent } from './core/book-node/book-node.component';
import { BookListviewComponent } from './core/book-listview/book-listview.component';
import { BookDetailComponent } from './core/book-detail/book-detail.component';
import { BookOrderComponent } from './core/book-order/book-order.component';
import { DashboardGeneralPageComponent } from './core/dashboard-general-page/dashboard-general-page.component';
import { DashboardSellerPageComponent } from './core/dashboard-seller-page/dashboard-seller-page.component';
import { BookNodeSellerComponent } from './core/book-node-seller/book-node-seller.component';
import { BookDetailSellerComponent } from './core/book-detail-seller/book-detail-seller.component';
import { BookFormComponent } from './core/book-form/book-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookFormUpdateComponent } from './core/book-form-update/book-form-update.component';
import { BookListviewSellerComponent } from './core/book-listview-seller/book-listview-seller.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './core/intercept/refresh-token.interceptor';
import { BookUpdateCoverComponent } from './core/book-update-cover/book-update-cover.component';
import { AuthorProfileUpdateComponent } from './core/author-profile-update/author-profile-update.component';
import { AuthorPasswordUpdateComponent } from './core/author-password-update/author-password-update.component';
import { DialogueConfirmationComponent } from './core/dialogue-confirmation/dialogue-confirmation.component';
import { DialogueErrorComponent } from './core/dialogue-error/dialogue-error.component';
import { DialogueInfoComponent } from './core/dialogue-info/dialogue-info.component';
import { SalesPageComponent } from './core/sales-page/sales-page.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SideBarComponent,
    BookNodeComponent,
    BookListviewComponent,
    BookDetailComponent,
    BookOrderComponent,
    DashboardGeneralPageComponent,
    DashboardSellerPageComponent,
    BookNodeSellerComponent,
    BookDetailSellerComponent,
    BookFormComponent,
    BookFormUpdateComponent,
    BookListviewSellerComponent,
    BookUpdateCoverComponent,
    AuthorProfileUpdateComponent,
    AuthorPasswordUpdateComponent,
    DialogueConfirmationComponent,
    DialogueErrorComponent,
    DialogueInfoComponent,
    SalesPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
