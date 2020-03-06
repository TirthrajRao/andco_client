import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-guest-activity-slider',
  templateUrl: './guest-activity-slider.component.html',
  styleUrls: ['./guest-activity-slider.component.css']
})
export class GuestActivitySliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.guest-activity-slider').not('.slick-initialized').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      prevArrow: '<button type="button" class="prevarrow"><div class="arrow-left"></div></button>',
      nextArrow: '<button type="button" class="nextarrow"><div class="arrow-right"></div></button>'
    });
  }

}
