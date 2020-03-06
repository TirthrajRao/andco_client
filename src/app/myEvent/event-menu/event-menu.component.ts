import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
declare var $;

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.css']
})
export class EventMenuComponent implements OnInit {

  @Input('eventId') eventId;
  @Output() profilePhoto: EventEmitter<any> = new EventEmitter<any>();
  @Output() activity: EventEmitter<any> = new EventEmitter<any>();
  $slider
  $sliderContent
  menuArray = [
    "activity", "profile photo", "collected", "link", "invited guest", "edit event"
  ]
  selectedIndex

  constructor() { }

  ngOnInit() {
    this.initMenuSlider()
    // $('.event-menu-slider').not('.slick-initialized').slick({
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   arrows: true,
    //   centerMode: true,
    //   prevArrow: '<button type="button" class="prevarrow"><img src="assets/images/event-white-arrow.png"></button>',
    //   nextArrow: '<button type="button" class="nextarrow"><img src="assets/images/event-white-arrow.png"></button>',
    // });
  }

  initMenuSlider() {
    setTimeout(() => {
      this.$sliderContent = $('.event-menu-slider')
      this.$slider = this.$sliderContent.not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        prevArrow: '<button type="button" class="prevarrow"><img src="assets/images/event-white-arrow.png"></button>',
        nextArrow: '<button type="button" class="nextarrow"><img src="assets/images/event-white-arrow.png"></button>',
      })
    }, 50)
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("selected event id", this.eventId);
    setTimeout(() => {
      this.initMenuSlider()
    }, 5000)

  }

  clickOnMenu(selectedMenu, index) {
    console.log("selected menu details", selectedMenu, index);
    this.selectedIndex = index
    if (this.selectedIndex == 1) {
      console.log("this");
      this.profilePhoto.emit(index)
    }
    if (this.selectedIndex == 0) {
      this.activity.emit(index)
    }
  }
}