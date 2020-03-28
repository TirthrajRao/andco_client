import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service'
import { AlertService } from '../services/alert.service';
declare var $;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('userName'));
  eventOfUser = JSON.parse(sessionStorage.getItem('userEvent'));
  index = 0
  constructor(
    public _loginService: LoginService,
    public router: Router,
    public alertService: AlertService
  ) { }

  ngOnInit() {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // console.log("username", this.eventOfUser)
    if (this.eventOfUser == 'false') {
      this.index = 0
    } else if (this.eventOfUser == 'true') {
      this.index = Number(this.index) + +1
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
    }
  }
  getMenu(event) {
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/myevent']);
    }
  }
}
