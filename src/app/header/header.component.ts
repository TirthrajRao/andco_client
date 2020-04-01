import { Component, OnInit, ChangeDetectorRef, Input, SimpleChanges, } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent, RoutesRecognized } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { filter, pairwise } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/pairwise';
declare var $;



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input("displayName") displayName
  userName = JSON.parse(sessionStorage.getItem('userName'));
  hashTag = JSON.parse(sessionStorage.getItem('guestHashTag'))
  totalEvent = JSON.parse(sessionStorage.getItem('eventList'))
  index = 0
  returnUrl: string;
  isDisplay = false
  currentUrl: String
  sub: any
  eventId: any
  imgUrl
  isDisplayMenu = true
  notMenu
  displayLogo = true
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public _change: ChangeDetectorRef,
    public _loginService: LoginService
  ) {
    this._loginService.getObservableResponse().subscribe(res => {
      // console.log("response in header again", res);
      this.currentUrl = res.id;

    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changes in header", changes)
    if (changes.displayName.currentValue == false) {
      // console.log("in if condition ")
      this.isDisplay = false
    } else {
      // console.log("in else condition ")
      this.isDisplay = true
    }
  }

  ngOnInit() {



    if (this.hashTag && this.totalEvent <= 1) {
      // console.log("when guest has less than one event total");
      // this.imgUrl = ''
      this.displayLogo = false
      $('#navigation-logo').addClass('.navigation-hide');
    }



    //tooltip js start
    $(".tooltip-class").hover(function () {
      $(this).attr("tooltip-data", $(this).attr("title"));
      $(this).removeAttr("title");
    }, function () {
      $(this).attr("title", $(this).attr("tooltip-data"));
      $(this).removeAttr("tooltip-data");
    });
    //tooltip js end

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log("event of url find", events)
        // console.log("index of page", this.index)
        this.currentUrl = events[1].urlAfterRedirects
        console.log('current url', this.currentUrl);
        // this.setLogo(this.currentUrl)
      });


    this.sub = this.route.params.subscribe(param => {
      console.log("param ma su ave", param);

      this.eventId = param.id
      // this.hashTag = param.hashTag
    })

    this.currentUrl = this.router.url
    console.log("login user name in heaedr", this.router.url, this.hashTag)
    this.currentUrl = this.router.url
    if (this.router.url == '/guest/' + this.hashTag || this.router.url == '/menu') {
      console.log("log this");
      this.isDisplayMenu = false

    }
    // console.log("whne page is load display route", this.currentUrl)
  }

  getHeader(event) {
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/menu']);
    }
  }

  getHeaderColor() {
    if (this.currentUrl.includes('createEvent')) {
      return '#D2A0A1'
    } else if (this.currentUrl.includes('eventActivity')) {
      return '#434040'
    } else if (this.currentUrl.includes('eventGroup')) {
      return '#434040'
    } else if (this.currentUrl.includes('myevent')) {
      return '#F8D0AD'
    } else if (this.currentUrl.includes('set-price')) {
      return '#434040'
    } else {
      return '#fff'
    }
  }
  setLogo() {
    // console.log("this function call is or not");




    if (this.currentUrl.includes('eventActivity')) {
      this.imgUrl = '/assets/images/firework-green.png'
    } else if (this.currentUrl.includes('eventGroup')) {
      this.imgUrl = '/assets/images/firework-green.png'
    } else if (this.currentUrl.includes('created-event-message')) {
      this.imgUrl = '/assets/images/firework-pink.png'
    } else if (this.currentUrl.includes('set-price')) {
      this.imgUrl = '/assets/images/firework-green.png'
    }
    else {
      this.imgUrl = '/assets/images/firework-white.png'
    }
  }


}
