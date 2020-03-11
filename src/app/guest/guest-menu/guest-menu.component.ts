import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guest-menu',
  templateUrl: './guest-menu.component.html',
  styleUrls: ['./guest-menu.component.css']
})
export class GuestMenuComponent implements OnInit {
  @Output() displayActivity: EventEmitter<any> = new EventEmitter<any>()


  guestMenu = [
    "activities", "total", "guest", "gift-donation"
  ]

  constructor() { }

  ngOnInit() {
  }

  allActivities() {
    console.log("click on activity");
    this.displayActivity.emit(0)
  }

}
