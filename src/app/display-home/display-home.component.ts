import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-display-home',
  templateUrl: './display-home.component.html',
  styleUrls: ['./display-home.component.css']
})
export class DisplayHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      $('.display-screen-slider').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        // autoplaySpeed: 5000,
        arrows: false,
        verticalSwiping: true,
        vertical: true,
        dots: true,
        pauseOnHover: false,
        pauseOnFocus: false,
      });

      $('.display-screen-slider').on('wheel', (function (e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
          $(this).slick('slickPrev');
        } else {
          $(this).slick('slickNext');
        }
      }));

      $('.display-screen-slider').on('keydown', function (e) {
        if (e.keyCode == 38) {
          $(this).slick('slickPrev');
        }
        if (e.keyCode == 40) {
          $(this).slick('slickNext');
        }
      });
    }, 50)
  }
}
