import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-guest-item-total',
  templateUrl: './guest-item-total.component.html',
  styleUrls: ['./guest-item-total.component.css']
})
export class GuestItemTotalComponent implements OnInit {
  @Input('totalItemList') displayTotalItem;
  @Output() removeItem: EventEmitter<any> = new EventEmitter<any>()
  @Output() addDonation: EventEmitter<any> = new EventEmitter<any>()
  totlaItem: any
  totalActivity = []
  displayFinalItem = []
  keys: any;
  values: any;
  maleValues = []
  maleArray: any = [];
  femaleArray: any = [];
  removeArray: any = []
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("******changes", changes);
    console.log("display item in its page", changes.displayTotalItem.currentValue);
    this.totalActivity = changes.displayTotalItem.currentValue.activities
    this.totlaItem = changes.displayTotalItem.currentValue.allItems
    this.displayList()

  }

  displayList() {
    let newArray = []
    var grouped = _.mapValues(_.groupBy(this.totlaItem, 'activityName'),
      clist => clist.map(car => _.omit(car, 'activityName')));
    // this.displayFinalItem.push(grouped)
    this.displayFinalItem = grouped
    console.log("grouped", this.displayFinalItem);
    this.keys = Object.keys(this.displayFinalItem);
    this.values = Object.values(this.displayFinalItem)
    console.log("keys ==>", this.keys, " values ==>", this.values);
    this.values.forEach((value) => {
      let maleArrOfValue = [];
      let femaleArrOfValue = [];
      value.forEach((valueOfSingle) => {
        if (valueOfSingle.itemGender == 'male') {
          maleArrOfValue.push(valueOfSingle);
        }
        else {
          femaleArrOfValue.push(valueOfSingle);
        }
      });
      this.maleArray.push(maleArrOfValue)
      this.femaleArray.push(femaleArrOfValue);
    });
    console.log("male array ============>", this.maleArray);
    console.log("female array ============>", this.femaleArray);
  }

  removeMaleItem(i, k, itemId) {
    console.log("index", k, itemId);
    this.maleArray[i].splice(k, 1);
    this.removeArray.push(itemId)
    console.log("male array", this.removeArray, "final array", this.maleArray, "sav final", this.values);
  }

  addMoreItems() {
    console.log("remove item array", this.removeArray)
    this.removeItem.emit({ removeItems: this.removeArray, index: 0 })
  }

  addDonationOfEvent() {
    this.addDonation.emit(2)
  }
}
