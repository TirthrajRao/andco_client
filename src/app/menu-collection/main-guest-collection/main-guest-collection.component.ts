import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-main-guest-collection',
  templateUrl: './main-guest-collection.component.html',
  styleUrls: ['./main-guest-collection.component.css', './../../myEvent/guest-collection/guest-collection.component.css']
})
export class MainGuestCollectionComponent implements OnInit {
  @Input('guestList') guestItems

  displayGuestItems = []
  current: any
  firstLetter: any = [];
  secondLetter: any = [];

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("guest list", changes);

    if (changes.guestItems && changes.guestItems.currentValue) {
      this.displayGuestList(changes.guestItems.currentValue)
    }

  }


  displayGuestList(details) {
    this.displayGuestItems = details
    setTimeout(() => {

      $("#bhudev0").trigger("click")
    }, 100)

    this.displayGuestItems.forEach((singleList) => {
      this.firstLetter.push(singleList.firstName.charAt(0))
      this.secondLetter.push(singleList.lastName.charAt(0))
    })
    console.log("display list", this.displayGuestItems);

  }


}
