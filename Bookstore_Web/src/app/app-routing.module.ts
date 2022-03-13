import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './core/login-page/login-page.component';
import { DashboardGeneralPageComponent } from './core/dashboard-general-page/dashboard-general-page.component';
import { DashboardSellerPageComponent } from './core/dashboard-seller-page/dashboard-seller-page.component';
import { BookFormComponent } from './core/book-form/book-form.component';
import { BookFormUpdateComponent } from './core/book-form-update/book-form-update.component';
import { AuthorProfileUpdateComponent } from './core/author-profile-update/author-profile-update.component';
import { AuthorPasswordUpdateComponent } from './core/author-password-update/author-password-update.component';
import { SalesPageComponent } from './core/sales-page/sales-page.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { PreloadDataGuard } from './guard/preload-data.guard';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'login',
    // canActivate: [UserAccessGuard],
    resolve: {data: PreloadDataGuard},
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    // canActivate: [UserAccessGuard],
    resolve: {data: PreloadDataGuard},
    component: DashboardGeneralPageComponent,
  },
  {
    path: 'seller',
    canActivate: [AuthGuardGuard],
    resolve: {data: PreloadDataGuard},
    children: [
      {
        path: '', // child route path
        // canActivate: [AuthGuardGuard],
        component: DashboardSellerPageComponent // child route component that the router renders
      },
      {
        path: 'change_password', // child route path
        // canActivate: [AuthGuardGuard],
        component: AuthorPasswordUpdateComponent // child route component that the router renders
      },
      {
        path: 'profile', // child route path
        // canActivate: [AuthGuardGuard],
        component: AuthorProfileUpdateComponent // child route component that the router renders
      },
      {
        path: 'books/add', // child route path
        // canActivate: [AuthGuardGuard],
        component: BookFormComponent // child route component that the router renders
      },
      {
        path: 'books/update/:id', // child route path
        // canActivate: [AuthGuardGuard],
        component: BookFormUpdateComponent // child route component that the router renders
      },
      {
        path: 'sales', // child route path
        // canActivate: [AuthGuardGuard],
        component: SalesPageComponent // child route component that the router renders
      },
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
