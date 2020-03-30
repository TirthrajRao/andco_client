import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-guest-menu',
  templateUrl: './guest-menu.component.html',
  styleUrls: ['./guest-menu.component.css']
})
export class GuestMenuComponent implements OnInit {
  @Output() displayActivity: EventEmitter<any> = new EventEmitter<any>()


  guestMenu = [
    "activities", "total", "gift-donation", "exit"
  ]

  constructor(
    public loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
    $('#circularMenu a.floating-btn').click(function () {
      $('#circularMenu').toggleClass('active');
    });
    $('menu a.menu-item').click(function () {
      $('#circularMenu').removeClass('active');
    });
  }

  allActivities() {
    console.log("click on activity");
    this.displayActivity.emit(0)
  }


  totalOfItems() {
    this.displayActivity.emit(1)
  }
  donationOfEvent() {
    this.displayActivity.emit(2)
  }


  logout() {
    this.loginService.logout()
    this.router.navigate(['/login']);
  }


}
