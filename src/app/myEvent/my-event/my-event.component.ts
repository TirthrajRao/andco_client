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
      let singleEvent = response.data
      let array = [
        {
          activity: singleEvent.activity,
          value: event.value
        }
      ]
      console.log("send data when click on event", array);

      this.totalActivity = array
      this.activityDisplay = true
      // console.log("response of single event details", this.totalActivity);
    }, error => {
      // console.log("error while get single event details", error);

    })
  }

}
