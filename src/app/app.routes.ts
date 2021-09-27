import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./componets/login/login.component";
import { RegisterComponent } from './componets/register/register.component';
import { ResetPasswordComponent } from './componets/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from "./componets/reset-password-form/reset-password-form.component";
import { HomeComponent } from './componets/book/home/home.component';
import { UserDetailsComponent } from "./componets/user-details/user-details.component";
import { ContactFormComponent } from "./componets/contact-form/contact-form.component";
import { SearchBookComponent } from './componets/book/search-book/search-book.component';
import { DetailsComponent } from "./componets/book/details/details.component";
import { ErrorComponent } from './componets/error/error.component';

const appRoutes : Routes = [
    {path: '', component: LoginComponent },
    {path: 'inicio', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'logout/:sure', component: LoginComponent },
    {path: 'usuario', component: UserDetailsComponent },
    {path: 'contacto', component: ContactFormComponent },
    {path : 'buscar', component: SearchBookComponent},
    {path: 'libro/:title', component: DetailsComponent},
    {path: 'resetear-password', component: ResetPasswordComponent },
    {path: 'formulario-resetear-password', component: ResetPasswordFormComponent },
    {path: 'registro', component: RegisterComponent },
    {path: '**', component: ErrorComponent}
]
export const appRoutingProviders: any[]= [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
