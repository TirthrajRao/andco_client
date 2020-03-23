import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-invited-guest',
  templateUrl: './invited-guest.component.html',
  styleUrls: ['./invited-guest.component.css']
})
export class InvitedGuestComponent implements OnInit {

  @Input('guestList') displayGuest
  guestFinalList
  firstLetter = []
  secondLetter = []
  constructor() { }

  ngOnInit() {
  }



  ngOnChanges(changes: SimpleChanges) {
    console.log("changes when guest is load", changes.displayGuest.currentValue);
    if (changes.displayGuest && changes.displayGuest.currentValue) {
      this.displayList(changes.displayGuest.currentValue)
    }
  }

  displayList(list) {
    list.forEach(singleList => {
      this.firstLetter.push(singleList.firstName.charAt(0))
      console.log("singleItem", this.firstLetter);
      // console.log("first letter of word", firstLetter);
      this.secondLetter.push(singleList.lastName.charAt(0))
    });
  }

}
