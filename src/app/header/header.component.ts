import { Component, OnInit, ChangeDetectorRef, Input, SimpleChanges, HostListener, } from '@angular/core';
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
  @Input('headerEvent') clickOnPrint
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
  isPrint: boolean = false;


  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed', event.target.location.hash);
    let newRoute = event.target.location.hash.split("#")
    console.log("what is in new route", newRoute)
    this.currentUrl = newRoute[1]
    console.log("current url", this.router.url);

  }

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint(event) {
    this.isPrint = true;
    console.log("log before pppprint");
  }
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event) {
    this.isPrint = false
    console.log("log after pppprint");
  }

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public _change: ChangeDetectorRef,
    public _loginService: LoginService
  ) {
    this._loginService.getObservableResponse().subscribe(res => {
      console.log("response in header again", res);
      console.log("what is hashtag", this.hashTag);
      let newHashTag = res.id.split("/")
      console.log("what is in new", newHashTag);
      if (this.hashTag == null) {
        this.hashTag = newHashTag[2]
      }

      this.currentUrl = res.id;
      if (this.currentUrl == '/menu' || this.currentUrl == '/guest/' + this.hashTag) {
        this.isDisplayMenu = false
      } else {
        this.isDisplayMenu = true
      }
    })
    this._loginService.printData.subscribe(res => {
      console.log("what is in main header", res);
      if (res) {
        this.isPrint = true
      }

    })
    // this._loginService

    this.sub = this.route.params.subscribe(param => {
      console.log("param ma su ave", param);

      this.eventId = param.id
      // this.hashTag = param.hashTag
    })
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes in header", changes)
  }

  ngOnInit() {
    console.log("hashtag and total event", this.hashTag, this.totalEvent);
    if (this.hashTag && this.totalEvent <= 1) {
      console.log("this is call in header");
      setTimeout(() => {
        $('#navigation-logo').addClass('navigation-hide');
      }, 100)
      this.displayLogo = false
    }

    // this.router.events
    //   .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    //   .subscribe((events: RoutesRecognized[]) => {
    //     console.log("event of url find", events)
    //     this.currentUrl = events[1].urlAfterRedirects
    //     console.log('current url', this.currentUrl);
    //     if (this.currentUrl == '/menu') {
    //       this.isDisplayMenu = false
    //     } else {
    //       this.isDisplayMenu = true
    //     }
    //   });
    console.log("login user name in heaedr", this.router.url)
    if (this.router.url) {
      this.currentUrl = this.router.url
      if (this.router.url == '/guest/' + this.hashTag || this.router.url == '/menu') {
        console.log("log this");
        this.isDisplayMenu = false
      } else {
        this.isDisplayMenu = true
      }
    }
    // console.log("whne page is load display route", this.currentUrl)
  }

  getHeader(event) {
    let output = this._loginService.returnLogin(event);
    console.log("out put", output);
    if (output == true) {
      this.router.navigate(['/menu']);
      let displaySecondMenu = this._loginService.returnMenu(1)
    }

  }
  // 434040
  getHeaderColor() {
    if (this.currentUrl.includes('createEvent')) {
      return '#ed8d8f'
    } else if (this.currentUrl.includes('eventActivity')) {
      return '#434040'
    } else if (this.currentUrl.includes('eventGroup')) {
      return '#434040'
    } else if (this.currentUrl.includes('myevent')) {
      return '#F8D0AD'
    } else if (this.currentUrl.includes('set-price')) {
      return '#434040'
    } else if (this.currentUrl.includes('add-bank-account')) {
      return '#434040'
    } else if (this.currentUrl.includes('editEvent')) {
      return '#ed8d8f'
    }
    else {
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
      this.imgUrl = '/assets/images/firework-green.png'
    } else if (this.currentUrl.includes('set-price')) {
      this.imgUrl = '/assets/images/firework-green.png'
    } else if (this.currentUrl.includes('add-bank-account')) {
      this.imgUrl = '/assets/images/firework-green.png'
    } else if (this.currentUrl.includes('set-message')) {
      this.imgUrl = '/assets/images/firework-green.png'
    }
    else {
      this.imgUrl = '/assets/images/firework-white.png'
    }
  }


}
