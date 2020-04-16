import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service'
import { AlertService } from '../services/alert.service';
import { config } from '../config';
@Component({
  selector: 'app-guest-join',
  templateUrl: './guest-join.component.html',
  styleUrls: ['./guest-join.component.css']
})
export class GuestJoinComponent implements OnInit {

  private sub: any
  private hashTag: any
  eventDetails: any;
  isJoin: any;
  platForm = JSON.parse(sessionStorage.getItem('platForm'))
  path = config.baseMediaUrl;
  constructor(
    public router: Router,
    public activated: ActivatedRoute,
    public eventService: EventService,
    public alertService: AlertService,
    public loginSerivce: LoginService
  ) { }

  ngOnInit() {
    this.sub = this.activated.params.subscribe(param => {
      this.hashTag = param.hashTag
    })
    this.getEventDetails(this.hashTag)
    // console.log("plat form of guest", this.platForm);

  }


  getEventDetails(hashTag) {
    this.eventService.getGuestEventDetails(hashTag).subscribe((response: any) => {
      console.log("details of event with link", response)
      this.eventDetails = response.data
      // this.themeService.toggleDark()
      this.isJoin = this.eventDetails.isJoined
    }, error => {
      console.log("error while get link details", error)
    })
  }


  joinEvent(eventId) {
    console.log("event id", eventId);
    const data = {
      eventId: eventId,
      platForm: this.platForm
    }
    this.eventService.joinEvent(data).subscribe((response: any) => {
      console.log("response of join event", response);
      this.isJoin = true
      this.alertService.getSuccess(response.message)
    }, error => {
      console.log("erorr while join event", error)
      this.alertService.getError(error.message)
    })
  }

  displayGuest() {
    // this.router.navigate(['/guest/', this.hashTag])

    let data = '/guest/' + this.hashTag
    let output = this.loginSerivce.returnLogin(data);
    if (output == true) {
      this.router.navigate(['/guest/', this.hashTag])
    }

  }

}
