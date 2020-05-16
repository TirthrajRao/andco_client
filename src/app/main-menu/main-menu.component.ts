import { Component, OnInit, Inject, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service'
import { AlertService } from '../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('userName'));
  eventOfUser = JSON.parse(sessionStorage.getItem('userEvent'));
  isDisplay = JSON.parse(sessionStorage.getItem('isDisplayName'));
  index
  isMenu = JSON.parse(sessionStorage.getItem('isMenu'));
  data: any;
  dialogRef: MatDialogRef<any>;
  isClosed = false
  constructor(
    public _loginService: LoginService,
    public router: Router,
    public alertService: AlertService,
    // public dialogRef: MatDialogRef<MainMenuComponent>,
    private injector: Injector


    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!this.router.url.includes('/menu')) {
      this.data = this.injector.get(MAT_DIALOG_DATA)
      this.dialogRef = this.injector.get(MatDialogRef)
      this.dialogRef.disableClose = true;
      this.isClosed = true
      // this.dialogRef.close('newOne');
    }
    else{
      
    }

    this._loginService.getNewMenu().subscribe(res => {
      console.log("respone when click on menu", res);
      this.isMenu = res.menu
    })
  }

  ngOnInit() {
    console.log("this is call when come from route=========");

    if (this.index != 1) {
      console.log("what is the value in ng ", this.index);
      this.index = 0
    }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    console.log("username", this.isDisplay)
    if (this.eventOfUser == 'false') {
      // this.index = 0
    } else if (this.eventOfUser == 'true') {
      // this.index = Number(this.index) + +1
    }
    $('.menu-links ul li a').click(function (e) {
      $('.menu-links ul li.active').removeClass('active');
      var $parent = $(this).parent();
      $parent.addClass('active');
      e.preventDefault();
    });
  }
  /**
   * Logout from application and clear storage
   */
  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
    this.closeModel()
  }

  displaySecondMenu(index) {
    // console.log("click thay che ke nai", index)
    this.index = Number(index) + +1
    // console.log("index of menu", this.index)
  }
  getHeader(event) {
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/createEvent']);
      this.closeModel()
    }
  }
  getMenu(event) {
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/myevent']);
      this.closeModel()
    }
  }

  getBankAccount(event) {
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/add-bank-account']);
      this.closeModel()
    }
  }

  getCollection(event){
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/main-collection']);
      this.closeModel()
    }
  }

  closeModel() {
    if (this.dialogRef){
      this.dialogRef.close('newOne');
    }
  }
}
