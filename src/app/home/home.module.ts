import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatNativeDateModule, MatInputModule, MatTabsModule, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ShareModule } from '@ngx-share/core'
import { ShareButtonModule } from '@ngx-share/button';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

// import { NgbdAlertSelfclosing } from './alert-selfclosing';

// import {MatTabsModule} from '@angular/material/tabs';



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
import { MyEventLinkComponent } from '../myEvent/my-event-link/my-event-link.component';
import { InvitedGuestComponent } from '../myEvent/invited-guest/invited-guest.component';
import { EventProfilePicComponent } from '../myEvent/event-profile-pic/event-profile-pic.component';
import { CollectionComponent } from '../myEvent/collection/collection.component';
import { EventMenuComponent } from '../myEvent/event-menu/event-menu.component';
import { TotalCollectionComponent } from '../myEvent/total-collection/total-collection.component';
import { GuestCollectionComponent } from '../myEvent/guest-collection/guest-collection.component';
import { GuestMainComponent } from '../guest/guest-main/guest-main.component';
import { GuestMenuComponent } from '../guest/guest-menu/guest-menu.component';
import { GuestActivitySliderComponent } from '../guest/guest-activity-slider/guest-activity-slider.component';
import { GuestItemTotalComponent } from '../guest/guest-item-total/guest-item-total.component';
import { GiftDonationComponent } from '../guest/gift-donation/gift-donation.component';
import { GuestAddressComponent } from '../guest/guest-address/guest-address.component';
import { PaymentComponent } from '../guest/payment/payment.component';
import { PaymentDetailsComponent } from '../guest/payment-details/payment-details.component';
import { PaymentMessageComponent } from '../guest/payment-message/payment-message.component';
import { AddBankAccountComponent } from '../add-bank-account/add-bank-account.component';
import { ExcelService } from '../services/excel.service';
import { MainCollectionComponent } from '../menu-collection/main-collection/main-collection.component'
import { MainGuestCollectionComponent } from '../menu-collection/main-guest-collection/main-guest-collection.component';
import { MainTotalCollectionComponent } from '../menu-collection/main-total-collection/main-total-collection.component';
import { DescriptionComponent } from '../guest/description/description.component';
import { AttachMentComponent } from '../myEvent/attach-ment/attach-ment.component';
import { CartComponent } from '../guest/cart/cart.component';
// import { SearchListPipe } from '../services/search-list.pipe';
import { from } from 'rxjs';
import { AuthGuard } from '../auth.guard';
import { ToastrModule } from 'ngx-toastr';




const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
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
        path: 'editEvent/:eventId',
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
        path: 'set-message/:id',
        component: CreatedEventMessageComponent
      },
      {
        path: 'all-slider',
        component: AllSliderComponent
      },
      {
        path: "eventActivity/:hashTag",
        component: MyEventComponent
      },
      {
        path: 'myevent',
        component: MyEventComponent
      },
      {
        path: 'my-event-link',
        component: MyEventLinkComponent
      },
      {
        path: 'invited-guest',
        component: InvitedGuestComponent
      },
      {
        path: 'add-bank-account',
        component: AddBankAccountComponent
      },
      // {
      //   path: 'guestMenu',
      //   component: GuestMenuComponent
      // },
      // {
      //   path: 'guestActivity',
      //   component: GuestActivitySliderComponent
      // },
      {
        path: 'main-collection',
        component: MainCollectionComponent
      },
    ]
  },
  {
    path: ':hashTag',
    component: GuestMainComponent
  },
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
    MyEventLinkComponent,
    InvitedGuestComponent,
    EventProfilePicComponent,
    CollectionComponent,
    EventMenuComponent,
    GuestCollectionComponent,
    TotalCollectionComponent,
    GuestMainComponent,
    GuestMenuComponent,
    GuestActivitySliderComponent,
    GuestItemTotalComponent,
    GiftDonationComponent,
    GuestAddressComponent,
    PaymentComponent,
    PaymentDetailsComponent,
    PaymentMessageComponent,
    AddBankAccountComponent,
    MainCollectionComponent,
    MainTotalCollectionComponent,
    MainGuestCollectionComponent,
    DescriptionComponent,
    AttachMentComponent,
    CartComponent

    // SearchListPipe
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
    NgxMaterialTimepickerModule,
    ShareModule,
    ShareButtonModule,
    ClipboardModule,
    MatTabsModule,
    NgbModule,
    ImageCropperModule,
    ToastrModule.forRoot() // ToastrModule added

    // MatSelectModule
  ],
  entryComponents: [
    MainMenuComponent,
    DescriptionComponent,
    AttachMentComponent
  ],
  exports: [
    LoaderComponent,
  ],
  providers: [
    DatePipe,
    ExcelService,
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
  ]
})
export class HomeModule { }
