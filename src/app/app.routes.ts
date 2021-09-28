import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { identityGuard } from "./services/Identity.guard";
import { NoidentityGuard } from "./services/notidentity.guard";

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
    {path: '', component: LoginComponent, canActivate :[NoidentityGuard] },
    {path: 'inicio', component: HomeComponent, canActivate :[identityGuard] },
    {path: 'login', component: LoginComponent, canActivate :[NoidentityGuard] },
    {path: 'logout/:sure', component: LoginComponent, canActivate :[identityGuard] },
    {path: 'usuario', component: UserDetailsComponent, canActivate :[identityGuard] },
    {path: 'contacto', component: ContactFormComponent, canActivate :[identityGuard] },
    {path : 'buscar', component: SearchBookComponent, canActivate :[identityGuard]},
    {path: 'libro/:title', component: DetailsComponent, canActivate :[identityGuard]},
    {path: 'resetear-password', component: ResetPasswordComponent, canActivate :[NoidentityGuard] },
    {path: 'formulario-resetear-password', component: ResetPasswordFormComponent, canActivate :[NoidentityGuard] },
    {path: 'registro', component: RegisterComponent, canActivate :[NoidentityGuard] },
    {path: '**', component: ErrorComponent}
]
export const appRoutingProviders: any[]= [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
