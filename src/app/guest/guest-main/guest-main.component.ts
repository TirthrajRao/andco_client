import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { config } from '../../config';


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
  path = config.baseMediaUrl;
  activityDisplay = false
  totalActivityList = []
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
    this.activityDisplay = true
    this.totalActivityList = this.eventDetails.activity
  }

}
