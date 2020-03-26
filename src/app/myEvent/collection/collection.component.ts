import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @Input('totalCollection') totalCollection
  @Input('guestItems') guestItemList
  @Output() guestWithItem: EventEmitter<any> = new EventEmitter<any>();
  displayGuestItems = []
  finalCollection = []
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes in collectiion", changes);
    if (changes.totalCollection && changes.totalCollection.currentValue) {
      this.finalCollection = changes.totalCollection.currentValue
    }
    if (changes.guestItemList && changes.guestItemList.currentValue) {
      this.displayGuestItems = changes.guestItemList.currentValue
    }

  }

  displayGuestList() {
    console.log("check the button")
    this.guestWithItem.emit('guestItems')
  }
}
