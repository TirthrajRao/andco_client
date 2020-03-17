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
  $slider
  $slideContainter
  selectedIndex = 0
  tabId: any;
  constructor() { }

  ngOnInit() {
    this.initCollectionSlider()
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

      // var handleChange = (i) => {
      //   console.log("i ma su ave che", i)
      //   if (i < this.displayCollection.length)
      //     this.handleChanges(this.displayCollection[i].finalGroup[0])

      //   // this.$slideContainter = $('.total-collection-slider');
      //   // this.$slideContainter.slick('unslick');
      //   // this.initCollectionSlider()
      // };
      // this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
      //   console.log("nextSlide", nextSlide);
      //   handleChange(nextSlide);
      // });
    })
  }





  ngOnChanges(changes: SimpleChanges) {
    console.log("changes of collections in main page", changes.totalCollection.currentValue);
    if (changes.totalCollection.currentValue) {
      this.displayCollection = changes.totalCollection.currentValue
      // this.activityCollection = changes.totalCollection.currentValue.activityName
      this.selectedIndex = 0
      this.$slideContainter = $('.total-collection-slider');
      this.$slideContainter.slick('unslick');
      setTimeout(() => {
        this.initCollectionSlider()
      }, 10)
    }

  }

  openTab(j, i, group) {
    console.log("group index", j, "activity index", i);
    this.tabId = j + "" + i
    $('#' + this.tabId).show()
  }

}
