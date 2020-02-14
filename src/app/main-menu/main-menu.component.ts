import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import { LoginService } from '../services/login.service'
import { AlertService } from '../services/alert.service';
import { pairwise } from 'rxjs/internal/operators/pairwise';
import { filter } from 'rxjs/operators';
// import 'rxjs/add/operator/filter';
import { pipe } from 'rxjs';
declare var $;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  index = 0
  userName = JSON.parse(sessionStorage.getItem('userName'));
  userEvent = sessionStorage.getItem('userEvent');
  previousUrl;
  isVisible: Boolean = false;
  isNotVisible: Boolean = false
  private history = [];



  constructor(
    public _loginService: LoginService,
    public router: Router,
    public alertService: AlertService
  ) {
    // router.events
    //   .pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     pairwise()
    //   )
    //   .subscribe(e => {
    //     console.log('prev:', e);
    //     // this.previousUrl = e.url;
    //   });
  }

  // public loadRouting(): void {
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
  //       this.history = [...this.history, urlAfterRedirects];
  //     });
  // }
  // public getHistory(): string[] {
  //   return this.history;
  // }

  ngOnInit() {
    console.log("username", this.userEvent)
    //tooltip js start
    $(".tooltip-class").hover(function () {
      $(this).attr("tooltip-data", $(this).attr("title"));
      $(this).removeAttr("title");
    }, function () {
      $(this).attr("title", $(this).attr("tooltip-data"));
      $(this).removeAttr("tooltip-data");
    });
    //tooltip js end
    // if (this.userEvent == undefined) {
    //   console.log("ama ave che ke nai")
    //   this.index = 0
    // } else if (this.userEvent != undefined) {
    //   console.log("else part ma jay che")
    //   this.index = Number(this.index) + +1
    // }
  }
  /**
   * Logout from application and clear storage
   */
  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
}
