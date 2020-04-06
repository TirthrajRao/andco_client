import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { LoginService } from '../../services/login.service'
import { importExpr } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {

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
  constructor(
    private route: Router,
    public eventService: EventService,
    public loginSerivce: LoginService
  ) { }

  ngOnInit() {

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
        // this.eventLink = response.data.eventLink
        this.displayMenu = true
        this.changeMenuWithArraow(this.currenMenuIndex)
        if (this.currenMenuIndex == 0) {
          this.getActivity()
        }
      } else {

        let data = '/guest/' + this.eventHashTag
        let output = this.loginSerivce.returnLogin(data);
        if (output == true) {
          // this.router.navigate(['/myevent']);
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
  }

  getEventLink() {
    this.eventLink = ({ eventLink: this.eventDetails.eventLink, eventId: this.selectedEventId })
  }


  getGuestListOfEvent() {
    this.eventService.getGuestList(this.selectedEventId).subscribe((response: any) => {
      console.log("response of guest list", response);
      this.guestList = response.data[0]
    }, error => {
      console.log("error while guest list", error)
    })
  }

  getCollecctionOfEvent() {
    this.eventService.getEventCollection(this.selectedEventId).subscribe((response: any) => {
      console.log("response of collections", response);
      response.data['isClosed'] = this.eventDetails.isClosed
      this.totalCollections = response.data
      // this.isClosed = this.eventDetails.isClosed
    }, error => {
      console.log("erro while get collection", error);

    })
  }


  getItemsOfGuest(event) {
    this.guestWithItems = this.selectedEventId
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
      this.getActivity()
    }
    if (event == 1) {
      this.currenMenuIndex = event
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
      this.route.navigate(['edtiEvent/' + this.selectedEventId])
    }
    // }
  }


}
