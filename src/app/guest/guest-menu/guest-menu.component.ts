import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-guest-menu',
  templateUrl: './guest-menu.component.html',
  styleUrls: ['./guest-menu.component.css']
})
export class GuestMenuComponent implements OnInit {
  @Input('closed') isClosed
  @Output() displayActivity: EventEmitter<any> = new EventEmitter<any>()
  isClose
  totalEventList = JSON.parse(sessionStorage.getItem('eventList'))
  isMenu = false
  guestMenu = [
    "activities", "total", "gift-donation", "exit"
  ]
  isDisable
  constructor(
    public loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
    $('#circularMenu a.floating-btn').click(() => {
      $('#circularMenu').toggleClass('active');
    });
    $('menu a.menu-item').click(() => {
      $('#circularMenu').removeClass('active');
    });

    // if (this.totalEventList > 1) {
    //   this.isMenu = true
    // } else {
    //   console.log("call this ");
    //   this.isMenu = false
    // }

  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log("cahnges in menu for my event===========", changes.isClosed.currentValue);
    // this.isClose = changes.isClosed.currentValue
    let challenge = changes.isClosed.currentValue
    console.log("what is the value of check", challenge);

    if (challenge == true) {
      console.log("call this when payment is closed")
      // $(document)
      // $("#donation")
      //   // .css('pointer-events', 'none')
      //   // .css('color', '#ccc')
      //   .css('cursor', 'not-allowed')

      this.isDisable = true
    } else {
      console.log("when payment is open");
      this.isDisable = false

    }
  }
  disabledFunction() {
    console.log("value of =================", this.isDisable)
  }


  allActivities() {
    console.log("click on activity");
    this.displayActivity.emit(0)
  }


  totalOfItems() {
    console.log("click or not");
    this.displayActivity.emit(1)
  }
  donationOfEvent() {
    this.displayActivity.emit(2)
  }

  displayMyEvent(event) {
    let output = this.loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/myevent']);
    }
  }


  logout() {
    this.loginService.logout()
    this.router.navigate(['/login']);
  }

}
