import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-welcome-guest',
  templateUrl: './welcome-guest.component.html',
  styleUrls: ['./welcome-guest.component.css']
})
export class WelcomeGuestComponent implements OnInit {

  private sub: any
  private hashtag: any
  private platForm: any
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public eventService: EventService
  ) {

    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log("params id for guest", params);
      this.hashtag = params.id
      this.platForm = params.type
    })
    console.log("if came form any platform", this.platForm);
    if (this.platForm != undefined) {
      sessionStorage.setItem('platForm', JSON.stringify(this.platForm))
    } else {
      sessionStorage.setItem('platForm', JSON.stringify('GN'))
    }
    this.guestEventWithOutLogin(this.hashtag)
    sessionStorage.setItem('guestHashTag', JSON.stringify(this.hashtag))
  }

  ngOnInit() {
  }


  guestEventWithOutLogin(eventhashTag) {
    this.eventService.getGuestEventDetails(eventhashTag).subscribe((response: any) => {
      console.log("details of event with link", response)
    }, error => {
      console.log("error while get link details", error)
    })
  }

}
