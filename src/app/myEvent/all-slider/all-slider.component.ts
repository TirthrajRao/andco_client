import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, } from '@angular/core';

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
  isGroup = false
  listOfContent = []
  selectedIndex
  selectedGroupIndex
  selectedActivityIndex
  constructor() { }

  ngOnInit() {
    if (this.displayList) {
      this.initEventSlider()
    }
    this.initActivitySlider()
    this.initGroupSlider()
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("list of group", changes.activityList);

    if (changes.displayList && changes.displayList.currentValue) {
      this.isGroup = true
      this.initEventSlider()
    }
    if (changes.activityList && changes.activityList.currentValue) {
      this.isGroup = false
      $('.myEvent-activity-slider').slick('unslick');
      this.$slideContainter = $('.myEvent-activity-slider');
      this.initActivitySlider()
    }
    if (changes.groupOfActivity && changes.groupOfActivity.currentValue) {
      this.isGroup = true
      this.$slideContainter.slick('unslick');
      this.$slideContainter = $('.myEvent-group-slider');
      this.initGroupSlider()
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
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],

      })
    }, 50)
  }



  initActivitySlider() {
    setTimeout(() => {
      this.$slideContainter = $('.myEvent-activity-slider')
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
              slidesToShow: 3.5,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],

      })
    }, 50)
  }

  initGroupSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.myEvent-group-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],

      })
    }, 50)
  }


  getSingleEvent(eventId, index) {
    console.log("activity index", this.selectedActivityIndex, index);

    // this.selectedActivity = null
    this.selectedIndex = index
    this.singleEvent.emit({ eventId: eventId, value: false })
    this.isGroup = false
    $('.groupOfEvent').css('display', 'none')
    console.log("click on event get index========", this.isGroup);
  }

  getSingleActivity(group, index) {
    this.selectedActivityIndex = index
    this.isGroup = true
    // this.selectedGroupIndex = 0
    $('.groupOfEvent').css('display', 'block')
    // console.log("get group of single activity with index", index);
    this.activityGroup.emit({ group: group, value: false })

  }


  getGroupItem(item, index) {
    console.log("item of singkle group", item);
    this.selectedGroupIndex = index
    this.groupItem.emit({ item: item, value: true })
  }
}
