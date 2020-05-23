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
  isMobile = sessionStorage.getItem('isMobile')
  themeList = ['assets/images/guest.png',
    'assets/images/floral.png',
    'assets/images/wood.png',
    'assets/images/marble.png',
    'assets/images/origami.png',
    'assets/images/classic.png',
    'assets/images/lines.png',
    'assets/images/luxury.png',
    'assets/images/instrument.png']
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
    console.log("width of device", this.isMobile);

    // console.log("plat form of guest", this.platForm);

  }


  getEventDetails(hashTag) {
    this.eventService.getGuestEventDetails(hashTag).subscribe((response: any) => {
      this.eventDetails = response.data
      console.log("details of event with link", this.eventTheme)
      if (this.isMobile == 'true') {
        console.log("this is perfect for mobile", this.eventDetails.eventTheme);

        let newBackGround = this.eventDetails.eventTheme.split('/')
        let test1 = newBackGround[2].split('.')
        console.log("new background image set", test1)
        let finalBackGround = newBackGround[0] + '/' + newBackGround[1] + '/' + test1[0] + '-small.png'
        console.log("this is the final background to save", finalBackGround)
        this.eventTheme = finalBackGround
        switch (this.eventTheme) {
          case 'assets/images/floral-small.png':
            this.themeService.toggleFloral()
            break;
          case 'assets/images/wood-small.png':
            this.themeService.toggleWood()
            break;
          case 'assets/images/marble-small.png':
            this.themeService.toggleMarble()
            break;
          case 'assets/images/origami-small.png':
            this.themeService.toggleOrigami()
            break;
          case 'assets/images/classic-small.png':
            this.themeService.toggleClassic()
            break;
          case 'assets/images/lines-small.png':
            this.themeService.toggleLines()
            break;
          case 'assets/images/luxury-small.png':
            this.themeService.toggleLuxury()
            break;
          case 'assets/images/instrument-small.png':
            this.themeService.toggleInstruments()
            break;
          default:
            this.themeService.toggleDefault()
            break;
        }
      } else {
        this.eventTheme = this.eventDetails.eventTheme
        switch (this.eventTheme) {
          case 'assets/images/floral.png':
            this.themeService.toggleFloral()
            break;
          case 'assets/images/wood.png':
            this.themeService.toggleWood()
            break;
          case 'assets/images/marble.png':
            this.themeService.toggleMarble()
            break;
          case 'assets/images/origami.png':
            this.themeService.toggleOrigami()
            break;
          case 'assets/images/classic.png':
            this.themeService.toggleClassic()
            break;
          case 'assets/images/lines.png':
            this.themeService.toggleLines()
            break;
          case 'assets/images/luxury.png':
            this.themeService.toggleLuxury()
            break;
          case 'assets/images/instrument.png':
            this.themeService.toggleInstruments()
            break;
          default:
            this.themeService.toggleDefault()
            break;
        }
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
