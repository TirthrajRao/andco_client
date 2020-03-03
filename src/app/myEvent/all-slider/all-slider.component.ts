import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-all-slider',
  templateUrl: './all-slider.component.html',
  styleUrls: ['./all-slider.component.css']
})
export class AllSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.myEvent-slider').not('.slick-initialized').slick({
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

    });
  }

}
