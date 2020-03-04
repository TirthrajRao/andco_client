import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';

declare var $;

@Component({
  selector: 'app-all-slider',
  templateUrl: './all-slider.component.html',
  styleUrls: ['./all-slider.component.css']
})
export class AllSliderComponent implements OnInit {

  @Input('eventList') displayList;
  @Input('activityList') activityList
  @Input('groupOfActivity') groupOfActivity
  @Output() singleEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() activityGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() groupItem: EventEmitter<any> = new EventEmitter<any>();
  $slideContainter;
  $slider;
  activityDisplay
  isActivity
  isGroup
  listOfContent = []
  constructor() { }

  ngOnInit() {
    if (this.displayList) {
      // console.log("changes of event", this.displayList);
      this.initEventSlider()
    }
    // if (this.activityList) {
    // console.log("list of activity", this.activityList)
    //   this.initEventSlider()
    // }

  }
  ngOnChanges() {
    console.log("list of group", this.groupOfActivity);
    if (this.displayList) {
      // console.log("changes of event", this.displayList);
      this.initEventSlider()
    }
    if (this.activityList) {
      this.activityDisplay
      // console.log("list of activity", this.activityList)
      this.$slideContainter = $('.myEvent-slider');
      this.$slideContainter.slick('unslick');
      // setTimeout(() => {
      this.initEventSlider()
      // }, 50)
    }
    if (this.groupOfActivity) {


      this.$slideContainter = $('.myEvent-slider');
      this.$slideContainter.slick('unslick');
      // setTimeout(() => {
      this.initEventSlider()
    }
  }


  initEventSlider() {
    setTimeout(() => {

      this.$slideContainter = $('.myEvent-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          },
        ],

      })
    }, 50)
  }


  getSingleEvent(eventId, index) {
    this.singleEvent.emit(eventId)
    this.isActivity = true
    this.isGroup = false
    console.log("click on event get index========", this.isGroup);
  }

  getSingleActivity(group, index) {
    console.log("get group of single activity with index", index);
    this.activityGroup.emit({ group: group, index: index })
    this.isGroup = true

  }


  getGroupItem(item) {
    console.log("item of singkle group", item);
    this.groupItem.emit(item)
  }
}
