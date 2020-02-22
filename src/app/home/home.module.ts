import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatNativeDateModule, MatInputModule, } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';


// import { MatSelectModule } from '@angular/material/fesm2015/select';



// Child component of home page
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from '../header/header.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { CreateEventComponent } from '../createEvent/create-event/create-event.component';
import { EventActivityComponent } from '../createEvent/event-activity/event-activity.component';
import { EventGroupComponent } from '../createEvent/event-group/event-group.component'
import { LoaderComponent } from '../loader/loader.component';
import { ActivitySliderComponent } from '../createEvent/activity-slider/activity-slider.component';
import { GroupSliderComponent } from '../createEvent/group-slider/group-slider.component'; 
import { SetPriceComponent } from '../createEvent/set-price/set-price.component';
import { BankDetailsComponent } from '../createEvent/bank-details/bank-details.component';
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
      },
      {
        path: 'activity-slider',
        component:ActivitySliderComponent
      },
      {
        path: 'group-slider',
        component: GroupSliderComponent
      },
      {
        path: 'set-price',
        component: SetPriceComponent
      },
      {
        path: 'bank-details',
        component: BankDetailsComponent
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
    LoaderComponent,
    ActivitySliderComponent,
    GroupSliderComponent,
    SetPriceComponent,
    BankDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
    // MatSelectModule
  ],
  exports: [
    LoaderComponent,
    // MatDatepickerModule
  ]
})
export class HomeModule { }
