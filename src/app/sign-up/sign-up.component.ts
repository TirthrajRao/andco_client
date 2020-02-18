import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { SocialLoginService } from '../services/social-login.service';
// import { Buffer } from 'buffer';
import { from } from 'rxjs';
declare var global: any;
(window as any).global = window;
(window as any).global.Buffer = (window as any).global.Buffer;

declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() loginWithFacebook = new EventEmitter();
  isLoad = false
  index = 0
  totalCount = 4
  signUpForm: FormGroup;
  isDisable = true
  isNot: boolean = false
  isEmail: boolean = false
  submitted = false;
  match: boolean = true;
  show1: boolean;
  show2: boolean;
  pwd1: boolean;
  pwd2: boolean;
  // userDetails = {  firstName: '', lastName: '' }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService,
    private alertService: AlertService,
    private socialLoginService: SocialLoginService
  ) { }

  ngOnInit() {

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
    console.log("details of user name=========", this.signUpForm.value)
    // delete this.signUpForm.controls.confirmPassword
    let password = this.signUpForm.controls.password.value
    console.log("enter password details=========", password)
    let string = String(password)
    let encrypted = global.Buffer.from(string).toString('base64');
    this.signUpForm.controls.password.setValue(encrypted);

    this.signUpForm.removeControl('confirmPassword')
    this._loginService.signUpOfEmail(this.signUpForm.value).subscribe((res: any) => {
      console.log("user created completed", res)
      this.isLoad = false
      this.router.navigate(['/login']);
    }, error => {
      this.isLoad = false
      console.log("error while create new user", error)
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
    this.isLoad = true
    console.log("index of sectioni", index)
    console.log("emails details", this.signUpForm.controls.email.value)
    let email = this.signUpForm.controls.email.value
    this._loginService.mailSendForCode(email).subscribe((res: any) => {
      this.isLoad = false
      this.alertService.getSuccess(res.message)
      console.log("code send to uesr", res)
      this.index = Number(index) + + 1
    }, error => {
      this.isLoad = false
      if (error.status == 409) {
        this.alertService.getError(error.error.message)
        console.log("ama javu joye")
        this.index = Number(index) + + 1
      } else {
        this.alertService.getError(error.error.message)
      }
      console.log("error while send code to user", error)
    })
  }

  /** 
   * @param data (email of user)
   * @param index Index of section
   * Verify user email with code
   */
  verifyCode(data, index) {
    this.isLoad = true
    console.log("data of code", data)
    let code = data
    let string = String(code)
    let encrypted = global.Buffer.from(string).toString('base64');
    console.log("send code in juda form ma", encrypted)
    const verified = {
      code: encrypted,
      email: this.signUpForm.controls.email.value
    }
    console.log("details to check email is right or not", verified)
    this._loginService.verificationCode(verified).subscribe((res: any) => {
      console.log("verification completed", res)
      this.isLoad = false
      this.index = Number(index) + + 1
    }, error => {
      this.isLoad = false
      console.log("error while verify user", error)
      this.alertService.getError(error.error.message)
    })
  }


  comparePassword(form, index) {
    // console.log("new password with =====", newPassword)
    // this.isDisable = true
    console.log(form.value.password == form.value.confirmPassword, this.match);
    if (form.value.password === form.value.confirmPassword) {
      console.log("In true condition");
      this.match = false;
      // this.isDisable = false

    } else {
      this.match = true;
    }

  }


  passwordUpdate(index) {
    console.log("index of current section", index)
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
  validateFirstName(form) {
    console.log(form);
    const nameInput = /[a-zA-Z ]/;

    $("#firstName").on({
      keydown: function (e) {
        if (e.which === 32)
          return false;
      },
      change: function () {
        this.value = this.value.replace(/\s/g, "");
      }
    });
    let message1 = document.getElementById('message1');
    if (!form.firstName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }
  /**
     * @param {String} form
     * Validation of lastName in signUp form  
     */
  validateLastName(form) {
    this.isDisable = false;
    console.log(form);
    const nameInput = /[a-zA-Z ]/;
    $("#lastName").on({
      keydown: function (e) {
        if (e.which === 32)
          return false;
      },
      change: function () {
        this.value = this.value.replace(/\s/g, "");
      }
    });
    let message1 = document.getElementById('message2');
    if (!form.firstName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }

  enterEmail(emailAddress) {
    console.log("email of yser", this.signUpForm.controls.email)
    let newEmail = this.signUpForm.controls.email
    if (newEmail.status == 'VALID') {
      this.isDisable = false
    } else {
      this.isDisable = true
    }
  }


  signWithGoogle() {
    this.socialLoginService.signInWithGoogleAccount()
  }

  signWithFacebook() {
    this.socialLoginService.signWithFacebook()
  }


  password1() {
    console.log("call thay che ke nai")
    this.show1 = !this.show1;
    this.pwd1 = !this.pwd1;
  }

  password2() {
    this.show2 = !this.show2;
    this.pwd2 = !this.pwd2;
  }
}
