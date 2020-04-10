import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayHomeComponent } from './display-home/display-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CreateEventComponent } from './createEvent/create-event/create-event.component';
import { HeaderComponent } from './header/header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomeGuestComponent } from './welcome-guest/welcome-guest.component';
import { GuestJoinComponent } from './guest-join/guest-join.component';
import { AddBankAccountComponent } from './add-bank-account/add-bank-account.component';
import { HomeModule } from './home/home.module';
import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'display-page',
    pathMatch: 'full'
  },
  {
    path: 'display-page',
    component: DisplayHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'forgot-password/:id',
    component: ForgotPasswordComponent
  },
  {
    path: 'welcome-guest/:id/:type',
    component: WelcomeGuestComponent
  },
  {
    path: 'welcome-guest/:id',
    component: WelcomeGuestComponent
  },
  {
    path: 'guest-join/:hashTag',
    component: GuestJoinComponent
  },
  {
    path: 'add-bank-account',
    component: AddBankAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
