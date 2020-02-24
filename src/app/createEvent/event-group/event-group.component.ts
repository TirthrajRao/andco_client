import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { map, every } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
declare var $;
import * as _ from 'lodash';


@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {


  @Output() singleActivity: EventEmitter<any> = new EventEmitter<any>()
    ;  // groupForm: FormGroup;
  isDisable = false
  // userName = JSON.parse(sessionStorage.getItem('userName'));
  // state$: Observable<object>;
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





  constructor(
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    private fb: FormBuilder
  ) {
    this.sub = this.activatedRoute.params.subscribe(param => {
      this.eventId = param.id;
      this.activities = this.eventId
    })
  }
  Data;

  ngOnInit() {

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
  }


  addMaleItmes(itemDetails) {

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

  }

  removeFemaleItem(data, index) {
    this.selectedGroup.female.splice(this.selectedGroup.female.indexOf(data), 1);
    console.log("rest of female items========", this.selectedGroup.female);

  }














  // get groupFormData() { return <FormArray>this.groupForm.get('group'); }


  // /**
  //   * @param {String} activity
  //   * To create new group in event or to edit created group of event 
  //   */
  // // initGroupForm(activity?) {
  // //   this.groupForm = new FormGroup({
  // //     eventId: new FormControl(this.eventId),
  // //     group: this.fb.array(this.groupArray(activity, null))
  // //   })
  // // }


  // /**
  // * @param {String} activity
  // * To create new group in event or to edit created group of event 
  // */
  // initGroupForm(activity?) {
  //   this.groupForm = new FormGroup({
  //     eventId: new FormControl(activity ? activity[0].eventId : ""),
  //     group: this.fb.array(this.groupArray(activity, null))
  //   })
  // }


  // groupArray(activities?, acitvityId?) {
  //   if (acitvityId) {
  //     console.log("ama ave che ke nai");
  //     return [this.fb.group({
  //       activityId: new FormControl(acitvityId),
  //       groupName: new FormControl(''),
  //       male: this.fb.array([this.maleItemArray()]),
  //       female: this.fb.array([this.femaleItemArray()])
  //     })];
  //   } else {
  //     return [this.fb.group({
  //       activityId: new FormControl(''),
  //       groupName: new FormControl(''),
  //       male: this.fb.array([this.maleItemArray()]),
  //       female: this.fb.array([this.femaleItemArray()])
  //     })];
  //   }
  // }

  // /**
  //  * @param {String} activities `
  //  * @param {String} activityId
  //  *  To create new group in event or to edit created group of event 
  //  */
  // // groupArray(activities?, acitvityId?) {
  // //   console.log("new create group =======", activities);
  // //   if (!activities.activitySelected) {
  // //     return [this.fb.group({
  // //       activityId: new FormControl(activities.activityId),
  // //       groupName: new FormControl(activities.groupName),
  // //       male: this.fb.array([this.maleItemArray()]),
  // //       female: this.fb.array([this.femaleItemArray()])
  // //     })]
  // //   } else if (activities.activitySelected) {

  // //     console.log("ama next group bnse", this.groupForm.value);
  // //     return [this.fb.group({
  // //       acitvityId: new FormControl(activities.activitySelected),
  // //       groupName: new FormControl(activities.groupName),
  // //       male: this.fb.array([this.maleItemArray()]),
  // //       female: this.fb.array([this.femaleItemArray()])
  // //     })]
  // //   }
  // //   console.log("item of new group", this.gArray)
  // //   // return this.gArray
  // // }



  // /**
  //  * @param {JSON} details
  //  * Create items of male in new event 
  //  */
  // maleItemArray(details?): any {
  //   if (details) {
  //     let maleArray = [];
  //     for (let i = 0; i < details.length; i++) {
  //       if (details[i].itemGender === 'male') {
  //         maleArray.push(this.fb.group({
  //           itemId: new FormControl(details[i]._id),
  //           itemName: new FormControl(details[i].itemName),
  //           // itemType: new FormControlmaleItems(details[i].itemType),
  //           itemPrice: new FormControl(details[i].itemPrice)
  //         }))
  //       }
  //     }
  //     return maleArray;
  //   } else {
  //     return this.fb.group({
  //       itemName: new FormControl(''),
  //       // itemType: new FormControl(''),
  //       itemPrice: new FormControl('')
  //     })
  //   }
  // }


  // /**
  //    * @param {JSON} details
  //    * Create items of female in new event 
  //    */
  // femaleItemArray(details?): any {
  //   if (details) {
  //     let femaleArray = [];
  //     for (let i = 0; i < details.length; i++) {
  //       if (details[i].itemGender === 'female') {
  //         femaleArray.push(this.fb.group({
  //           itemId: new FormControl(details[i]._id),
  //           itemName: new FormControl(details[i].itemName),
  //           // itemType: new FormControl(details[i].itemType),
  //           itemPrice: new FormControl(details[i].itemPrice)
  //         }))
  //       }
  //     }
  //     return femaleArray;
  //   } else {
  //     return this.fb.group({
  //       itemName: new FormControl(''),
  //       itemPrice: new FormControl('')
  //     })
  //   }
  // }




  // /**
  //  * @param {String} activityId 
  //  * @param {String} i
  //  *  Add new group field with activity 
  //  */
  // async AddGroupField(activityId) {
  //   this.isDisable = true
  //   console.log("list of fomr=======", this.groupForm.controls)
  //   console.log(this.groupForm.controls)
  //   const control = <FormArray>this.groupForm.controls.group;
  //   console.log("a selected control", control.controls)
  //   await control.controls.push(this.groupArray[(null, activityId)]);
  //   console.log("after click value of form", this.groupForm.value)
  //   this.selectedActivity = activityId
  // }


  // addGroupWithActivity(activityId) {
  //   console.log("activity id", activityId);
  // }



  // getFamily(event) {
  //   console.log("first group to fill value", event);
  //   let data = event
  //   this.selectedGroup = event.groupName
  //   console.log("group value when display default group", this.groupForm);
  //   this.AddGroupField(event.activityId)
  //   // this.isDisable = true
  //   // this.initGroupForm(data)

  // }


  // maleItemAddInForm(data) {
  //   const control = <FormArray>data.controls.male
  //   console.log("selected control details", control);
  //   // if (!control.value.length)
  //   if (this.isFirst) {
  //     control.push(this.fb.group({
  //       itemName: new FormControl(''),
  //       itemPrice: new FormControl('')
  //     }))
  //   }
  //   $('#addMaleItemModal').show('modal')
  //   this.isFirst = true;
  // }








}
