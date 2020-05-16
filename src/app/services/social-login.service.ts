import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { LoginService } from './login.service';
import { AuthService } from "angularx-social-login";
import { AlertService } from './alert.service';
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, from } from 'rxjs';
declare const FB: any;
@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  userName
  userRole
  isUserLoggedIn = false;
  @Output() isLoad = new EventEmitter();

  eventIdWithLogin

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  constructor(

    private authService: AuthService,
    public loginService: LoginService,
    public alertService: AlertService,
    public router: Router,
    // public environmentFile: environment
  ) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();



    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: environment.fbAppId,
        cookie: true,
        xfbml: true,
        version: environment.fbVersion
      });

      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }




  /**
   * Login with google account  
   */
  signInWithGoogleAccount() {
    this.isLoad.emit('true');
    // this.isDisable = true;
    // console.log("In func")
    // this.eventIdWithLogin = JSON.parse(sessionStorage.getItem('guestHashTag'));
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      const googleIdToken = res.idToken;
      googleIdToken
      this.loginService.googleLogin(googleIdToken).subscribe(data => {
        console.log("hash tag for guest", this.eventIdWithLogin)
        sessionStorage.setItem('isDisplayName', JSON.stringify(data.data.newUser))
        sessionStorage.setItem('eventList', JSON.stringify(data.data.totalEvent))
        sessionStorage.setItem('isMenu', JSON.stringify(0));
        let firstName = data.data.firstName
        this.userName = firstName;
        console.log("response of login user using google", data);
        this.userRole = data.data.UserRole;
        sessionStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        sessionStorage.setItem('userName', JSON.stringify(this.userName));
        if (this.eventIdWithLogin) {
          console.log("is this call for guest");
          this.isLoad.emit('false')
          this.isUserLoggedIn = true;
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/guest-join/', this.eventIdWithLogin])
        }
        else {
          console.log("call this for normal");
          this.isLoad.emit('false')
          this.isUserLoggedIn = true;
          this.router.navigate(['/menu']);
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          return true
        }
      }, err => {
        this.isLoad.emit('false')
      })
    }).catch((err) => {
      this.isLoad.emit('false')
      this.alertService.getError(err.error.message)
      // console.log(err);
    });
  }



  /**
   * Login with facebook account
   */
  signWithFacebook() {
    this.isLoad.emit('true')
    // this.eventIdWithLogin = JSON.parse(sessionStorage.getItem('guestHashTag'));
    FB.login((response) => {
      let facebookId = response.authResponse.accessToken;
      if (response.authResponse) {
        this.loginService.facebookLogin(facebookId)
          .subscribe((data: any) => {
            sessionStorage.setItem('isDisplayName', JSON.stringify(data.data.newUser))
            let firstName = data.data.firstName
            let lastName = data.data.lastName
            this.userName = firstName;
            sessionStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
            sessionStorage.setItem('userName', JSON.stringify(this.userName));
            sessionStorage.setItem('eventList', JSON.stringify(data.data.totalEvent))
            sessionStorage.setItem('isMenu', JSON.stringify(0));
            if (this.eventIdWithLogin) {
              this.isLoad.emit('false')
              this.isUserLoggedIn = true;
              sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
              this.router.navigate(['/guest-join/', this.eventIdWithLogin])
            }
            else {
              this.isLoad.emit('false')
              this.router.navigate(['/menu']);
              this.isUserLoggedIn = true;
              sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
            }
          }, err => {
            // this.isLoad = false;
            this.isLoad.emit('false')
            // console.log("error display", err);
            this.alertService.getError(err.error.message);
          })
      }
      else {
        // console.log('User login failed');
      }
    });

  }
}
