import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {} from '@angular/material'
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AuthInterceptor } from './services/auth.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DisplayHomeComponent } from './display-home/display-home.component';
import { LoginService } from './services/login.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { LoaderComponent } from './loader/loader.component';
import { HomeModule } from './home/home.module';
import { WelcomeGuestComponent } from './welcome-guest/welcome-guest.component';
import { GuestJoinComponent } from './guest-join/guest-join.component';
import { SearchListPipe } from './search-list.pipe';
import { AddBankModalComponent } from './add-bank-modal/add-bank-modal.component';
import { AddCardmodalComponent } from './add-cardmodal/add-cardmodal.component';
// import { AttachMentComponent } from './myEvent/attach-ment/attach-ment.component';
// import { DescriptionComponent } from './guest/description/description.component';
// import { MainCollectionComponent } from './menu-collection/main-collection/main-collection.component';
// import { MainTotalCollectionComponent } from './menu-collection/main-total-collection/main-total-collection.component';
// import { MainGuestCollectionComponent } from './menu-collection/main-guest-collection/main-guest-collection.component';
// import { AddBankAccountComponent } from './add-bank-account/add-bank-account.component';



// import { HomeComponent } from './home/home.component';


/**
 * Key For login with google and facebook 
 */
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("261246561965-ikogp2hbouqaj7l9deflfr176lqa3p3u.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("482643935736240")
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DisplayHomeComponent,
    ForgotPasswordComponent,
    WelcomeGuestComponent,
    GuestJoinComponent,
    AddBankModalComponent,
    AddCardmodalComponent,
    // AttachMentComponent,
    // DescriptionComponent,
    // MainCollectionComponent,
    // MainTotalCollectionComponent,
    // MainGuestCollectionComponent,
    // AddBankAccountComponent,
    // LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    HomeModule,
    MatDatepickerModule,
    // MatSelectModule
  ],
  entryComponents: [
    AddBankModalComponent,
    AddCardmodalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    LoginService,
    SearchListPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
