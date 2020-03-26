import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
declare var $;

@Component({
  selector: 'app-total-collection',
  templateUrl: './total-collection.component.html',
  styleUrls: ['./total-collection.component.css']
})
export class TotalCollectionComponent implements OnInit {
  @Input('collections') totalCollection
  displayCollection = []
  activityCollection = []
  displayEventTotal
  $slider
  $slideContainter
  selectedIndex = 0
  tabId: any;
  isTotal
  constructor() { }

  ngOnInit() {
    this.initCollectionSlider()
  }







  ngOnChanges(changes: SimpleChanges) {
    console.log("changes of collections in main page", changes.totalCollection.currentValue);
    if (changes.totalCollection.currentValue) {
      this.displayCollectionDetails(changes.totalCollection.currentValue)
    }


  }

  displayCollectionDetails(details) {
    console.log("details of collectioni", details);
    this.displayCollection = details.groupWise
    this.displayEventTotal = details.eventTotal
    setTimeout(() => {
      this.$slideContainter = $('.total-collection-slider');
      this.$slideContainter.slick('unslick');
      this.initCollectionSlider()
      this.isTotal = true
    }, 10)
    this.selectedIndex = 0
  }


  openTab(j, i, group) {
    console.log("group index", j, "activity index", i);
    this.tabId = j + "" + i
    $('#' + this.tabId).show()
  }

  initCollectionSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.total-collection-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: true,
        prevArrow: '<button type="button" class="prevarrow"><img src="assets/images/event-right.png"></button>',
        nextArrow: '<button type="button" class="nextarrow"><img src="assets/images/event-right.png"></button>',
      })
    })
  }
}
