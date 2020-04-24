import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-main-total-collection',
  templateUrl: './main-total-collection.component.html',
  styleUrls: ['./main-total-collection.component.css']
})
export class MainTotalCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.total-collection-slider-main').slick({
      slideToShow : 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      dots: true,
      prevArrow: '<button type="button" class="prevarrow"><div class="arrow-left"></div></button>',
      nextArrow: '<button type="button" class="nextarrow"><div class="arrow-right"></div></button>'
    }); 
  }
}
