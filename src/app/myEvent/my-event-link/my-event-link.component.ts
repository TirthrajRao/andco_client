import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-my-event-link',
  templateUrl: './my-event-link.component.html',
  styleUrls: ['./my-event-link.component.css']
})
export class MyEventLinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.my-event-tab-slider').not('.slick-initialized').slick({
      infinite: false,
      slidesToShow: 3,
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
