import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';
import { HeaderComponent } from './componets/layout/header/header.component';
import { FooterComponent } from './componets/layout/footer/footer.component';
import { HomeComponent } from './componets/book/home/home.component';
import { DetailsComponent } from './componets/book/details/details.component';
import { ContactFormComponent } from './componets/contact-form/contact-form.component';
import { ErrorComponent } from './componets/error/error.component';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordComponent } from './componets/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './componets/reset-password-form/reset-password-form.component';
import { UserDetailsComponent } from './componets/user-details/user-details.component';
import { SearchBookComponent } from './componets/book/search-book/search-book.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { identityGuard } from "./services/identity.guard";
import { UserServices } from './services/userServices';
import { NoidentityGuard } from "./services/notidentity.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailsComponent,
    ContactFormComponent,
    ErrorComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    UserDetailsComponent,
    SearchBookComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders,
    identityGuard,
    UserServices,
    NoidentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
