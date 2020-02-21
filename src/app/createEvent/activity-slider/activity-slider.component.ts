import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.css']
})
export class ActivitySliderComponent implements OnInit {

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
