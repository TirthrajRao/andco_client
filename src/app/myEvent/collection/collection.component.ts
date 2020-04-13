import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @Input('totalCollection') totalCollection
  @Input('guestItems') guestItemList
  @Output() guestWithItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() loaderValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() totalCollectionList: EventEmitter<any> = new EventEmitter<any>();
  @Output() printClick: EventEmitter<any> = new EventEmitter<any>()
  displayGuestItems = []
  finalCollection = []
  navTabs = ["Total", "Guests"]
  selectedIndex = 0
  eventId
  noGuestList
  isClose
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes in collectiion", changes);
    // this.isClose = changes.isClosed.currentValue

    if (changes.totalCollection && changes.totalCollection.currentValue) {
      this.selectedIndex = 0
      this.finalCollection = changes.totalCollection.currentValue
      this.loaderValue.emit('false')
      // this.selectedIndex = 0
    }
    if (changes.guestItemList && changes.guestItemList.currentValue.length) {
      console.log("changes of guest list", changes.guestItemList);
      this.eventId = changes.guestItemList.currentValue
      this.getGuestList(this.eventId)
      // this.displayGuestItems = changes.guestItemList.currentValue
      // this.selectedIndex = 1
    }
  }


  getGuestList(eventId) {
    this.eventService.getItemsOfGuest(eventId).subscribe((response: any) => {
      console.log("guest details in main ", response);
      if (response && response.data.length > 0) {
        // response.data['eventId'] = this.eventId
        this.displayGuestItems = response.data
        this.selectedIndex = 1
        this.noGuestList = ''
      } else if (response && response.data.length == 0) {
        this.selectedIndex = 1
        this.noGuestList = 'noList'
        this.displayGuestItems = []
      }
    }, error => {
      console.log("error while get list of guest", error)
    })
  }
  // displayGuestList() {
  //   console.log("check the button")
  //   this.guestWithItem.emit('guestItems')
  // }


  selectedTab(i) {
    this.selectedIndex = i
    if (i == 1) {
      this.guestWithItem.emit('guestItems')
    }
  }

  listOfGuest(event) {
    console.log("list ready for guest in sub main page", event);
    this.totalCollectionList.emit(event)
  }

  clickOnPrint(event) {
    this.printClick.emit(event)
  }

}

