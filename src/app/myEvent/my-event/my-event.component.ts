import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
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
  constructor(
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

  getEventLink(){
    this.eventLink = this.eventDetails.eventLink
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
    if(this.currenMenuIndex ==3){
      this.getEventLink()
    }
  }
  

}
