import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
declare var $: any;


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private sub: any;
  private hash: any;
  forgotPasswordForm: FormGroup;
  match: boolean = false;
  isDisable = false;
  isLoad = false
  show1: boolean;
  show2: boolean;
  pwd1: boolean;
  pwd2: boolean;
  newPassword;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService,
    private alertService: AlertService
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.hash = params.id;
      console.log(this.hash);
    })
  }

  ngOnInit() {

    /**
     * Form of forgot password
     */
    this.forgotPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
  }

  /**
  * @param(hash) encrypted eventId
  * Generate new password when user forgot password 
  */
  resetPassword(hash?) {
    this.isLoad = true
    this.isDisable = true;
    // let password = this.forgotPasswordForm.controls.newPassword.value
    // this.newPassword = password
    // console.log("enter password details=========", password)
    // let string = String(password)
    // let encrypted = global.Buffer.from(string).toString('base64');
    // this.forgotPasswordForm.controls.newPassword.setValue(encrypted);
    console.log("current password value", this.forgotPasswordForm.value);
    this._loginService.forgotPasswordWithLink(this.forgotPasswordForm.value, this.hash)
      .subscribe((data: any) => {
        console.log("reset password done by user", data);
        this.isLoad = false
        this.alertService.getSuccess(data.message);
        this.isDisable = false;
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.isLoad = false
        this.alertService.getError(err.message);
      })
  }


  /**
   * Display error message for signUp form
   */
  get f() { return this.forgotPasswordForm.controls; }

  comparePassword(form) {
    this.isDisable = true
    console.log(form.value.newPassword == form.value.confirmPassword, this.match);
    if (form.value.newPassword === form.value.confirmPassword) {
      console.log("In true condition");
      this.match = true;
      this.isDisable = false
    } else {
      this.match = false;
    }
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
