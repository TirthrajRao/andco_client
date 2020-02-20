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
  index = 0
  returnUrl: string;
  isDisplay = false
  currentUrl: String
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public _change: ChangeDetectorRef,
    public _loginService: LoginService
  ) {
    this._loginService.getObservableResponse().subscribe(res => {
      console.log("response in header again", res);
      this.currentUrl = res.id;

    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes in header", changes)
    if (changes.displayName.currentValue == false) {
      console.log("in if condition ")
      this.isDisplay = false
    } else {
      console.log("in else condition ")
      this.isDisplay = true
    }
  }




  ngOnInit() {
    //tooltip js start
    $(".tooltip-class").hover(function () {
      $(this).attr("tooltip-data", $(this).attr("title"));
      $(this).removeAttr("title");
    }, function () {
      $(this).attr("title", $(this).attr("tooltip-data"));
      $(this).removeAttr("tooltip-data");
    });
    //tooltip js end


    this.currentUrl = this.router.url
    console.log("login user name in heaedr", this.router.url)
    // this.router.events
    //   .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    //   .subscribe((events: RoutesRecognized[]) => {
    //     console.log("event of url find", events)
    //     // console.log("index of page", this.index)
    //     this.currentUrl = events[1].urlAfterRedirects
    //     console.log('current url', this.currentUrl);

    //   });
    // this.currentUrl = this.router.url
    console.log("whne page is load display route", this.currentUrl)
  }

  getHeader(event) {
    let output = this._loginService.returnLogin(event);
    if (output == true) {
      this.router.navigate(['/menu']);
    }
  }

}
