import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { SocialLoginService } from '../services/social-login.service';
import { from } from 'rxjs';
import * as CryptoJS from 'crypto-js';

declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('buttonValue', { static: true }) searchElement: ElementRef;
  key = "andCo@testing";

  @Output() loginWithFacebook = new EventEmitter();
  isLoad = false
  index = 0
  totalCount = 4
  signUpForm: FormGroup;
  isDisable = true
  isNot: boolean = false
  isEmail: boolean = false
  isVerified: boolean = true
  submitted = false;
  match: boolean = true;
  show1: boolean;
  show2: boolean;
  pwd1: boolean;
  pwd2: boolean;
  callVerifyCode = false
  userName
  isUserLoggedIn = false;
  // eventIdWithLogin = JSON.parse(sessionStorage.getItem('guestHashTag'));
  // userDetails = {  firstName: '', lastName: '' }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService,
    private alertService: AlertService,
    private socialLoginService: SocialLoginService
  ) { }





  ngOnInit() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });
    /**
     * SignUp form for new user
     */
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      // mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    })
  }






  /**
   * @param index Index of section
   * Get details of user 
   */
  personalDetails() {
    this.isLoad = true
    // console.log("details of user name=========", this.signUpForm.value)
    this.signUpForm.removeControl('confirmPassword')
    this._loginService.signUpOfEmail(this.signUpForm.value).subscribe((res: any) => {
      console.log("user created completed", res)
      let password = res.data.password;
      let emailId = res.data.email
      // console.log("ready for email", emailId);

      var bytes = CryptoJS.AES.decrypt(password, this.key);
      // console.log("this is important", bytes);

      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      // var withOutString = bytes(CryptoJS.enc.Utf8)
      // console.log("this is use full or not", originalText);

      let data = {}
      data['email'] = emailId
      data['password'] = JSON.parse(originalText)
      // data['flag'] = true
      this._loginService.login(data).subscribe((response: any) => {
        // this.isLoad = false
        console.log("response of new sign up after login", response)
        sessionStorage.setItem('isDisplayName', JSON.stringify(false))
        let firstName = response.data.firstName
        this.userName = firstName;
        sessionStorage.setItem('eventList', JSON.stringify(response.data.totalEvent))
        sessionStorage.setItem('userRole', JSON.stringify(response.data.UserRole));
        sessionStorage.setItem('userName', JSON.stringify(this.userName));
        // if (this.eventIdWithLogin) {
        //   this.isLoad = false;
        //   this.isUserLoggedIn = true;
        //   sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
        //   this.router.navigate(['/guest-join/', this.eventIdWithLogin])
        // }
        if (response.data.UserRole == 'admin') {
          this.isLoad = false
          // this.router.navigate(['/home/admin-dashboard']);
        } else if (response.data.UserRole == 'user') {
          let eventList = response.data.eventId
          // console.log("detils of event list", eventList)
          this.isLoad = false
          this.isUserLoggedIn = true;
          sessionStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          sessionStorage.setItem('userEvent', JSON.stringify(eventList))
          this.router.navigate(['/menu']);
        }
      }, error => {
        console.log("error while new login after sign up", error);

      })
      // this.router.navigate(['/login']);
    }, error => {
      this.isLoad = false
      // console.log("error while create new user", error)
    })
  }

  /** 
   * @param index 
   * Get user email to send verification code 
   */
  emailDetails(index) {
    this.index = Number(index) + + 1
  }

  /** 
   * @param index 
   * Send mail to new user for varification code
   */
  verificationCode(index) {
    this.isDisable = true
    this.isLoad = true
    // console.log("index of sectioni", index)
    // console.log("emails details", this.signUpForm.controls.email.value)
    let email = this.signUpForm.controls.email.value
    this._loginService.mailSendForCode(email).subscribe((res: any) => {
      this.isDisable = false
      this.isLoad = false
      this.alertService.getSuccess(res.message)
      // console.log("code send to uesr", res)
      this.index = Number(index) + + 1
    }, error => {
      this.isDisable = false
      this.isLoad = false
      if (error.status == 409) {
        this.alertService.getError(error.error.message)
        // console.log("ama javu joye")
        this.index = Number(index) + + 1
      } else {
        this.alertService.getError(error.error.message)
      }
      // console.log("error while send code to user", error)
    })
  }

  /** 
   * @param data (email of user)
   * @param index Index of section
   * Verify user email with code
   */
  verifyCode(data, index) {
    this.isLoad = true
    // console.log("data of code", data)
    const verified = {
      verificationNewCode: data,
      email: this.signUpForm.controls.email.value
    }
    // console.log("details to check email is right or not", verified)
    this._loginService.verificationCode(verified).subscribe((res: any) => {
      // console.log("verification completed", res)
      this.isLoad = false
      this.index = Number(index) + + 1
    }, error => {
      this.isLoad = false
      // console.log("error while verify user", error)
      this.alertService.getError(error.error.message)
    })
  }


  backBtn() {
    // console.log("enter or not")
  }

  detailsOfBank(event) {
    // console.log("bank details in price form", event);
  }

  enterCode(codeDetails, event, index) {
    const input = document.getElementById("codeInput");
    this.isVerified = true
    // console.log("enter code", codeDetails.length, event)
    if (codeDetails.length == 6) {
      this.isVerified = false
      input.addEventListener("keyup", function (event) {
        // console.log("event of click", event);
        if (event.keyCode == 13) {
          // console.log("ama javu joye to");
          // const model = function () {
          // this.callVerifyCode = true;
          // }
        }
      })
      // this.searchElement.nativeElement.focus();
      // if (this.callVerifyCode == true) {
      //   this.verifyCode(codeDetails, index)
      // }
    }

    else {
      this.isVerified = true
    }
  }


  /** 
   * @param form (both password)
   * @param index index of section
   * Compare new password with confirm password
   */
  comparePassword(form, index) {
    // console.log(form.value.password == form.value.confirmPassword, this.match);
    if (form.value.password === form.value.confirmPassword) {
      // console.log("In true condition");
      this.match = false;
    } else {
      this.match = true;
    }
  }

  /** 
   * @param index Index of section
   * Send to another section
   */
  passwordUpdate(index) {
    // console.log("index of current section", index)
    this.index = Number(index) + + 1
  }

  /**
   * Display error message for signUp form
   */
  get f() { return this.signUpForm.controls; }

  /**
   * @param {String} form
   * Validation of firstName in signUp form  
   */
  validateFirstName(event) {
    // console.log(event.target.value);
    let form = event.target.value;
    // const nameInput = /[a-zA-Z ]/;

    // $("#firstName").on({
    //   keydown: function (e) {
    //     if (e.which === 32)
    //       return false;
    //   },
    //   change: function () {
    //     this.value = this.value.replace(/\s/g, "");
    //   }
    // });
    let message1 = document.getElementById('message1');
    let reg = new RegExp("[a-zA-Z]");
    if (reg.test(form)) {
      // console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = null;
    }
  }
  /**
     * @param {String} form
     * Validation of lastName in signUp form  
     */
  validateLastName(value) {
    this.isDisable = false;
    // console.log(value);
    // const nameInput = /[a-zA-Z ]/;
    // $("#lastName").on({
    //   keydown: function (e) {
    //     if (e.which === 32)
    //       return false;
    //   },
    //   change: function () {
    //     this.value = this.value.replace(/\s/g, "");
    //   }
    // });
    // let message1 = document.getElementById('message2');
    // if (!form.firstName.match(nameInput)) {
    // console.log("message==========", message1)
    //   message1.innerHTML = "Name can not start with digit"
    // } else {
    //   message1.innerHTML = null;
    // }
  }

  /** 
   * @param emailAddress email address
   * Check enter email value is validate or not
   */
  enterEmail(emailAddress) {
    // console.log("email of yser", this.signUpForm.controls.email)
    let newEmail = this.signUpForm.controls.email
    if (newEmail.status == 'VALID') {
      this.isDisable = false
    } else {
      this.isDisable = true
    }
  }

  /**
   * Sign in with google
   */
  signWithGoogle() {
    this.socialLoginService.signInWithGoogleAccount()
  }

  /**
   * Sign in with facebook
   */
  signWithFacebook() {
    this.socialLoginService.signWithFacebook()
  }

  /**
   * Show enter new password
   */
  password1() {
    // console.log("call thay che ke nai")
    this.show1 = !this.show1;
    this.pwd1 = !this.pwd1;
  }


  /**
   * Show confirm password
   */
  password2() {
    this.show2 = !this.show2;
    this.pwd2 = !this.pwd2;
  }

  backFromJoin(index) {
    // console.log("index of section", index)
    this.index = Number(this.index) - 1
    // console.log("after event", this.index)
  }
}
