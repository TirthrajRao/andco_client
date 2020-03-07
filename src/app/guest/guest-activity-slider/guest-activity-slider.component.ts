import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
declare var $;

@Component({
  selector: 'app-guest-activity-slider',
  templateUrl: './guest-activity-slider.component.html',
  styleUrls: ['./guest-activity-slider.component.css']
})
export class GuestActivitySliderComponent implements OnInit {
  @Input('totalActivityList') listOfActivity
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
  constructor() { }

  ngOnInit() {
    this.initActivitySlider()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes.listOfActivity);
    if (changes.listOfActivity && changes.listOfActivity.currentValue) {
      this.displayActivity = changes.listOfActivity.currentValue
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
    this.selectedwallet = 0
    this.selectedGender = 'male'
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
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
}
