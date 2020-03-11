import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { config } from '../../config';
import { throwToolbarMixedModesError } from '@angular/material';


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
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public alertService: AlertService
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

  guestEventWithOutLogin(eventhashTag) {
    this.eventService.getGuestEventDetails(eventhashTag).subscribe((response: any) => {
      console.log("details of event with link", response)
      this.eventDetails = response.data
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
    this.index = 3
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
    this.selectedAccount = event.type
  }

  displayAccount(event) {
    this.index = event
  }
}
