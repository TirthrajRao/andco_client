import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { config } from '../../config';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-guest-main',
  templateUrl: './guest-main.component.html',
  styleUrls: ['./guest-main.component.css']
})
export class GuestMainComponent implements OnInit {
  private sub: any
  private hashtag: any
  eventDetails
  isJoin
  isDisable = false
  isDonation = false
  activityDisplay = false
  itemsDisplay = false
  isAddress = false
  index = 0
  path = config.baseMediaUrl;
  totalActivityList = []
  totalItemList = []
  removeItem
  selectedAccount
  eventTheme
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public alertService: AlertService,
    public themeService: ThemeService
  ) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log("params id for guest", params);
      this.hashtag = params.hashTag
    })
    console.log("event hashtag", this.hashtag)
    this.guestEventWithOutLogin(this.hashtag)
    // sessionStorage.setItem('guestHashTag', JSON.stringify(this.hashtag))
  }

  ngOnInit() {
  }



  getBackGround() {
    // if (this.eventDetails.eventTheme) {
    return `url(` + this.eventTheme + `)`;
    // }

  }

  guestEventWithOutLogin(eventhashTag) {
    this.eventService.getGuestEventDetails(eventhashTag).subscribe((response: any) => {
      console.log("details of event with link", response)
      this.eventDetails = response.data
      this.eventTheme = this.eventDetails.eventTheme
      // this.themeService.toggleDark()
      this.isJoin = this.eventDetails.isJoined
    }, error => {
      console.log("error while get link details", error)
    })
  }

  joinEvent(eventId) {
    console.log("event id", eventId);
    this.eventService.joinEvent(eventId).subscribe((response: any) => {
      console.log("response of join event", response);
      this.isJoin = true
      this.alertService.getSuccess(response.message)
    }, error => {
      console.log("erorr while join event", error)
    })
  }
  displayActivity(event) {
    console.log("when click on activity", event);
    this.isDisable = true
    this.index = event
    this.totalActivityList = this.eventDetails.activity
  }
  totalItem(event) {
    console.log("total item display in main", event);
    this.index = event.index
    this.totalItemList = event
  }

  removeItemOfArray(event) {
    console.log("event of add more", event);
    this.index = event.index
    this.removeItem = event.removeItems
    console.log("event when item remove", this.removeItem);
  }

  donationAdd(event) {
    console.log("add donation", event);
    this.index = event
  }
  displayItems(event) {
    this.index = event
  }
  displayAddress(event) {
    this.index = event

  }
  selectPayment(event) {
    this.index = event
  }
  selectedAccountType(event) {
    this.index = event.index
    this.selectedAccount = ({ type: event.type, total: event.finalTotal })
  }

  displayAccount(event) {
    this.index = event
  }
}
