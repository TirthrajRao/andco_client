import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// Child component of home page
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from '../header/header.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { CreateEventComponent } from '../createEvent/create-event/create-event.component';
import { EventActivityComponent } from '../createEvent/event-activity/event-activity.component';
import { from } from 'rxjs';



const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: 'header',
        component: HeaderComponent
      },
      {
        path: 'menu',
        component: MainMenuComponent
      },
      {
        path: 'createEvent',
        component: CreateEventComponent
      },
      {
        path: 'eventActivity',
        component: EventActivityComponent
      }
    ]
  }
]



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CreateEventComponent,
    MainMenuComponent,
    EventActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
