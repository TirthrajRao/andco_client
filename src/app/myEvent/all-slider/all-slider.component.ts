import { Component, OnInit, Input, Renderer2, Output, EventEmitter, SimpleChanges, ViewChild, } from '@angular/core';

declare var $;

@Component({
  selector: 'app-all-slider',
  templateUrl: './all-slider.component.html',
  styleUrls: ['./all-slider.component.css']
})
export class AllSliderComponent implements OnInit {
  @ViewChild('questions', { static: true }) questions: any;

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
  groupId
  displayGroup = []
  constructor(
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    if (this.displayList) {
      this.initEventSlider()
    }
    this.initActivitySlider()
    this.initGroupSlider()
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("list of group", changes.groupOfActivity);

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
      if (changes.groupOfActivity.currentValue.index) {
        console.log("call when index is selected");
        this.displayGroup = changes.groupOfActivity.currentValue.group
        this.selectedGroupIndex = changes.groupOfActivity.currentValue.index
        this.displayGroup[this.selectedGroupIndex].removeClass('active')
        this.isGroup = true
        this.$slideContainter.slick('unslick');
        this.$slideContainter = $('.myEvent-group-slider');
        this.initGroupSlider()
      } else {
        console.log("when no one is selected");
        this.displayGroup = changes.groupOfActivity.currentValue.group
        this.isGroup = true
        this.$slideContainter.slick('unslick');
        this.$slideContainter = $('.myEvent-group-slider');
        this.initGroupSlider()
      }
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

    console.log("index of group", group);
    // this.groupId = document.getElementById("groupIndex");
    console.log("rid", this.selectedGroupIndex);
    if (this.selectedGroupIndex) {
      group[this.selectedGroupIndex].removeClass('active');
    }

    // this.groupId.removeClass('active')
    this.selectedActivityIndex = index
    this.isGroup = true
    // this.selectedGroupIndex = 0
    $('.groupOfEvent').css('display', 'block')
    // console.log("get group of single activity with index", index);
    this.activityGroup.emit({ group: group, value: false })

  }


  getGroupItem(item, index) {

    // $(".myEvent-name.group").addClass('active');
    this.selectedGroupIndex = index
    console.log("item of singkle group", this.selectedGroupIndex);
    this.groupItem.emit({ item: item, value: true, index: this.selectedGroupIndex })
  }
}
