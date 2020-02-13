import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DisplayHomeComponent} from './display-home/display-home.component';
import{SignUpComponent} from './sign-up/sign-up.component';
import{LoginComponent} from './login/login.component'
  import { from } from 'rxjs';

const routes: Routes = [
    {
      path: 'display-page',
      component: DisplayHomeComponent
    },
    {
      path: 'signup',
      component: SignUpComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
