import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  private sub: any
  private eventHashTag: any
  totlaItem: any
  totalActivity = []
  displayFinalItem = []
  keys: any;
  values: any;
  maleValues = []
  maleArray: any = [];
  femaleArray: any = [];
  removeArray: any = []
  current = 0
  constructor(
    public eventService: EventService,
    private route: Router,
    private activated: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activated.params.subscribe(param => {
      // console.log("hashtag ", param);
      this.eventHashTag = param.hashTag
    })
    this.getCartItems()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.sub = this.activated.params.subscribe(param => {
      // console.log("hashtag ", param);
      this.eventHashTag = param.hashTag
    })
    // console.log("******changes", changes);
    console.log("display item in its page", changes.displayTotalItem.currentValue);
    this.totalActivity = changes.displayTotalItem.currentValue.activities
    this.totlaItem = changes.displayTotalItem.currentValue.allItems
    this.displayList()
    this.getCartItems()
  }

  getCartItems() {
    this.eventService.getCartItems(this.eventHashTag).subscribe((response: any) => {
      // console.log("response of cart list", response);
      this.totlaItem = response.data.cartList
      this.displayList()
    }, error => {
      console.log("error while get cart details", error)
    })
  }



  displayList() {
    // this.current = 0
    let newArray = []
    var grouped = _.mapValues(_.groupBy(this.totlaItem, 'activityName'),
      clist => clist.map(car => _.omit(car, 'activityName')));
    // this.displayFinalItem.push(grouped)
    this.displayFinalItem = grouped
    this.keys = Object.keys(this.displayFinalItem);
    this.values = Object.values(this.displayFinalItem)
    // console.log("keys ==>", this.keys, " values ==>", this.values);
    console.log("grouped", this.keys);
    // this.current = this.keys[0]
    // this
    this.values.forEach((value) => {
      let maleArrOfValue = [];
      let femaleArrOfValue = [];
      value.forEach((valueOfSingle) => {
        if (valueOfSingle.itemGender == 'male') {
          maleArrOfValue.push(valueOfSingle);
        }
        else if (valueOfSingle.itemGender == 'female') {
          femaleArrOfValue.push(valueOfSingle);
        }
      });
      this.maleArray.push(maleArrOfValue)
      this.femaleArray.push(femaleArrOfValue);
    });
    console.log("male array ============>", this.maleArray);
    console.log("female array ============>", this.femaleArray);
  }

  // removeMaleItem(i, k, itemId) {
  //   console.log("index", k, itemId);
  //   this.maleArray[i].splice(k, 1);
  //   this.removeArray.push(itemId)
  //   console.log("male array", this.removeArray, "final array", this.maleArray, "sav final", this.values);
  // }

  addMoreItems() {
    console.log("remove item array", this.removeArray)
    this.removeItem.emit({ index: 0, removeItem: 'removeItem' })
  }

  addDonationOfEvent() {
    this.addDonation.emit(2)
  }

  displayItemList() {
    this.addDonation.emit(0)
  }


  /**
   * @param {String} id item._id pass
   * remove any add to cart item on my cart 
   */
  removeMaleItems(id, i, k) {
    console.log("id of remove item ", id);
    this.eventService.removeCartItem(id)
      .subscribe(data => {
        console.log("remove item data", data);
        // this.myCartDetails(this.eventId);
        this.maleArray[i].splice(k, 1);
      }, (err: any) => {
        console.log(err);
        // this.alertService.getError(err.message);
      })
  }

  removeFemaleItems(id, i, j) {
    this.eventService.removeCartItem(id)
      .subscribe(data => {
        console.log("remove item data", data);
        // this.myCartDetails(this.eventId);
        this.femaleArray[i].splice(j, 1);
      }, (err: any) => {
        console.log(err);
        // this.alertService.getError(err.message);
      })
  }

  display(i) {
    this.current = i
  }

}
