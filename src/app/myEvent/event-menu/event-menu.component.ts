import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
declare var $;

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.css']
})
export class EventMenuComponent implements OnInit {

  @Input('eventId') eventId;
  @Input('menuSelected') selectedMenu
  @Output() profilePhoto: EventEmitter<any> = new EventEmitter<any>();
  @Output() activity: EventEmitter<any> = new EventEmitter<any>();
  // @Output() selectedMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeMenu: EventEmitter<any> = new EventEmitter<any>();
  $slider
  $sliderContent
  menuArray = [
  ]
  mainMenu = [
    "activity", "profile photo", "collected", "link", "invited guest", "edit event"
  ]
  collectionMenu = [
    "collected", "link", "invited guest", "edit event", "activity", "profile photo",
  ]
  linkMenu = [
    "link", "invited guest", "edit event", "activity", "profile photo", "collected",
  ]
  guestMenu = [
    "invited guest", "edit event", "activity", "profile photo", "collected", "link",
  ]
  profileMenu = [
    "profile photo", "collected", "link", "invited guest", "edit event", "activity"
  ]

  selectedIndex

  constructor() { }

  ngOnInit() {
    // this.initMenuSlider()
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("selected event id", changes.selectedMenu);
    if (changes.selectedMenu && changes.selectedMenu.currentValue) {
      if (changes.selectedMenu.currentValue == "collected") {
        this.menuArray = this.collectionMenu
        this.initMenuSlider()
      } else if (changes.selectedMenu.currentValue == "link") {
        this.menuArray = this.linkMenu
        this.initMenuSlider()
      } else if (changes.selectedMenu.currentValue == 'invited guest') {
        this.menuArray = this.guestMenu
        this.initMenuSlider()
      } else if (changes.selectedMenu.currentValue == 'profile photo') {
        this.menuArray = this.profileMenu
        this.initMenuSlider()
      }
    }
    else if (changes.selectedMenu == undefined) {
      this.menuArray
      this.initMenuSlider()
    }
    else {
      this.menuArray = this.mainMenu
      // this.collectionMenu = []
      this.initMenuSlider()
    }
    // setTimeout(() => {
    //   this.selectedIndex = 0
    //   this.initMenuSlider()
    //   // if (changes.eventId.currentValue) {
    //   //   // this.selectedMenu.emit(this.selectedIndex)
    //   // }
    // }, 500)

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
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            }
          }
        ],
      })
      // var currentSlide = $('.event-menu-slider').slick('slickCurrentSlide');

      // console.log("what is current side ", currentSlide)
      this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide, previousSlide) => {
        console.log("event on before", currentSlide, nextSlide);
        this.previousSlide(nextSlide)
      })
    }, 500)
  }

  previousSlide(nextSlide) {
    console.log("what is main menu array", this.menuArray[nextSlide])
    console.log("the value of slider", nextSlide);
    // let obj = {
    //   menuName : this.menuArray[nextSlide]
    // }
    // this.changeMenu.emit(nextSlide)
    this.changeMenu.emit(this.menuArray[nextSlide])
  }

  // selectMenu(i) {
  //   console.log("index of menu", i);
  //   this.selectedIndex = i
  // }



}