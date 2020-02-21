import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('userName'));

  constructor() { }

  ngOnInit() {

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

  button(){
    console.log("=============");
    
  }

}
