import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
declare var $: any


@Component({
  selector: 'app-my-event-activity',
  templateUrl: './my-event-activity.component.html',
  styleUrls: ['./my-event-activity.component.css']
})
export class MyEventActivityComponent implements OnInit {
  @Input('activityList') activityList;
  @Input('displayItem') displayItem;
  @Input('selectedActivityIndex') selectedActivityIndex;
  @Input('selectedGroupIndex') selectedGroupIndex;
  @Output() selectedActivity: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedGroup: EventEmitter<any> = new EventEmitter<any>();
  groupOfActivity
  listOfActivity = []
  totalItem = []
  selectedGender
  selectedActivityId
  itemNamePrint: any = [];
  groupIndex
  discriptionName
  discriptionItem

  constructor() { }

  ngOnInit() {
    // console.log("list of activity in activity", this.activityList);


    $('input:radio[name="radio-group1"]').on('change', (e) => {
      console.log("value of radio button", e);

      this.selectedGender = e.target.value;
      console.log(this.selectedGender);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.selectedActivityIndex = -1
    // this.selectedGroupIndex = -1
    console.log("changes of event", changes.activityList);
    if (changes.activityList && changes.activityList.currentValue) {
      this.listOfActivity = changes.activityList.currentValue
      this.displayItem = this.activityList.value
    }
    if (changes.selectedActivityIndex && changes.selectedActivityIndex.currentValue){
      this.selectedActivityIndex = changes.selectedActivityIndex.currentValue
      this.groupOfActivity = this.listOfActivity[this.selectedActivityIndex]
      console.log("this.selectedActivityIndex", this.selectedActivityIndex)
      console.log("this.groupOfActivity", this.groupOfActivity)
    }
    if (changes.selectedGroupIndex && changes.selectedGroupIndex.currentValue){
      this.selectedGroupIndex = changes.selectedGroupIndex.currentValue
      console.log("changes.selectedGroupIndex ====>>>>", changes.selectedGroupIndex.currentValue)
      let temp = this.groupOfActivity.group[this.selectedGroupIndex].item
      console.log("temp!!!!!", temp)
      this.selectedGender = 'male'
      this.displayItem = 'true'
      this.itemNamePrint = _.filter(temp, { 'itemGender': this.selectedGender });
      console.log("this.itemNamePrint!!!!!!!!!!", this.itemNamePrint)
      
      console.log("this.groupOfActivity", this.groupOfActivity)
    }
    console.log("data changes of page", this.listOfActivity);

  }

  getActivityGroup(event) {
    console.log("total group of single activity with index", event);
    // console.log("group index if selected", this.groupIndex);
    this.selectedGroupIndex = -1
    this.selectedActivityIndex = event.index 
    this.selectedActivityId = event.activityId
    this.groupIndex = null
    let data = []
    data['group'] = event.group
    data['selectedActivity'] = event.index
    this.groupOfActivity = data
    this.displayItem = event.value
    this.selectedActivity.emit({ activityId: event.activityId, index: event.index})
  }

  getSingleGroupItem(event) {
    console.log("group item details in main page", event);
    console.log("atyare index su che group ni", this.groupIndex);
    let data = []
    data['groupIndex'] = event.index
    data['activity'] = this.selectedActivityId
    this.groupIndex = data
    this.displayItem = event.value
    this.selectedGender = 'male';
    $('input:radio[id="test"]').prop('checked', true);
    this.itemNamePrint = _.filter(event.item, { 'itemGender': this.selectedGender });
    console.log("name of item", this.itemNamePrint);
    this.totalItem = event.item
    this.selectedGroup.emit({ activityId: event.activityId, index: event.index })
  }


  handleChange(event) {
    console.log("when click on radio button", event.target.value);
    this.selectedGender = event.target.value
    this.itemNamePrint = _.filter(this.totalItem, { 'itemGender': this.selectedGender });
    console.log("when click on female", this.itemNamePrint);
  }



  openModel(item) {
    console.log("what is in item", item);
    this.discriptionItem = item.itemName
    this.discriptionName = item.description
    $('#infoItemModal').modal("show")

  }



}
