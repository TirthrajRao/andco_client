import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatSelectModule } from '@angular/material/fesm2015/select';



// Child component of home page
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from '../header/header.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { CreateEventComponent } from '../createEvent/create-event/create-event.component';
import { EventActivityComponent } from '../createEvent/event-activity/event-activity.component';
import { EventGroupComponent } from '../createEvent/event-group/event-group.component'
import { LoaderComponent } from '../loader/loader.component';
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
      },
      {
        path: 'eventGroup',
        component: EventGroupComponent
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
    EventActivityComponent,
    EventGroupComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    // MatSelectModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class HomeModule { }
