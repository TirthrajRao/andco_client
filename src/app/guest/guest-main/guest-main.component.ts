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
    this.eventService.joinEvent(eventId).subscribe((response:any) => {
      console.log("response of join event", response);
      this.isJoin = true
      this.alertService.getSuccess(response.message)
    }, error => {
      console.log("erorr while join event", error)
    })
  }


  // joinNow(id) {
  //   this.isLoad = true;
  //   console.log("after login send event id", id);
  //   this._eventService.joinEvent(id)
  //     .subscribe((data: any) => {
  //       this.isLoad = false;
  //       console.log("join event done", data);
  //       this.isDisable = true;
  //       this.isJoined = true;
  //       this.alertService.getSuccess(data.message)
  //       this.router.navigate(['/home/view-event/', id])
  //     }, err => {
  //       this.isLoad = false;
  //       console.log(err);
  //       this.alertService.getError(err.message);
  //     })
  // }

}
