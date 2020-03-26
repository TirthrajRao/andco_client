import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { LoginService } from './login.service';
import { AuthService } from "angularx-social-login";
import { AlertService } from './alert.service';
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';
declare const FB: any;
@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  userName
  userRole
  isUserLoggedIn = false;
  @Output() isLoad = new EventEmitter();

  eventIdWithLogin = JSON.parse(sessionStorage.getItem('guestHashTag'));

  constructor(

    private authService: AuthService,
    public loginService: LoginService,
    public alertService: AlertService,
    public router: Router,
    // public environmentFile: environment
  ) {

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
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      // console.log("response of google login ", res);
      const googleIdToken = res.idToken;
      googleIdToken
      // console.log("google id of login user", googleIdToken);
      this.loginService.googleLogin(googleIdToken).subscribe(data => {
        let firstName = data.data.firstName
        // let lastName = data.data.lastName
        this.userName = firstName;
        // console.log(this.userName);
        // console.log("response of login user", data);
        this.userRole = data.data.UserRole;
        // console.log("admin login entry", data.data.UserRole);
        sessionStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        sessionStorage.setItem('userName', JSON.stringify(this.userName));
        // console.log("response positive of google", data);
        if (this.eventIdWithLogin) {
          // this.isLoad = false;
          this.isUserLoggedIn = true;
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/guest-join/', this.eventIdWithLogin])
        }
        else {
          this.isLoad.emit('false')
          this.isUserLoggedIn = true;
          this.router.navigate(['/menu']);
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          return true
        }
      }, err => {
        // this.isLoad = false;
        // console.log("error display", err);
        // this.alertService.getError(err.error.message);
      })
    }).catch((err) => {
      this.alertService.getError(err.error.message)
      // console.log(err);
    });
  }



  /**
   * Login with facebook account
   */
  signWithFacebook() {
    this.isLoad.emit('true')
    // this.isLoad = true;
    // this.isDisable = true;
    // console.log("submit login to facebook");
    FB.login((response) => {
      // console.log('submitLogin', response);
      let facebookId = response.authResponse.accessToken;
      // console.log("facebook id of user", facebookId);
      if (response.authResponse) {
        this.loginService.facebookLogin(facebookId)
          .subscribe((data: any) => {
            // console.log("data of facebook login user", data);
            let firstName = data.data.firstName
            let lastName = data.data.lastName
            this.userName = firstName;
            sessionStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
            sessionStorage.setItem('userName', JSON.stringify(this.userName));

            if (this.eventIdWithLogin) {
              // this.isLoad = false
              this.isUserLoggedIn = true;
              sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
              this.router.navigate(['/guest-join/', this.eventIdWithLogin])
            }
            else {
              this.isLoad.emit('false')
              // this.isLoad = false
              this.router.navigate(['/menu']);
              // this.isDisable = false;
              this.isUserLoggedIn = true;
              sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
            }
          }, err => {
            // this.isLoad = false;
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
