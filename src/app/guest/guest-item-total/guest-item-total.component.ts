import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-guest-item-total',
  templateUrl: './guest-item-total.component.html',
  styleUrls: ['./guest-item-total.component.css']
})
export class GuestItemTotalComponent implements OnInit {
  @Input('totalItemList') displayTotalItem
  totlaItem = []
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("display item in its page", changes.displayTotalItem.currentValue);
    this.totlaItem = _.filter(changes.displayTotalItem.currentValue, function (x) {
      console.log("single item ", x)
      return x.activityName = x.activityName
    })
    console.log("final items list after filter", this.totlaItem);

  }

}
