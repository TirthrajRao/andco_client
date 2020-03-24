import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-guest-collection',
  templateUrl: './guest-collection.component.html',
  styleUrls: ['./guest-collection.component.css']
})
export class GuestCollectionComponent implements OnInit {
  @Input('guestItems') guestItems
  displayGuestItems = []
  current = 0

  firstLetter = []
  secondLetter = []

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.guestItems.currentValue) {
      this.current = 0
      this.displayGuestList(changes.guestItems.currentValue)
    }
    console.log("item of guest list in his page", this.displayGuestItems);

  }
  displayGuestList(list) {
    this.displayGuestItems = list
    console.log("total list", list.length);

    list.forEach(singleList => {
      this.firstLetter.push(singleList.firstName.charAt(0))
      console.log("singleItem", this.firstLetter);
      // console.log("first letter of word", firstLetter);
      this.secondLetter.push(singleList.lastName.charAt(0))
    });
  }

}
