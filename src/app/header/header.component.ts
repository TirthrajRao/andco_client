import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent, RoutesRecognized } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { filter, pairwise } from 'rxjs/operators';

// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/pairwise';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('userName'));
  index = 0
  returnUrl: string;
  isDisplay = false
  currentUrl: String
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public _change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // console.log("login user name in heaedr", this.userName)
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log("url of previous page", this.returnUrl)
    if (this.router.url.includes('/#/menu')) {
      this.isDisplay = false
      console.log("check which route is display============")
    } else {
      console.log("else part")
      this.isDisplay = true
    }
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log("event of url find", events)
        // console.log("index of page", this.index)
        this.currentUrl = events[1].urlAfterRedirects
        console.log('current url', events[1].urlAfterRedirects);
      });
    this.currentUrl = this.router.url
    console.log("whne page is load display route", this.currentUrl)
  }

  // displayData() {
  //   console.log("function ma ave che ke nai")
  //   this.isDisplay == true
  // }

}
