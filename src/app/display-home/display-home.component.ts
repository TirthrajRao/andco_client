import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-display-home',
  templateUrl: './display-home.component.html',
  styleUrls: ['./display-home.component.css']
})
export class DisplayHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

     //display screen slider start
    $('.display-screen-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows:false,
        verticalSwiping: true,
        vertical: true,
    });
    //display screen slider end
    
  }
}
