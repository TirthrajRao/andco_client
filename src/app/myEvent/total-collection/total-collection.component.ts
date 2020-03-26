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
  isSlider = false
  noValueMessage
  constructor() { }

  ngOnInit() {
    this.initCollectionSlider()
  }







  ngOnChanges(changes: SimpleChanges) {
    console.log("changes of collections in main page", changes.totalCollection.currentValue);
    let valueOfCollections = changes.totalCollection.currentValue.groupWise
    let eventTotalValue = changes.totalCollection.currentValue.eventTotal
    if ((valueOfCollections && valueOfCollections.length) && !eventTotalValue.message) {
      console.log("first if");
      this.isSlider = true
      this.displayCollectionDetails(changes.totalCollection.currentValue)
    } else {
      console.log("else part ");
      this.isSlider = false
      if (eventTotalValue && eventTotalValue.message)
        this.noValueMessage = eventTotalValue.message
    }


  }

  displayCollectionDetails(details) {
    console.log("message when no amount", this.noValueMessage);
    this.noValueMessage = ''
    console.log("details of collectioni", details);
    this.displayCollection = details.groupWise
    this.displayEventTotal = details.eventTotal
    this.selectedIndex = 0
    // if (this.displayCollection && !this.displayEventTotal.message) {
    setTimeout(() => {
      this.$slideContainter.slick('unslick');
      this.$slideContainter = $('.total-collection-slider');
      this.initCollectionSlider()
      this.isTotal = true
    }, 10)
    // }
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
