import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { SocialLoginService } from '../services/social-login.service';
import { config } from '../config'
import { from } from 'rxjs';
// import { Buffer } from 'buffer';
declare const $: any;
declare var global: any;
(window as any).global = window;
(window as any).global.Buffer = (window as any).global.Buffer;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FB: any;

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  isDisable = false;
  isUserLoggedIn = false;
  isLoad = false;
  userName
  isCelebrant
  eventIdWithLogin = JSON.parse(sessionStorage.getItem('newEventId'));
  varificationEmail
  displayPassword;
  show: boolean;
  pwd: boolean;


  constructor(
    public _loginService: LoginService,
    public router: Router,
    public alertService: AlertService,
    public socialLoginService: SocialLoginService
  ) {
    this._loginService.faceBookLogin.subscribe(data => {
      console.log("data of click", data)
    })


    if (this._loginService.currentUserValue) {
      this.router.navigate(['/menu']);
    }

  }

  ngOnInit() {

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });


    /**
     * Login form for user
     */
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });


    /**
     * Forgot password forn
     */
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });


    /**
     * AppId of facebook to login with facebook 
     */




  }

  /**
   * function of display error 
   */
  get f() { return this.loginForm.controls; }

  get g() { return this.forgotPasswordForm.controls; }



  /**
   * @param {JSON} email,password
   * for login with created email and password
   */
  onSubmitLogin() {
    this.isLoad = true;
    this.isDisable = true;
    console.log("login details", this.loginForm.value);
    let password = this.loginForm.controls.password.value
    this.displayPassword = password
    console.log("enter password details=========", this.displayPassword)
    let string = String(password)
    let encrypted = global.Buffer.from(string).toString('base64');
    console.log("password in other language=======", encrypted)
    this.loginForm.controls.password.setValue(encrypted)
    this._loginService.login(this.loginForm.value)
      .subscribe(data => {
        console.log("data of invalid user", data);
        let firstName = data.data.firstName
        this.userName = firstName;
        console.log(this.userName);
        console.log("response of login user", data);
        // this.userRole = data.data.UserRole;
        console.log("admin login entry", data.data.UserRole);
        sessionStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        sessionStorage.setItem('userName', JSON.stringify(this.userName));
        console.log(this.isCelebrant);
        this.isDisable = true;
        if (this.eventIdWithLogin) {
          this.isLoad = false;
          this.isUserLoggedIn = true;
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          // this.router.navigate(['/home/view-event/', this.eventIdWithLogin])
        } else if (data.data.UserRole == 'admin') {
          this.isLoad = false
          // this.router.navigate(['/home/admin-dashboard']);
        } else if (data.data.UserRole == 'user') {
          let eventList = data.data.eventId
          console.log("detils of event list", eventList)
          this.isLoad = false
          this.isUserLoggedIn = true;
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          sessionStorage.setItem('userEvent', JSON.stringify(eventList))
          this.router.navigate(['/menu']);
        }
      }, (err: any) => {
        this.isLoad = false;
        let varification = err.error.data;
        console.log("err of invalid", err)
        this.alertService.getError(err.error.message)
        this.isDisable = false;
        // this.
        // this.loginForm.reset();
        this.varificationEmail = varification.useremail
        sessionStorage.setItem('varificationEmail', JSON.stringify(this.varificationEmail));
        this.router.navigate(['/verification']);
      })
  }


  signWithGoogle() {
    this.socialLoginService.signInWithGoogleAccount()
  }

  signWithFacebook() {
    this.socialLoginService.signWithFacebook()
  }


  forgotPassword(email) {
    console.log("value of email======", email)
  }

  updatePassword() {
    this.isLoad = true
    console.log("forgot password value", this.forgotPasswordForm)
    this._loginService.forgotPassword(this.forgotPasswordForm.value)
      .subscribe((data: any) => {
        console.log("response of forgot password", data);
        this.isLoad = false
        this.alertService.getSuccess(data.message);
        // this.router.navigate(['/login']);
        this.forgotPasswordForm.reset()
      }, err => {
        console.log(err);
        this.isLoad = false
        this.alertService.getError(err.message);
      })
  }

  /**
   * Show password when user login 
   */
  password() {
    this.show = !this.show;
    this.pwd = !this.pwd;
  }
}
