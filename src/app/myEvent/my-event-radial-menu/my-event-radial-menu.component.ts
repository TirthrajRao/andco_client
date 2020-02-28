import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-my-event-radial-menu',
  templateUrl: './my-event-radial-menu.component.html',
  styleUrls: ['./my-event-radial-menu.component.css']
})
export class MyEventRadialMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.radial-slider').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
    });
  }

}
