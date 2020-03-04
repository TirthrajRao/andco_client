import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
declare var $: any

@Component({
  selector: 'app-my-event-activity',
  templateUrl: './my-event-activity.component.html',
  styleUrls: ['./my-event-activity.component.css']
})
export class MyEventActivityComponent implements OnInit {
  @Input('activityList') activityList;
  groupOfActivity
  totalItem = []
  displayItem = false
  selectedGender
  itemNamePrint: any = [];
  constructor() { }

  ngOnInit() {
    // console.log("list of activity in activity", this.activityList);


    $('input:radio[name="radio-group1"]').on('change', (e) => {
      console.log("value of radio button", e);

      this.selectedGender = e.target.value;
      console.log(this.selectedGender);
      // // console.log(this.selectedActivityGroup)
      // let item = _.filter(this.selectedActivityGroup, { groupName: this.selectedGroup });
      // console.log(item);
      // this.itemNamePrint = _.filter(item[0].item, { 'itemGender': this.selectedGender });
      // console.log(this.itemNamePrint)
    })
  }

  ngOnChanges() {

    // console.log("changes of event", this.activityList);
  }

  getActivityGroup(event) {
    console.log("total group of single activity with index", event);
    this.groupOfActivity = event.group
    this.displayItem = false
  }

  getSingleGroupItem(event) {
    console.log("group item details in main page", event);
    this.displayItem = true
    this.selectedGender = 'male';
    $('input:radio[id="test"]').prop('checked', true);
    this.itemNamePrint = _.filter(event, { 'itemGender': this.selectedGender });
    console.log("name of item", this.itemNamePrint);

    this.totalItem = event
  }


  handleChange(event) {
    console.log("when click on radio button", event.target.value);
    this.selectedGender = event.target.value
    this.itemNamePrint = _.filter(this.totalItem, { 'itemGender': this.selectedGender });
    console.log("when click on female", this.itemNamePrint);
  }
}
