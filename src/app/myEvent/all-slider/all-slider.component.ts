import { Component, OnInit, Input, Renderer2, Output, EventEmitter, SimpleChanges, ViewChild, } from '@angular/core';
import * as _ from 'lodash';

declare var $;

@Component({
  selector: 'app-all-slider',
  templateUrl: './all-slider.component.html',
  styleUrls: ['./all-slider.component.css']
})
export class AllSliderComponent implements OnInit {
  @ViewChild('questions', { static: true }) questions: any;

  @Input('eventList') displayList;
  @Input('activityListDisplay') activityList
  @Input('groupOfActivity') groupOfActivity
  @Input('groupIndex') groupIndex
  @Input('selectedEventId') eventIdSelected
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
  groupId
  displayGroup = []
  constructor(
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    if (this.displayList) {
      console.log("first call this right===========", this.displayList);

      this.initEventSlider()
    }
    // this.initActivitySlider()
    this.initGroupSlider()
  }



  ngOnChanges(changes: SimpleChanges) {
    console.log("list of group", changes.eventIdSelected);



    if (changes.displayList && changes.displayList.currentValue) {
      this.isGroup = true
      this.initEventSlider()

    }




    if (changes.activityList && changes.activityList.currentValue) {
      this.isGroup = false
      if (this.$slideContainter) {
        this.$slideContainter.slick('unslick');
        this.$slideContainter = $('.myEvent-activity-slider');
      }
      this.initActivitySlider()
    }
    if (changes.groupOfActivity && changes.groupOfActivity.currentValue) {
      console.log("call activty ot not", changes.groupOfActivity);

      // console.log("group index right now", changes.groupOfActivity.currentValue.selectedActivity);
      if (changes.groupOfActivity.currentValue) {
        $('#' + changes.groupOfActivity.currentValue.selectedActivity).addClass('active')
      }
      if (changes.groupOfActivity.previousValue) {
        $('#' + changes.groupOfActivity.previousValue.selectedActivity).removeClass('active')
      }

      this.displayGroup = changes.groupOfActivity.currentValue.group
      this.isGroup = true
      this.$slideContainter.slick('unslick');
      this.$slideContainter = $('.myEvent-group-slider');
      this.initGroupSlider()
    }
    if (changes.groupIndex) {
      console.log("call group of not", changes.groupIndex);
      if (changes.groupIndex.currentValue) {
        $('#' + changes.groupIndex.currentValue.activity + '-' + changes.groupIndex.currentValue.groupIndex).addClass('active1')
      }
      if (changes.groupIndex.previousValue) {
        $('#' + changes.groupIndex.previousValue.activity + '-' + changes.groupIndex.previousValue.groupIndex).removeClass('active1')
      }
    }


    // if (changes.eventIdSelected && changes.eventIdSelected.currentValue) {
    //   console.log("value of total list", this.displayList);
    //   if (this.displayList) {
    //     let index = this.displayList.findIndex(x => x._id === changes.eventIdSelected.currentValue);
    //     console.log("what in in index", index)
    //   }
    //   // this.selectedIndex = index
    //   // this.selectedIndex
    // }
  }


  initEventSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.myEvent-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<button type="button" class="prevarrow"><img src="assets/images/event-white-arrow.png" alt="arrow"></button>',
        nextArrow: '<button type="button" class="nextarrow"><img src="assets/images/event-white-arrow.png" alt="arrow"></button>',
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
    }, 500)
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

      this.$slider.on('click', (event, slick, currentSlide, nextSlide) => {
        // console.log("event on before", currentSlide, nextSlide);
        this.activeGroup(event, currentSlide)
      })
    }, 100)
  }

  activeGroup(data, currentSlide) {
    // console.log("active group slider", data, currentSlide);
    this.$slider.eq(currentSlide).addClass('active1');
  }
  getSingleEvent(eventId, index) {
    console.log("activity index", this.selectedActivityIndex, index);
    this.selectedIndex = index
    this.singleEvent.emit({ eventId: eventId, value: false })
    this.isGroup = false
    $('.groupOfEvent').css('display', 'none')
    console.log("click on event get index========", this.isGroup);
  }

  getSingleActivity(group, index, activityId) {
    // console.log("index of group", group);
    this.isGroup = true
    $('.groupOfEvent').css('display', 'block')
    this.initActivitySlider()
    this.activityGroup.emit({ group: group, value: false, index: index, activityId: activityId })

  }


  getGroupItem(item, index, group) {
    console.log("index ==========", index, group);
    this.groupItem.emit({ item: item, value: true, index: index, })
  }
}