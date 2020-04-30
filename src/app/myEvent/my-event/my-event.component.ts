import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { LoginService } from '../../services/login.service'
import { config } from '../../config'

import { importExpr } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  @Output() headerEvent: EventEmitter<any> = new EventEmitter<any>();

  listOfEvent;
  activityDisplay = false
  totalActivity = []
  displayMenu = false
  eventHashTag
  selectedEventId
  displayProfile = false
  eventDetails
  eventProfile
  currenMenuIndex = 0;
  eventLink
  guestList = []
  totalCollections
  guestWithItems = []
  isCelebrant
  isClosed: any;
  isflow = false
  isLoad = false
  isPrint: boolean;
  collectionWithGuest = []
  printPhoto
  printTitle
  printHashTag
  path = config.baseMediaUrl;
  data
  constructor(
    private route: Router,
    public eventService: EventService,
    public loginSerivce: LoginService,
    // public activated: ActivatedRoute
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint(event) {
    this.isPrint = true;
    console.log("log print in my event page");
  }
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event) {
    this.isPrint = false
    console.log("log print when closed page");
  }





  ngOnInit() {

    // this.data = this.activated.params.subscribe(param => {
    //   console.log("value of activated routes", param);

    //   // this.hashTag = param.hashTag
    // })

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    this.getLoginUserEvent()
  }


  /**
   * Get event list of login user
   */
  getLoginUserEvent() {
    this.isLoad = true
    this.eventService.getLoginUserEvent().subscribe((res: any) => {
      this.listOfEvent = res.data
      this.isLoad = false
      console.log("list of total event of login user", this.listOfEvent);
    }, error => {
      this.isLoad = false
      // console.log("error while get list of event", error);

    })
  }
  getSingleEvent(event) {
    this.isLoad = true
    console.log("right now current index is what", this.currenMenuIndex);
    this.eventService.getSingleEventDetails(event.eventId).subscribe((response: any) => {
      this.isLoad = false
      this.isCelebrant = response.data.isCelebrant
      this.eventHashTag = response.data.hashTag
      this.selectedEventId = response.data._id
      if (this.isCelebrant == true) {
        this.eventDetails = response.data
        console.log("event details", this.eventDetails);
        this.printHashTag = this.eventDetails.hashTag
        this.printTitle = this.eventDetails.eventTitle
        this.printPhoto = this.eventDetails.profilePhoto
        // this.eventLink = response.data.eventLink
        this.displayMenu = true
        this.changeMenuWithArraow(this.currenMenuIndex)
        if (this.currenMenuIndex == 0) {
          this.getActivity()
          // this.route.navigate(['/myevent'], { queryParams: { activity: this.eventDetails.eventTitle } });
        }
      } else {
        let data = '/guest/' + this.eventHashTag
        let output = this.loginSerivce.returnLogin(data);
        if (output == true) {
          this.route.navigate(['/guest/', this.eventHashTag])
        }
      }
      // if (this.currenMenuIndex == 2) {
      //   this.getCollecctionOfEvent()
      // }
      console.log("details of event with hastag", this.eventDetails);
    }, error => {
      console.log("error while get single event details", error);

    })
  }

  getProfileOfEvent() {
    let profileArray =
    {
      profile: this.eventDetails.profilePhoto,
      eventId: this.selectedEventId
    }
    this.eventProfile = profileArray
  }

  getActivity() {
    this.totalActivity = this.eventDetails.activity
    console.log("call thay che ke nai ", this.totalActivity);
    // this.route.navigate(['/myevent'], { queryParams: { activity: this.eventDetails.eventTitle } });
  }

  getEventLink() {
    this.eventLink = ({ eventLink: this.eventDetails.eventLink, eventId: this.selectedEventId })
  }


  getGuestListOfEvent() {
    this.isLoad = true
    this.eventService.getGuestList(this.selectedEventId).subscribe((response: any) => {
      console.log("response of guest list", response);
      this.guestList = response.data[0]
      setTimeout(() => {
        this.isLoad = false
      })
    }, error => {
      console.log("error while guest list", error)
      this.isLoad = false
    })
  }

  // getTotalListOfGuestWithCollection() {
  //   this.eventService.getItemsOfGuest(this.selectedEventId).subscribe((response: any) => {
  //     this.collectionWithGuest = response.data
  //     console.log("list of total collection with guests", this.collectionWithGuest);
  //   }, error => {
  //     console.log("error while get collections", error);

  //   })

  // }


  getCollecctionOfEvent() {
    this.isLoad = true
    this.eventService.getEventCollection(this.selectedEventId).subscribe((response: any) => {
      console.log("response of collections", response);
      response.data['isClosed'] = this.eventDetails.isClosed

      this.totalCollections = response.data
      // this.isClosed = this.eventDetails.isClosed
      this.isLoad = false
    }, error => {
      console.log("erro while get collection", error);

    })
  }
  collectionLoader(event) {
    console.log("when data is reachedd to collection", event);
    if (event == false)
      this.isLoad = false
  }

  getItemsOfGuest(event) {
    this.guestWithItems = this.selectedEventId
    // this.getTotalListOfGuestWithCollection()
  }

  finalCollectionPrint(event) {
    console.log("ready for print in main page", event);
    this.collectionWithGuest = event
  }

  clickOnPrint(event) {
    console.log("event of click", event)
    // this.headerEvent.emit(event)
    this.loginSerivce.updateMenu()
    if (event)
      this.isPrint = true
    setTimeout(() => {
      window.print()
    }, 10)
  }


  // getCurrentMenu(event) {
  //   console.log("current menu index", event);
  //   this.currenMenuIndex = event
  //   if (this.currenMenuIndex == 1) {
  //     this.getProfileOfEvent()
  //   }
  //   if (this.currenMenuIndex == 0) {
  //     console.log("log this ");
  //     this.getActivity()
  //   }
  //   if (this.currenMenuIndex == 3) {
  //     this.getEventLink()
  //   }
  //   if (this.currenMenuIndex == 4) {
  //     this.getGuestListOfEvent()
  //   }
  //   if (this.currenMenuIndex == 2) {
  //     console.log("what in this");
  //     this.getCollecctionOfEvent()
  //   }
  //   if (this.currenMenuIndex == 5) {
  //     this.route.navigate(['edtiEvent/' + this.selectedEventId])
  //   }
  // }

  changeMenuWithArraow(event) {
    console.log("event when click on array of slider", event);
    // this.getCurrentMenu(event)
    // if (event.point == 'click') {
    console.log("call menu");

    // this.currenMenuIndex = null
    if (event == 0) {
      this.currenMenuIndex = event
      // this.route.navigate(['/myevent'], { queryParams: { activity: this.eventDetails.eventTitle } });
      this.getActivity()
    }
    if (event == 1) {
      this.currenMenuIndex = event
      // this.route.navigate(['/myevent'], { queryParams: { profile: this.eventDetails.eventTitle } });
      this.getProfileOfEvent()
    }
    if (event == 2) {
      this.currenMenuIndex = event
      this.getCollecctionOfEvent()
    }
    if (event == 3) {
      this.currenMenuIndex = event
      this.getEventLink()
    }
    if (event == 4) {
      this.currenMenuIndex = event
      this.getGuestListOfEvent()
    }
    if (event == 5) {
      this.currenMenuIndex = event

      let data = '/editEvent/' + this.selectedEventId
      let output = this.loginSerivce.returnLogin(data);
      if (output == true) {
        // this.router.navigate(['/myevent']);
        this.route.navigate(['/editEvent/', this.selectedEventId])
      }


      // this.route.navigate(['edtiEvent/' + this.selectedEventId])
    }
    // }
  }


}
