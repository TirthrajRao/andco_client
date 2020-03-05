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
  constructor() { }

  ngOnInit() {
    if (this.displayList) {
      this.initEventSlider()
    }

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("list of group", this.activityList);

    if (changes.displayList && changes.displayList.currentValue) {
      this.isGroup = true
      this.initEventSlider()
    }
    if (changes.activityList && changes.activityList.currentValue) {
      this.isGroup = false
      this.$slideContainter = $('.myEvent-slider');
      this.$slideContainter.slick('unslick');
      this.initEventSlider()
    }
    if (changes.groupOfActivity && changes.groupOfActivity.currentValue) {
      this.isGroup = true
      this.$slideContainter = $('.myEvent-slider');
      this.$slideContainter.slick('unslick');
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


  initGroupSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.groupEvent-slider')
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
    this.singleEvent.emit({ eventId: eventId, value: false })
    this.groupOfActivity = null
    // this.isActivity = true
    this.isGroup = false
    $('.groupOfEvent').css('display', 'none')
    console.log("click on event get index========", this.isGroup);
  }

  getSingleActivity(group) {
    this.isGroup = true
    $('.groupOfEvent').css('display', 'block')
    // console.log("get group of single activity with index", index);
    this.activityGroup.emit({ group: group, value: false })

  }


  getGroupItem(item) {
    console.log("item of singkle group", item);
    this.groupItem.emit({ item: item, value: true })
  }
}
