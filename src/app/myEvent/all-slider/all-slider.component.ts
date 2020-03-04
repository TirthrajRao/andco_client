import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';

declare var $;

@Component({
  selector: 'app-all-slider',
  templateUrl: './all-slider.component.html',
  styleUrls: ['./all-slider.component.css']
})
export class AllSliderComponent implements OnInit {

  @Input('eventList') displayList;
  @Output() singleEvent: EventEmitter<any> = new EventEmitter<any>();
  $slideContainter;
  $slider;
  constructor() { }

  ngOnInit() {
    this.initEventSlider()
    console.log("list of event in slider", this.displayList);
  }
  ngOnChanges() {
    this.initEventSlider()
    console.log("changes of event", this.displayList);
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


  getSingleEvent(eventId) {
    console.log("click on event", eventId);
    this.singleEvent.emit(eventId)
  }
}
