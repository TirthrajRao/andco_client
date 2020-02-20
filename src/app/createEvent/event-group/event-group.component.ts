import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // event main slider start
      $('.event-slider').slick({
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,

    });
    // event main slider end
    //group slider start
    $('.group-slider').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        
    });
    //group slider end
  }

}
