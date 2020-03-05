import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.css']
})
export class EventMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.event-menu-slider').not('.slick-initialized').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      prevArrow: '<button type="button" class="prevarrow"></button>',
      nextArrow: '<button type="button" class="nextarrow"></button>',
    });
  } 
}