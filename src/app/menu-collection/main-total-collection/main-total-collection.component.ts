import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
declare var $;

@Component({
  selector: 'app-main-total-collection',
  templateUrl: './main-total-collection.component.html',
  styleUrls: ['./main-total-collection.component.css']
})
export class MainTotalCollectionComponent implements OnInit {
  @Input('collections') totalCollections
  displayCollection
  $slider
  $slideContainter
  displayEventTotal: any;
  isClosed
  constructor() { }

  ngOnInit() {
    this.initActivitySlider()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("what is in changes for collections", changes);
    if (changes.totalCollections && changes.totalCollections.currentValue) {
      this.isClosed = changes.totalCollections.currentValue.isClosed
      this.collectionDisplay(changes.totalCollections.currentValue)
    }
  }


  collectionDisplay(data) {
    console.log("data of collections", data);


    setTimeout(() => {
      this.$slideContainter.slick('unslick');
      this.$slideContainter = $('.total-collection-slider-main');
      this.displayCollection = data.groupWise
      this.displayEventTotal = data.eventTotal
      this.initActivitySlider()
      // this.isTotal = true
    }, 10)

  }


  initActivitySlider() {
    setTimeout(() => {
      this.$slideContainter = $('.total-collection-slider-main')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        slideToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: true,
        prevArrow: '<button type="button" class="prevarrow"><div class="arrow-left"></div></button>',
        nextArrow: '<button type="button" class="nextarrow"><div class="arrow-right"></div></button>'
      })
    })
  }

}
