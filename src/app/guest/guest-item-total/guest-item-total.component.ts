import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-guest-item-total',
  templateUrl: './guest-item-total.component.html',
  styleUrls: ['./guest-item-total.component.css']
})
export class GuestItemTotalComponent implements OnInit {
  @Input('totalItemList') displayTotalItem
  totlaItem: any
  totalActivity = []
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
    console.log("grouped", grouped);
  }

}
