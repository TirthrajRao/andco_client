import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // create event slider start
    $('.create-event-slider').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      adaptiveHeight: true,
      fade: true,
      prevArrow: '<button class="prevarrow">Back</button>',
      nextArrow: '<button class="nextarrow">Next</button>',
    });
    // create event slider end
    
    //tooltip js start
    $(".tooltip-class").hover(function () {
      $(this).attr("tooltip-data", $(this).attr("title"));
      $(this).removeAttr("title");
    }, function () {
      $(this).attr("title", $(this).attr("tooltip-data"));
      $(this).removeAttr("tooltip-data");
    });
    //tooltip js end
  }

}
