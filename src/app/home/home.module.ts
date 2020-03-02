import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatNativeDateModule, MatInputModule, } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
import { CreatedEventMessageComponent } from '../createEvent/created-event-message/created-event-message.component';
import { AllSliderComponent } from '../myEvent/all-slider/all-slider.component';
import { MyEventActivityComponent } from '../myEvent/my-event-activity/my-event-activity.component';
import { MyEventComponent } from '../myEvent/my-event/my-event.component';
import { MyEventRadialMenuComponent } from '../myEvent/my-event-radial-menu/my-event-radial-menu.component';
import { MyEventLinkComponent } from '../myEvent/my-event-link/my-event-link.component';
import { InvitedGuestComponent } from '../myEvent/invited-guest/invited-guest.component';
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
        path: 'eventActivity/:id',
        component: EventActivityComponent
      },
      {
        path: 'eventGroup/:id',
        component: EventGroupComponent
      },
      {
        path: 'activity-slider',
        component: ActivitySliderComponent
      },
      {
        path: 'group-slider',
        component: GroupSliderComponent
      },
      {
        path: 'set-price/:id',
        component: SetPriceComponent
      },
      {
        path: 'bank-details',
        component: BankDetailsComponent
      },
      {
        path: 'created-event-message',
        component: CreatedEventMessageComponent
      },
      {
        path: 'all-slider',
        component: AllSliderComponent
      },
      {
        path: "myEvent-activity",
        component: MyEventActivityComponent
      },
      {
        path: 'myevent',
        component: MyEventComponent
      },
      {
        path: 'radial-menu',
        component: MyEventRadialMenuComponent
      },
      {
        path: 'my-event-link',
        component: MyEventLinkComponent
      },
      {
        path: 'invited-guest',
        component: InvitedGuestComponent
      },
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
    BankDetailsComponent,
    CreatedEventMessageComponent,
    AllSliderComponent,
    MyEventActivityComponent,
    MyEventComponent,
    MyEventRadialMenuComponent,
    MyEventLinkComponent,
    InvitedGuestComponent
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
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule
    // MatSelectModule
  ],
  exports: [
    LoaderComponent,
    // MatDatepickerModule
  ],
  providers: [
    DatePipe
  ]
})
export class HomeModule { }
