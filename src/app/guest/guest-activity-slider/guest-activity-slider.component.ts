import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() totalItemList: EventEmitter<any> = new EventEmitter<any>()
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
  constructor() { }

  ngOnInit() {
    this.initActivitySlider()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes.listOfActivity);
    if (changes.listOfActivity && changes.listOfActivity.currentValue) {
      this.displayActivity = changes.listOfActivity.currentValue
      // let single = _.filter(this.displayActivity, function (x) {
      //   this.allCartList['activityName'] = x.activityName
      // })
      // console.log("all cart item", this.allCartList);

      this.initActivitySlider()
      this.displayAllData()
    }
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

    setTimeout(() => {
      $('input:radio[id="0"]').attr('checked', true);
    }, 20)
  }

  nextSlide(slider) {
    console.log("==========", slider);
    this.activityIndex = slider
    this.displayAllData()
  }


  changeTab(item) {
    console.log("change tab item", item);
    this.selectedwallet = 1
    this.selectedGender = item
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
  }

  changeGroup(event) {
    console.log("index of group", event.target.value);
    this.groupIndex = event.target.value
    this.selectedGender = 'male'
    this.selectedwallet = 0
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
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
    this.totalItemList.emit({ allItems: this.allCartList, activities: this.displayActivity })
  }
}
