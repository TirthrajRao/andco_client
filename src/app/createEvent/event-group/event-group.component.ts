import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
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
  @Output() maleNewObject: EventEmitter<any> = new EventEmitter<any>()
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
    itemPrice: Number,
    description: ''
  }
  femaleObject = {
    itemName: '',
    itemPrice: Number,
    description: ''
  }
  displayItems: any;
  activityDate
  finalArray: any = []
  isButton = false
  isModel = false
  eventHashTag
  types;
  updateGroup = false
  groupIndex
  activityIndex
  updateActivities
  discriptionName
  discriptionItem
  constructor(
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public alertervice: AlertService,
    public loginService: LoginService,
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
    console.log("he bhagvan ama avi jaje kaik", event.allActivities);
    event.allActivities.forEach((singleOne) => {
      console.log("single one", singleOne);
      singleOne.groups.forEach((oldGroup) => {
        if (oldGroup._id) {
          this.updateGroup = oldGroup._id
        }
      })
    })
    this.allActivities = event.allActivities
    this.selectedActivity = event.item
    this.selectedGroup = event.item.groups[0]
    this.groupIndex = 0
    this.activityIndex = event.index
    this.activityDate = event.item.activity.activityStartDate
    let female = []
    let male = []
    console.log("group name", this.selectedGroup)
    // this.updateGroup = this.selectedGroup._id
    if (this.selectedGroup.item) {
      this.isButton = true
      this.selectedGroup.item.forEach((singleItem) => {
        // console.log("this is for update group", this.updateGroup);
        if (singleItem.itemGender == 'male') {
          singleItem.itemId = singleItem._id
          male.push(singleItem)
        } else if (singleItem.itemGender == 'female') {
          singleItem.itemId = singleItem._id
          female.push(singleItem)
        }
      })
    }
    if (this.selectedGroup.male) {
      console.log("call or not");
      this.selectedGroup.male.forEach((maleOne) => {
        if (!maleOne.itemId) {
          male.push(maleOne)
        }
      })
      // this.selectedGroup['male'] = male
    }
    if (this.selectedGroup.female) {
      this.selectedGroup.female.forEach((femaleOne) => {
        if (!femaleOne.itemId) {
          female.push(femaleOne)
        }
      })
    }
    // console.log("date of selected", this.activityDate);

    this.selectedGroup['male'] = male
    this.selectedGroup['female'] = female
  }

  getGroup(event) {
    console.log("ama group details ave in main page", event);
    console.log("when group change ======", this.allActivities);

    this.groupIndex = event.groupIndex
    // console.log("which one is active", this.groupIndex);
    this.selectedGroup = event.item
    let male = []
    let female = []
    if (this.selectedGroup.item) {
      // console.log("call for already", this.selectedGroup);
      this.selectedGroup.item.forEach((singleItem) => {
        // console.log("single item of group", singleItem);
        if (singleItem.itemGender == 'male') {
          singleItem.itemId = singleItem._id
          male.push(singleItem)
        } else if (singleItem.itemGender == 'female') {
          singleItem.itemId = singleItem._id
          female.push(singleItem)
        }
      })
    }
    if (this.selectedGroup.male) {
      console.log("call or not");
      this.selectedGroup.male.forEach((maleOne) => {
        if (!maleOne.itemId) {
          male.push(maleOne)
        }
      })
      // this.selectedGroup['male'] = male
    }
    if (this.selectedGroup.female) {
      this.selectedGroup.female.forEach((femaleOne) => {
        if (!femaleOne.itemId) {
          female.push(femaleOne)
        }
      })
    }

    this.selectedGroup['male'] = male
    this.selectedGroup['female'] = female
    // console.log("right now activated activity", this.selectedGroup);
  }


  addGroup() {
    this.isDisable = true
    this.isLoad = true
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
      })
    });

    console.log("final array to send items of group to send ", this.finalArray);
    this.eventService.addGroup(this.finalArray, this.eventId)
      .subscribe((response: any) => {
        // console.log("Group added in new event", response)
        this.isLoad = false
        this.isDisable = false
        this.alertervice.getSuccess(response.message)

        let routerData = '/set-price/' + this.eventId
        let output = this.loginService.returnLogin(routerData);
        if (output == true) {
          // this.router.navigate(['/myevent']);
          this.router.navigate(['/set-price/' + this.eventId])
        }
        // this.router.navigate(['/set-price/' + this.eventId])
      }, error => {
        this.isDisable = false
        this.isLoad = false
        this.alertervice.getError(error.message)
        // console.log("error while add groups in event", error)
      })
  }
  updateGroups() {
    // console.log("for update group");
    this.isDisable = true
    this.isLoad = true
    this.isButton = false
    console.log(this.allActivities)
    this.allActivities.forEach(singleActivityDetails => {
      singleActivityDetails.groups.forEach((singleGroup) => {
        let activityId = singleActivityDetails.activity._id
        if (singleGroup._id) {
          // console.log("single group detilas", singleGroup);
          let finalData = this.editGroupDetails(activityId, singleGroup)
          // console.log("response of group ", finalData);
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
      this.isDisable = false
      this.isLoad = false
      this.isButton = true
      let routerData = '/set-price/' + this.eventId
      let output = this.loginService.returnLogin(routerData);
      if (output == true) {
        // this.router.navigate(['/myevent']);
        this.router.navigate(['/set-price/' + this.eventId])
      }
      // this.router.navigate(['/set-price/' + this.eventId])
    }, error => {
      this.isDisable = false
      this.isLoad = false
      console.log("error while update group", error);
    })
  }



  editGroupDetails(activityId, singleGroup) {
    // console.log("single group details", singleGroup);
    let finalObject = {},
      female = [],
      male = []
    if (singleGroup.male) {
      console.log("first one", singleGroup);
      singleGroup.item.forEach((femaleItem) => {
        // console.log("female items ", femaleItem);
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
        if (femaleItem.itemGender == 'male') {
          femaleItem['itemId'] = femaleItem._id
          male.push(femaleItem)
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
      singleGroup.male.forEach((newMale) => {
        if (!newMale.itemId) {
          // console.log("this is first time while update for male", newMale);
          male.push(newMale)
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
      // console.log("female array ", finalObject);
    } else if (singleGroup.female) {
      console.log("female items call this", singleGroup);
      singleGroup.item.forEach((maleItem) => {
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
        if (maleItem.itemGender == 'female') {
          maleItem['itemId'] = maleItem._id
          female.push(maleItem)
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
      singleGroup.female.forEach((newFemale) => {
        if (!newFemale.itemId) {
          // console.log("this is first time while update for male", newFemale);
          male.push(newFemale)
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

      console.log("third one", singleGroup);
      finalObject = {
        activityId: activityId,
        groupId: singleGroup._id,
        groupName: singleGroup.groupName,
        male: singleGroup.male,
        female: singleGroup.female,
        eventId: this.eventId
      }
      return finalObject
    } else if (singleGroup.item.length == 0) {

      console.log("fourth one", singleGroup);
      finalObject = {
        activityId: activityId,
        groupId: singleGroup._id,
        groupName: singleGroup.groupName,
        male: [],
        female: [],
        eventId: this.eventId
      }
      return finalObject
    }
    else {
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
        finalObject = {
          activityId: activityId,
          groupId: singleGroup._id,
          groupName: singleGroup.groupName,
          male: singleGroup.male,
          female: singleGroup.female,
          eventId: this.eventId
        }
        // console.log("array of male and female", finalObject);
      })
      return finalObject
    }
  }

  openDescription(itemData) {
    console.log("data of item list", itemData);
    this.discriptionName = itemData.description
    this.discriptionItem = itemData.itemName
    $('#descriptionModalMale').modal("show")
  }

  openFemaleDescription(item) {

    this.discriptionName = item.description
    this.discriptionItem = item.itemName
    $('#descriptionModalFemale').modal("show")
  }


  openMaleModel() {
    this.object = {
      itemName: '',
      itemPrice: Number,
      description: ''
    }
    $('#addMaleItemModal').modal("show")
    this.isModel = false
  }
  openFemaleModel() {
    this.femaleObject = {
      itemName: '',
      itemPrice: Number,
      description: ''
    }
    $('#addFemaleItemModal').modal("show")
    this.isModel = false
  }

  addMaleItmes(itemDetails) {
    let maleObject = {
      itemName: itemDetails.itemName,
      itemPrice: itemDetails.itemPrice,
      description: itemDetails.description
    }
    $('#addMaleItemModal').modal("hide")
    if (this.selectedGroup._id) {
      // this.selectedActivity.groups[this.groupIndex].male.push(maleObject)
      this.allActivities[this.activityIndex].activity.group[this.groupIndex].male.push(maleObject)
      // this.updateActivities = this.selectedActivity
      console.log("final array of page", this.selectedActivity);
      this.object = {
        itemName: '',
        itemPrice: Number,
        description: ''
      }
      this.isButton = true
      console.log("which data is display", this.selectedActivity);
    }
    else {
      // console.log("group name", this.selectedGroup);
      this.selectedGroup.male.push(maleObject)
      this.object = {
        itemName: '',
        itemPrice: Number,
        description: ''
      }
      this.isButton = true
    }


  }


  removeMaleItem(data, index, groupId) {
    console.log("data to be removed", data);
    console.log("index of removed", groupId);

    // if (data.itemId) {
    // }
    if (!data.itemId) {
      this.selectedGroup.male.splice(this.selectedGroup.male.indexOf(data), 1);
    }
    console.log("group when remove from male", this.selectedActivity);
    if (data.itemId) {
      this.allActivities[this.activityIndex].activity.group[this.groupIndex].item.splice(this.allActivities[this.activityIndex].activity.group[this.groupIndex].item.indexOf(data), 1)
      this.allActivities[this.activityIndex].activity.group[this.groupIndex].male.splice(this.allActivities[this.activityIndex].activity.group[this.groupIndex].male.indexOf(data), 1)
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
      itemPrice: data.itemPrice,
      description: data.description
    }
    $('#addFemaleItemModal').modal("hide")
    if (this.selectedGroup._id) {
      // this.selectedActivity.groups[this.groupIndex].male.push(maleObject)
      this.allActivities[this.activityIndex].activity.group[this.groupIndex].female.push(femaleObject)
      // this.updateActivities = this.selectedActivity
      console.log("final array of page", this.selectedActivity);
      this.femaleObject = {
        itemName: '',
        itemPrice: Number,
        description: ''
      }
      this.isButton = true
      console.log("which data is display", this.selectedActivity);
    }
    else {
      // console.log("group name", this.selectedGroup);
      this.selectedGroup.female.push(femaleObject)
      this.femaleObject = {
        itemName: '',
        itemPrice: Number,
        description: ''
      }
      this.isButton = true
    }





    // this.selectedGroup.female.push(femaleObject)
    // this.femaleObject = {
    //   itemName: '',
    //   itemPrice: Number
    // }
    // this.isButton = true
  }

  removeFemaleItem(data, index, groupId) {


    // this.selectedGroup.female.splice(this.selectedGroup.female.indexOf(data), 1);
    // console.log("rest of female items========", this.selectedGroup.female);



    if (!data.itemId) {
      this.selectedGroup.female.splice(this.selectedGroup.female.indexOf(data), 1);
    }
    console.log("group when remove from male", this.selectedActivity);
    if (data.itemId) {
      this.allActivities[this.activityIndex].activity.group[this.groupIndex].item.splice(this.allActivities[this.activityIndex].activity.group[this.groupIndex].item.indexOf(data), 1)
      this.allActivities[this.activityIndex].activity.group[this.groupIndex].female.splice(this.allActivities[this.activityIndex].activity.group[this.groupIndex].female.indexOf(data), 1)
      this.eventService.removeItem(data.itemId, groupId).subscribe((response) => {
        console.log("item remove from data base", response);
      }, error => {
        console.log("error while remove items", error);
      })
    }

  }

  addMaleItem(event) {
    // console.log("event=========", event.target.value.length);
    if (event.key === "Enter") {
      // console.log("call this")
      this.addMaleItmes(this.object)
      this.isModel = false
    }
  }
  maleItemAdd(event) {
    console.log("call this", event)
    if (event.key === "Enter") {
      this.addMaleItmes(this.object)
      this.isModel = false
    }
  }
  feMaleItemAdd(event) {
    if (event.key === "Enter") {
      // console.log("call this")
      this.addFemaleItmes(this.femaleObject)
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
