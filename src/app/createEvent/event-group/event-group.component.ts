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
  isLoad = false
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
  types;
  updateGroup
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

  ngOnInit() {

    // this.isButton = false
  }

  button() {
    // console.log("=============");

  }

  // New Functionality

  getActivity(event) {
    this.isDisable = true
    console.log("he bhagvan ama avi jaje kaik", event);
    // console.log(" Allevent Data ", event.allActivities)
    this.allActivities = event.allActivities
    this.selectedActivity = event.item
    this.selectedGroup = event.item.groups[0]
    // console.log("selected activity list", this.selectedActivity)
    // console.log("selected group==========", this.selectedGroup);
    this.activityDate = event.item.activity.activityStartDate
    if (this.selectedGroup.item) {
      this.isButton = true
      let male = []
      let female = []
      console.log("call for already", this.selectedGroup);
      this.selectedGroup.item.forEach((singleItem) => {
        console.log("single item of group", singleItem);
        this.updateGroup = singleItem._id
        if (singleItem.itemGender == 'male') {
          singleItem.itemId = singleItem._id
          male.push(singleItem)
        } else if (singleItem.itemGender == 'female') {
          singleItem.itemId = singleItem._id
          female.push(singleItem)
        }
      })
      this.selectedGroup['male'] = male
      this.selectedGroup['female'] = female
    } else {
      console.log("call for not done", this.selectedGroup);
    }
    // console.log("date of selected", this.activityDate);

  }

  getGroup(event) {
    console.log("ama group details ave in main page", event);
    this.selectedGroup = event
    if (this.selectedGroup.item) {
      let male = []
      let female = []
      console.log("call for already", this.selectedGroup);
      this.selectedGroup.item.forEach((singleItem) => {
        console.log("single item of group", singleItem);
        if (singleItem.itemGender == 'male') {
          singleItem.itemId = singleItem._id
          male.push(singleItem)
        } else if (singleItem.itemGender == 'female') {
          singleItem.itemId = singleItem._id
          female.push(singleItem)
        }
      })
      this.selectedGroup['male'] = male
      this.selectedGroup['female'] = female
    }
    // console.log("right now activated activity", this.selectedGroup);
  }


  addGroup() {
    this.isLoad = true
    // console.log("value of group form");
    // console.log(this.allActivities)
    // this.allActivities['eventId'] = this.eventId
    // console.log("finale details", this.allActivities);
    this.allActivities.forEach(singleActivityDetails => {
      // console.log("single activity with details", singleActivityDetails);
      singleActivityDetails.groups.forEach((singleGroup) => {
        let finalObject = {
          activityId: singleActivityDetails.activity._id,
          groupName: singleGroup.groupName,
          male: singleGroup.male,
          female: singleGroup.female
        }
        this.finalArray.push(finalObject)

        // console.log("is final object is ready or not=====", this.finalArray)
      })
    });
    this.eventService.addGroup(this.finalArray, this.eventId).subscribe((response: any) => {
      // console.log("Group added in new event", response)
      this.isLoad = false
      this.alertervice.getSuccess(response.message)
      this.router.navigate(['/set-price/' + this.eventId])
    }, error => {
      this.alertervice.getError(error.message)
      // console.log("error while add groups in event", error)
    })
  }
  updateGroups() {
    console.log("for update group");
    console.log(this.allActivities)
    this.allActivities.forEach(singleActivityDetails => {
      singleActivityDetails.groups.forEach((singleGroup) => {
        let activityId = singleActivityDetails.activity._id
        if (singleGroup._id) {
          // console.log("single group detilas", singleGroup);
          let finalData = this.editGroupDetails(activityId, singleGroup)
          console.log("response of group ", finalData);
          this.finalArray.push(finalData)
        } else {
          let finalObject = {
            activityId: singleActivityDetails.activity._id,
            groupName: singleGroup.groupName,
            male: singleGroup.male,
            female: singleGroup.female
          }
          this.finalArray.push(finalObject)
        }
        // console.log("is final object is ready or not=====", this.finalArray)
      })
    });
    console.log("final array to push ", this.finalArray);
    this.eventService.updateGroup(this.finalArray).subscribe((response: any) => {
      console.log("group update completed", response);
      this.alertervice.getSuccess(response.message)
      this.router.navigate(['/set-price/' + this.eventId])
    }, error => {
      console.log("error while update group", error);
    })
  }



  editGroupDetails(activityId, singleGroup) {
    // console.log("single group details", singleGroup);
    let finalObject = {},
      female = [],
      male = []
    if (singleGroup.male) {
      // console.log("call this or not");
      singleGroup.item.forEach((femaleItem) => {
        console.log("female items ", femaleItem);
        if (femaleItem.itemGender == 'female') {
          femaleItem['itemId'] = femaleItem._id
          female.push(femaleItem)
          finalObject = {
            activityId: activityId,
            groupId: singleGroup._id,
            groupName: singleGroup.groupName,
            male: singleGroup.male,
            female: singleGroup.female,
            eventId: this.eventId
          }
        }
      })
      // console.log("female array ", finalObject);
      return finalObject
    } else if (singleGroup.female) {
      singleGroup.item.forEach((maleItem) => {
        // console.log("female items ", maleItem);
        if (maleItem.itemGender == 'male') {
          maleItem['itemId'] = maleItem._id
          male.push(maleItem)
          finalObject = {
            activityId: activityId,
            groupId: singleGroup._id,
            groupName: singleGroup.groupName,
            male: singleGroup.male,
            female: singleGroup.female,
            eventId: this.eventId
          }
        }
      })
      return finalObject
    } else if (singleGroup.male && singleGroup.female) {
      finalObject = {
        activityId: activityId,
        groupId: singleGroup._id,
        groupName: singleGroup.groupName,
        male: singleGroup.male,
        female: singleGroup.female,
        eventId: this.eventId
      }
      return finalObject
    } else {
      console.log("last final group which is not change", singleGroup);
      singleGroup.item.forEach((finalItem) => {
        if (finalItem.itemGender == 'male') {
          finalItem['itemId'] = finalItem._id
          male.push(finalItem)
          singleGroup['male'] = male
        } else if (finalItem.itemGender == 'female') {
          finalItem['itemId'] = finalItem._id
          female.push(finalItem)
          singleGroup['female'] = female
        }
        console.log("array of male and female");
        finalObject = {
          activityId: activityId,
          groupId: singleGroup._id,
          groupName: singleGroup.groupName,
          male: singleGroup.male,
          female: singleGroup.female,
          eventId: this.eventId
        }
      })
      return finalObject
    }
  }



  openMaleModel() {
    this.object = {
      itemName: '',
      itemPrice: Number
    }
    $('#addMaleItemModal').modal("show")
    this.isModel = false
  }
  openFemaleModel() {
    this.femaleObject = {
      itemName: '',
      itemPrice: Number
    }
    $('#addFemaleItemModal').modal("show")
    this.isModel = false
  }

  addMaleItmes(itemDetails) {
    $('#addMaleItemModal').modal("hide")
    // console.log("itemDetails", itemDetails)
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
    // console.log("male details", this.selectedGroup.male);

  }


  removeMaleItem(data, index, groupId) {
    console.log("data to be removed", data);
    console.log("index of removed", groupId);
    this.selectedGroup.male.splice(this.selectedGroup.male.indexOf(data), 1);
    if (data.itemId) {
      this.eventService.removeItem(data.itemId, groupId).subscribe((response) => {
        console.log("item remove from data base", response);
      }, error => {
        console.log("error while remove items", error);

      })
    }
    // console.log("baki ni male items", this.selectedGroup.male);
  }

  addFemaleItmes(data) {
    // console.log("list of female items", data);
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
    this.isButton = true
  }

  removeFemaleItem(data, index) {
    this.selectedGroup.female.splice(this.selectedGroup.female.indexOf(data), 1);
    // console.log("rest of female items========", this.selectedGroup.female);

  }

  addMaleItem(event) {
    // console.log("event=========", event.target.value.length);
    if (event.key === "Enter") {
      // console.log("call this")
      this.addMaleItmes(this.object)
      this.isModel = false
    }
  }

  numberValidationForMale(event) {

    // console.log("event of enter number", this.object.itemName);
    this.types = typeof this.object.itemPrice
    // this.types = typeof this.femaleObject.itemPrice
    if (this.types == 'number' && this.object.itemName.length > 0) {
      // console.log("in this");
      this.isModel = true
    } else {
      this.isModel = false
    }
  }


  numberValidationForFemale(event) {
    this.types = typeof this.femaleObject.itemPrice
    // this.types = typeof this.femaleObject.itemPrice
    if (this.types == 'number') {
      // console.log("in this");
      this.isModel = true
    } else {
      this.isModel = false
    }
  }

  addFemaleItem(event) {
    // this.isModel = true
    if (event.key === "Enter") {
      // console.log("call this")
      this.addFemaleItmes(this.femaleObject)
      this.isModel = false
    }
  }

  getHashTag(event) {
    // console.log("event hash tage", event);
    this.eventHashTag = event
  }


  backToActivity() {
    this.router.navigate(['/eventActivity/' + this.eventId]);
  }
}
