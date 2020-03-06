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
    // console.log("event id from another", event);
    this.eventService.getSingleEventDetails(event.eventId).subscribe((response: any) => {
      console.log("details of event with hastag", response);
      this.activityDisplay = true
      this.eventDetails = response.data
      this.eventHashTag = response.data.hashTag
      this.selectedEventId = response.data._id
      let singleEvent = response.data
      this.displayMenu = true
      let array = [
        {
          activity: singleEvent.activity,
          value: event.value
        }
      ]
      console.log("send data when click on event", array);

      this.totalActivity = array

      // console.log("response of single event details", this.totalActivity);
    }, error => {
      // console.log("error while get single event details", error);

    })
  }

  getProfileOfEvent(event) {
    console.log("when click on profile icon", event);
    this.displayProfile = true
    this.activityDisplay = false
    let profileArray =
    {
      profile: this.eventDetails.profilePhoto,
      eventId: this.selectedEventId
    }


    this.eventProfile = profileArray
  }

  getActivity(event) {
    this.displayProfile = false
    this.activityDisplay = true
  }

}
