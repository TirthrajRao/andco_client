import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-event-activity',
  templateUrl: './my-event-activity.component.html',
  styleUrls: ['./my-event-activity.component.css']
})
export class MyEventActivityComponent implements OnInit {
  @Input('activityList') activityList;
  groupOfActivity
  constructor() { }

  ngOnInit() {
    // console.log("list of activity in activity", this.activityList);

  }

  ngOnChanges() {

    // console.log("changes of event", this.activityList);
  }

  getActivityGroup(event) {
    // console.log("total group of single activity", event);
    this.groupOfActivity = event
  }
}
