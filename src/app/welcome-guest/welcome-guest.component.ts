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
  isLoad = false
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public eventService: EventService
  ) {


    let vive = this.activatedRoute.snapshot.queryParamMap.get('event')
    if (vive) {
      console.log("vivek", vive);
      let newHashTag = vive.split("/")
      console.log("what is in new hastag", newHashTag.length);
      if (newHashTag && newHashTag.length == 2) {
        sessionStorage.setItem('guestHashTag', JSON.stringify(vive))
        sessionStorage.setItem('platForm', JSON.stringify(newHashTag[1]))
        this.route.navigate(['/guest/', newHashTag[0]])
      } else {
        sessionStorage.setItem('guestHashTag', JSON.stringify(vive))
        sessionStorage.setItem('platForm', JSON.stringify('GN'))
        this.route.navigate(['/guest/', vive])
      }
    } else {
      this.route.navigate(['/display-page'])
    }
  }

  ngOnInit() {

  }


  guestEventWithOutLogin(eventhashTag) {
    this.isLoad = true
    this.route.navigate(['/guest', eventhashTag])
    // console.log("what is in", eventhashTag);

    // this.eventService.getGuestEventDetails(eventhashTag).subscribe((response: any) => {
    //   console.log("details of event with link", response)
    // }, error => {
    //   this.isLoad = false
    //   console.log("error while get link details", error)
    // })
  }

}
