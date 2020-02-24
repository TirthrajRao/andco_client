import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.css']
})
export class SetPriceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // set-price main slider js start
    $('.set-price-main-slider').slick({
      infinite: false,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        adaptiveHeight: true,
        fade: true,
        prevArrow: '<button class="prevarrow">Back</button>',
        nextArrow: '<button class="nextarrow">Next</button>',
  });
  // set-price main slider js end
  }

}
