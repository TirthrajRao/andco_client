import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayHomeComponent } from './display-home/display-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CreateEventComponent } from './create-event/create-event.component';
  import { from } from 'rxjs';

const routes: Routes = [
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
      path: 'menu',
      component: MainMenuComponent
    },
    {
      path: 'create-event',
      component: CreateEventComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
