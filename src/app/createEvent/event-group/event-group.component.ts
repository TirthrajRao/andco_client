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
  sub: any;
  eventId
  selectedActivity: any;
  // single
  // selectedActivity
  // gArray: any[];
  // selectedActivityToAddGroup
  // maleItems: any = []
  // femaleItems: any = []
  // displayMailObject = {}
  // displayObject = {}
  // selectedGroup;
  // isFirst;
  object = {
    itemName: '',
    itemPrice: Number
  }
  displayItems: any;






  constructor(
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    private fb: FormBuilder
  ) {
    this.sub = this.activatedRoute.params.subscribe(param => {
      this.eventId = param.id;
      // this.getEventDetails(this.eventId)
      this.activities = this.eventId
      // this.initGroupForm()
      // this.eventService.getEventDetails(this.eventId).subscribe((res: any) => {
      //   this.activities = res.data.activity
      //   console.log("avi jaje laik", this.activities);

      // })
    })
  }
  Data;

  ngOnInit() {
    // this.initGroupForm()
    // this.isFirst = false;
    // console.log("value of group", this.groupForm.value);

  }

  button(){
    console.log("=============");
    
  }

  // New Functionality

  getActivity(event) {

    this.isDisable = true
    console.log("he bhagvan ama avi jaje kaik", event);
    // let activity
    this.selectedActivity = event
    this.singleActivity.emit(event)
    console.log(" singleActivity", this.singleActivity)

    // this.selectedActivityToAddGroup = event._id
    // this.initGroupForm()
    // const control = <FormArray>this.groupForm.controls.group;
    // console.log("item of first activity", control.controls, _.findIndex(control.controls, { value: { activityId: this.selectedActivityToAddGroup } }));
    // if (_.findIndex(control.controls, { value: { activityId: this.selectedActivityToAddGroup } }) === -1)
    //   this.AddGroupField(this.selectedActivityToAddGroup);
  }

  getGroup(event) {
    console.log("ama group details ave", event.groups);
    console.log("right now activated activity", this.selectedActivity);
    // this.displayItems = event.groups[0]
    // event.groups[0].forEach(singleGroup => {
    //   console.log("log of single group", singleGroup)
    // })
    // this.selectedGroup = event.groupName;
    // let obj = {
    //   activitySelected: this.selectedActivity,
    //   groupName: event.groupName
    // }
    // console.log("this.selectedGroup", this.selectedGroup);
    // this.maleItems = []
    // this.femaleItems = []
    // this.initGroupForm(obj)
  }



  addMaleItmes(itemDetails) {

    console.log("itemDetails", itemDetails)
    // this.selectedActivity.groups.male.push(itemDetails)
    // console.log("value of form when mail item is added", this.groupForm.value)
    // console.log("list of mail", itemDetails);
    // console.log("this.displayMailObject", this.displayMailObject);
    // const control = <FormArray>itemDetails
    // control.push(this.fb.group({
    //   itemName: new FormControl(''),
    //   itemPrice: new FormControl('')
    // }))
    // let data = itemDetails.value
    // let maleItems = [];
    // if (this.displayMailObject[this.selectedGroup] && this.displayMailObject[this.selectedGroup]['maleItems']) {
    //   maleItems = this.displayMailObject[this.selectedGroup]['maleItems'];
    // } else {
    //   console.log("this.selectedGroup", this.selectedGroup);
    //   this.displayMailObject[this.selectedGroup] = {};
    //   this.displayMailObject[this.selectedGroup]['maleItems'] = []
    // }
    // maleItems = data;
    // console.log("this.displayMailObject", this.displayMailObject);

    // this.displayMailObject[this.selectedGroup]['maleItems'] = maleItems
    // console.log("value of group form", this.groupForm.value);
    // $('#addMaleItemModal').hide('modal')
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




  // addFemaleItmes(data) {
  //   console.log("list of female items", data);
  //   let femaleItems = [];
  //   if (this.displayObject[this.selectedGroup] && this.displayObject[this.selectedGroup]['femaleItems']) {
  //     femaleItems = this.displayObject[this.selectedGroup]['femaleItems'];
  //   } else {
  //     console.log("this.selectedGroup", this.selectedGroup);
  //     this.displayObject[this.selectedGroup] = {};
  //     this.displayObject[this.selectedGroup]['femaleItems'] = []
  //   }
  //   femaleItems.push(data[0])
  //   console.log("this.displayObject", this.displayObject);

  //   this.displayObject[this.selectedGroup]['femaleItems'] = femaleItems
  // }


  // addGroup() {
  //   console.log("value of group form", this.groupForm.value);

  // }


}
