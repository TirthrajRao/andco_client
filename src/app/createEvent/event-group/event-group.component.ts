import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { Observable } from 'rxjs';
import { map, every } from 'rxjs/operators';
declare var $;
import * as _ from 'lodash';


@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {


  @Output() singleActivity: EventEmitter<any> = new EventEmitter<any>()
  isDisable = false
  activities;
  allActivities: any
  sub: any;
  eventId
  selectedActivity: any;
  selectedGroup: any
  object = {
    itemName: '',
    itemPrice: Number
  }
  femaleObject = {
    itemName: '',
    itemPrice: Number
  }
  displayItems: any;
  activityDate
  finalArray: any = []
  isButton = false
  isModel = false
  eventHashTag

  constructor(
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public alertervice: AlertService,
    public router: Router
  ) {
    this.sub = this.activatedRoute.params.subscribe(param => {
      this.eventId = param.id;
      this.activities = this.eventId
    })
  }
  Data;

  ngOnInit() {
    // this.isButton = false
  }

  button() {
    console.log("=============");

  }

  // New Functionality

  getActivity(event) {
    this.isDisable = true
    console.log("he bhagvan ama avi jaje kaik", event);
    console.log(" Allevent Data ", event.allActivities)
    this.allActivities = event.allActivities
    this.selectedActivity = event.item
    this.selectedGroup = event.item.groups[0]
    console.log("selected activity list", this.selectedActivity)
    this.activityDate = event.item.activity.activityStartDate
    console.log("date of selected", this.activityDate);

  }

  getGroup(event) {
    console.log("ama group details ave", event);
    this.selectedGroup = event
    console.log("right now activated activity", this.selectedGroup);
  }


  addGroup() {
    console.log("value of group form");
    console.log(this.allActivities)
    // this.allActivities['eventId'] = this.eventId
    console.log("finale details", this.allActivities);
    this.allActivities.forEach(singleActivityDetails => {
      console.log("single activity with details", singleActivityDetails);
      singleActivityDetails.groups.forEach((singleGroup) => {
        let finalObject = {
          activityId: singleActivityDetails.activity._id,
          groupName: singleGroup.groupName,
          male: singleGroup.male,
          female: singleGroup.female
        }
        this.finalArray.push(finalObject)

        console.log("is final object is ready or not=====", this.finalArray)
      })
    });
    this.eventService.addGroup(this.finalArray, this.eventId).subscribe((response: any) => {
      console.log("Group added in new event", response)
      this.alertervice.getSuccess(response.message)
      this.router.navigate(['/set-price/' + this.eventId])
    }, error => {
      this.alertervice.getError(error.message)
      console.log("error while add groups in event", error)
    })
  }

  openMaleModel() {
    $('#addMaleItemModal').modal("show")
  }
  openFemaleModel() {
    $('#addFemaleItemModal').modal("show")
  }


  addMaleItmes(itemDetails) {
    $('#addMaleItemModal').modal("hide")
    console.log("itemDetails", itemDetails)
    let maleObject = {
      itemName: itemDetails.itemName,
      itemPrice: itemDetails.itemPrice
    }

    this.selectedGroup.male.push(maleObject)
    this.object = {
      itemName: '',
      itemPrice: Number
    }
    this.isButton = true
    console.log("male details", this.selectedGroup.male);

  }


  removeMaleItem(data, index) {
    console.log("data to be removed", data);
    console.log("index of removed", index);
    this.selectedGroup.male.splice(this.selectedGroup.male.indexOf(data), 1);
    console.log("baki ni male items", this.selectedGroup.male);
  }

  addFemaleItmes(data) {
    console.log("list of female items", data);
    let femaleObject = {
      itemName: data.itemName,
      itemPrice: data.itemPrice
    }
    this.selectedGroup.female.push(femaleObject)
    this.femaleObject = {
      itemName: '',
      itemPrice: Number
    }
    $('#addFemaleItemModal').modal("hide")
  }

  removeFemaleItem(data, index) {
    this.selectedGroup.female.splice(this.selectedGroup.female.indexOf(data), 1);
    console.log("rest of female items========", this.selectedGroup.female);

  }

  addMaleItems(event) {
    console.log("event=========", event);
    this.isModel = true
    if (event.key === "Enter") {
      console.log("call this")
      this.addMaleItmes(this.object)
    }
  }

  addFemaleItems(event) {
    this.isModel = true
    if (event.key === "Enter") {
      console.log("call this")
      this.addFemaleItmes(this.femaleObject)
    }
  }

  getHashTag(event) {
    console.log("event hash tage", event);
    this.eventHashTag = event
  }
}
