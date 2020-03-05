import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-total-collection',
  templateUrl: './total-collection.component.html',
  styleUrls: ['./total-collection.component.css']
})
export class TotalCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.total-collection-slider').not('.slick-initialized').slick({
      infinite: false,
      draggable: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      dots: true,
      prevArrow: '<button type="button" class="prevarrow"><img src="assets/images/event-right.png"></button>',
      nextArrow: '<button type="button" class="nextarrow"><img src="assets/images/event-right.png"></button>',
    });
  }

}
