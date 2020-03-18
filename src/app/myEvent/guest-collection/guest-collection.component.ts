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


  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.guestItems.currentValue) {
      this.displayGuestItems = changes.guestItems.currentValue
      this.current = 0
    }
    console.log("item of guest list in his page", this.displayGuestItems);

  }

}
