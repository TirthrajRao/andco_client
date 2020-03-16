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
  @Output() selectedMenu: EventEmitter<any> = new EventEmitter<any>();
  $slider
  $sliderContent
  menuArray = [
    "activity", "profile photo", "collected", "link", "invited guest", "edit event"
  ]
  selectedIndex

  constructor() { }

  ngOnInit() {
    this.initMenuSlider()
  }

  initMenuSlider() {
    setTimeout(() => {
      this.$sliderContent = $('.event-menu-slider')
      this.$slider = this.$sliderContent.not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        prevArrow: '#arrowpre',
        nextArrow: '#arrownext',
      })

    }, 50)
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("selected event id", changes.eventId.currentValue);
    setTimeout(() => {
      this.selectedIndex = 0
      this.initMenuSlider()
      if (changes.eventId.currentValue) {
        // this.selectedMenu.emit(this.selectedIndex)
      }
    }, 5000)

  }

  clickOnMenu(selectedMenu, index) {
    console.log("selected menu details", selectedMenu, index);
    this.selectedMenu.emit(index)
  }
}