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

    // console.log("this.route.url", this.route.url)
    let url = this.route.url
    console.log("url", url)
    if(url == '/'){
      this.route.navigate(['/display-page'])
    }
    else{
      let hashTag = url.split('/')[1].split('#')[1]
      let platform = url.split('/')[2]
      console.log("hashTag", hashTag)
      console.log("platform", platform)
      
      sessionStorage.setItem('guestHashTag', hashTag)

      if (platform){
        sessionStorage.setItem('platForm', JSON.stringify(platform))
      }
      else{
        sessionStorage.setItem('platForm', JSON.stringify('GN'))
      }

      this.route.navigate(['/guest-join/', hashTag])
      
      // this.route.navigate(['/', hashTag])
    }
    // let vive = this.activatedRoute.snapshot.queryParamMap.get('event')
    // console.log("vivek", vive);
    // if (vive) {
    //   console.log("vivek", vive);
    //   let newHashTag = vive.split("/")
    //   console.log("what is in new hastag", newHashTag.length);
      // if (newHashTag && newHashTag.length == 2) {
      //   sessionStorage.setItem('guestHashTag', JSON.stringify(vive))
      //   sessionStorage.setItem('platForm', JSON.stringify(newHashTag[1]))
      //   this.route.navigate(['/guest/', newHashTag[0]])
      // } else {
      //   sessionStorage.setItem('guestHashTag', JSON.stringify(vive))
      //   sessionStorage.setItem('platForm', JSON.stringify('GN'))
      //   this.route.navigate(['/guest/', vive])
      // }
    // } else {
    //   // this.route.navigate(['/display-page'])
    // }
  }

  ngOnInit() {

  }



}
