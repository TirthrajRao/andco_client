import { Component, OnInit } from '@angular/core';
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
  returnUrl: string;
  isDisplay = false
  previousUrl: String
  constructor(
    private route: ActivatedRoute,
    public router: Router

  ) {
    // router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd)
    // ).subscribe(x => console.log("router name ============",x))

    // router.events.forEach((singleEvent) => {
    //   console.log("page name========", singleEvent)
    // })

    // this.router.events
    //   .filter(e => e instanceof RoutesRecognized)
    //   .pairwise()
    //   .subscribe((event: any[]) => {
    //     console.log("another page url name======", event[0].urlAfterRedirects)
    //   })




    // router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(e => {
    //     console.log("route name of another page", e)
    //   })
  }

  ngOnInit() {
    // console.log("login user name in heaedr", this.userName)
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log("url of previous page", this.returnUrl)

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log("event of url find", events)
        // this.previousUrl = events[0].urlAfterRedirects
        if (events[1].urlAfterRedirects == '/menu') {
          console.log("to ama ave")
          this.isDisplay = true
        } else {
          this.isDisplay = false
          console.log("ama ave baki")
        }
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });
  }

}
