import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-display-home',
  templateUrl: './display-home.component.html',
  styleUrls: ['./display-home.component.css']
})
export class DisplayHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      $('.display-screen-slider').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        verticalSwiping: true,
        vertical: true,
      });
    }, 50)
  }
}
