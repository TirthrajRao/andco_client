import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
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
  constructor(
    private route: Router,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.getLoginUserEvent()
  }


  /**
   * Get event list of login user
   */
  getLoginUserEvent() {
    this.eventService.getLoginUserEvent().subscribe((res: any) => {
      this.listOfEvent = res.data
      // console.log("list of total event of login user", this.listOfEvent);
    }, error => {
      // console.log("error while get list of event", error);

    })
  }
  getSingleEvent(event) {
    this.eventService.getSingleEventDetails(event.eventId).subscribe((response: any) => {
      this.eventDetails = response.data
      this.eventHashTag = response.data.hashTag
      this.selectedEventId = response.data._id
      // this.eventLink = response.data.eventLink
      this.displayMenu = true
      this.getCurrentMenu(this.currenMenuIndex)
      if (this.currenMenuIndex == 0) {
        this.getActivity()
      }
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
      this.guestList = response.data[0].guestList
    }, error => {
      console.log("error while guest list", error)
    })
  }

  getCollecctionOfEvent() {
    this.eventService.getEventCollection(this.selectedEventId).subscribe((response: any) => {
      console.log("response of collections", response);
      this.totalCollections = response.data
    }, error => {
      console.log("erro while get collection", error);

    })
  }


  getItemsOfGuest(event) {
    console.log("event of guest for item", event);
    this.eventService.getItemsOfGuest(this.selectedEventId).subscribe((response: any) => {
      console.log("all list of guest with items", response);
      this.guestWithItems = response.data
    }, error => {
      console.log("error while get items list of guest", error);

    })

  }


  getCurrentMenu(event) {
    console.log("current menu index", event);
    this.currenMenuIndex = event
    if (this.currenMenuIndex == 1) {
      this.getProfileOfEvent()
    }
    if (this.currenMenuIndex == 0) {
      console.log("log this ");
      this.getActivity()
    }
    if (this.currenMenuIndex == 3) {
      this.getEventLink()
    }
    if (this.currenMenuIndex == 4) {
      this.getGuestListOfEvent()
    }
    if (this.currenMenuIndex == 2) {
      this.getCollecctionOfEvent()
    }
    if (this.currenMenuIndex == 5) {
      this.route.navigate(['edtiEvent/' + this.selectedEventId])
    }
  }


}
