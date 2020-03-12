import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { single } from 'rxjs/operators';
declare var $;

@Component({
  selector: 'app-guest-activity-slider',
  templateUrl: './guest-activity-slider.component.html',
  styleUrls: ['./guest-activity-slider.component.css']
})
export class GuestActivitySliderComponent implements OnInit {
  @Input('totalActivityList') listOfActivity
  @Input('removeItemOf') removeItem
  @Output() totalItemList: EventEmitter<any> = new EventEmitter<any>()
  private sub: any
  private eventHashtag: any
  displayActivity = []
  displayGroup = []
  itemList = []
  selectedGender
  $slider
  $sliderContainer
  gender = ["male", "female"]
  selectedwallet
  groupIndex = 0
  activityIndex = 0
  itemQuenty = 0
  displayTotal
  allCartList = [
  ]
  cartTotalItems: any = [];
  constructor(
    public eventService: EventService,
    public router: Router,
    public activated: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activated.params.subscribe(params => {
      this.eventHashtag = params.hashTag
      console.log("hashtag is important", this.eventHashtag);
    })
    this.initActivitySlider()
    // this.getSelectedItems()
    // this.displayAllData()
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.getSelectedItems()
    console.log("changes", this.removeItem);
    if (changes.listOfActivity && changes.listOfActivity.currentValue) {
      this.sub = this.activated.params.subscribe(params => {
        this.eventHashtag = params.hashTag
      })
      this.displayActivity = changes.listOfActivity.currentValue
      this.initActivitySlider()
      this.getSelectedItems()
      // this.displayAllData()
    }
    if (changes.removeItem && changes.removeItem.currentValue) {
      this.sub = this.activated.params.subscribe(params => {
        this.eventHashtag = params.hashTag
        console.log("hashtag is important", this.eventHashtag);
      })
      this.displayAllData()
    }
  }

  getSelectedItems() {
    this.eventService.getCartItems(this.eventHashtag).subscribe((response: any) => {
      this.cartTotalItems = response.data.cartList
      this.allCartList = response.data.cartList
      this.displayAllData()
      console.log("response of cart items", this.cartTotalItems)
    }, error => {
      console.log("error while get cart details", error)
    })
  }

  removeItems() {
    console.log("ama su ave che", this.allCartList);
    var array3 = this.allCartList.filter(function (obj) { return this.removeItem.indexOf(obj) == -1; });
    console.log("item id of daata", array3);

  }


  initActivitySlider() {
    setTimeout(() => {
      this.$sliderContainer = $('.guest-activity-slider')
      this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        prevArrow: '<button type="button" class="prevarrow"><div class="arrow-left"></div></button>',
        nextArrow: '<button type="button" class="nextarrow"><div class="arrow-right"></div></button>'
      })
      this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        console.log("event on before", currentSlide, nextSlide);
        this.nextSlide(nextSlide)
      })
    }, 50)
  }



  displayAllData() {
    this.displayGroup = this.displayActivity[this.activityIndex].group
    console.log("when dispplay group", this.displayGroup);
    this.selectedwallet = 0
    this.selectedGender = 'male'
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
    console.log("quntity with rank", this.itemList);
    this.itemList.forEach((singleItem) => {
      console.log("male single items array", singleItem);
      this.cartTotalItems.forEach((singleCartItem) => {
        console.log("cart items", singleCartItem);
        if (singleItem._id == singleCartItem.itemId) {
          console.log("call this or not");
          singleItem['quantity'] = singleCartItem.quantity
        }
      })
    })
    console.log("final male items", this.itemList);

    setTimeout(() => {
      $('input:radio[id="0"]').attr('checked', true);
    }, 20)
  }

  nextSlide(slider) {
    console.log("==========", this.groupIndex);
    this.groupIndex = 0
    this.activityIndex = slider
    this.displayAllData()
  }


  changeTab(item) {
    console.log("change tab item", item);
    this.selectedwallet = 1
    this.selectedGender = item
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
    this.itemList.forEach((singleItem) => {
      console.log("male single items array", singleItem);
      this.cartTotalItems.forEach((singleCartItem) => {
        console.log("cart items", singleCartItem);
        if (singleItem._id == singleCartItem.itemId) {
          console.log("call this or not");
          singleItem['quantity'] = singleCartItem.quantity
        }
      })
    })
  }

  changeGroup(event) {
    console.log("index of group", event.target.value);
    this.groupIndex = event.target.value
    this.selectedGender = 'male'
    this.selectedwallet = 0
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
    this.itemList.forEach((singleItem) => {
      console.log("male single items array", singleItem);
      this.cartTotalItems.forEach((singleCartItem) => {
        console.log("cart items", singleCartItem);
        if (singleItem._id == singleCartItem.itemId) {
          console.log("call this or not");
          singleItem['quantity'] = singleCartItem.quantity
        }
      })
    })
  }

  maleTotal(event, item, index) {
    console.log("kaik thay che ama bs", item);
    this.itemList[index]['quantity'] = event.target.value
    // this.displayActivity[this.activityIndex].activityName = []

    let obj = {
      activityName: this.displayActivity[this.activityIndex].activityName,
      itemGender: item.itemGender,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      quantity: item.quantity,
      itemId: item._id
    }
    var tempIndex = _.findIndex(this.allCartList, function (o) { return o.itemId == item._id })
    if (tempIndex > -1) {
      this.allCartList[tempIndex].quantity = event.target.value
    }
    else {
      this.allCartList.push(obj)
    }

    console.log("object of acitivity name", this.allCartList);
  }


  femaleTotal(event, item, index) {

    console.log("kaik thay che ama bs", event.target.value, item);
    this.itemList[index]['quantity'] = event.target.value
    let obj = {
      activityName: this.displayActivity[this.activityIndex].activityName,
      itemGender: item.itemGender,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      quantity: item.quantity,
      itemId: item._id
    }
    var tempIndex = _.findIndex(this.allCartList, function (o) { return o.itemId == item._id })
    if (tempIndex > -1) {
      this.allCartList[tempIndex].quantity = event.target.value
    }
    else {
      this.allCartList.push(obj)
    }

    console.log("object of acitivity name", this.allCartList);
  }

  addTocart() {
    console.log("list of all item ", this.allCartList)
    let body = {
      eventHashtag: this.eventHashtag
    }
    // this.allCartList[0].push(body)
    // if (this.eventHashtag) {
    this.allCartList[0]['eventHashtag'] = this.eventHashtag
    // }
    this.eventService.addToCart(this.allCartList).subscribe((response: any) => {
      console.log("resonse of cart details", response)
      this.allCartList = response.data.data.cartList
      this.totalItemList.emit({ allItems: response.data.data.cartList, index: 1 })
    }, error => {
      console.log("error while add cart items", error);
    })
  }

  
}
