import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service'
import { AlertService } from '../services/alert.service';
import { ThemeService } from '../services/theme.service';

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
  eventTheme
  themeList = ['assets/images/guest.jpg',
    'assets/images/floral.jpg',
    'assets/images/wood.jpg',
    'assets/images/marble.png',
    'assets/images/origami.jpg',
    'assets/images/classic.jpg',
    'assets/images/lines.jpg',
    'assets/images/luxury.png',
    'assets/images/instrument.jpeg']
  constructor(
    public router: Router,
    public activated: ActivatedRoute,
    public eventService: EventService,
    public alertService: AlertService,
    public loginSerivce: LoginService,
    public themeService: ThemeService
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
      this.eventDetails = response.data
      this.eventTheme = this.eventDetails.eventTheme
      // console.log("details of event with link", response)

      switch (this.eventTheme) {
        case 'assets/images/floral.jpg':
          this.themeService.toggleFloral()
          break;
        case 'assets/images/wood.jpg':
          this.themeService.toggleWood()
          break;
        case 'assets/images/marble.png':
          this.themeService.toggleMarble()
          break;
        case 'assets/images/origami.jpg':
          this.themeService.toggleOrigami()
          break;
        case 'assets/images/classic.jpg':
          this.themeService.toggleClassic()
          break;
        case 'assets/images/lines.jpg':
          this.themeService.toggleLines()
          break;
        case 'assets/images/luxury.png':
          this.themeService.toggleLuxury()
          break;
        case 'assets/images/instrument.jpeg':
          this.themeService.toggleInstruments()
          break;
        default:
          this.themeService.toggleDefault()
          break;
      }
      // this.themeService.toggleDark()
      // this.isJoin = this.eventDetails.isJoined
    }, error => {
      console.log("error while get link details", error)
    })
  }


  getBackGround() {
    // if (this.eventDetails.eventTheme) {
    return `url(` + this.eventTheme + `)`;
    // }

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

    let data = '/' + this.hashTag
    let output = this.loginSerivce.returnLogin(data);
    if (output == true) {
      this.router.navigate(['/', this.hashTag])
    }

  }

}
