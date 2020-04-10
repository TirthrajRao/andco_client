import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css','./../createEvent/set-price/set-price.component.css']
})
export class AddBankAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
       // bank slider start here
       $('.bank-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '#prevarrow',
        nextArrow: '#nextarrow',
      });
      // bank slider end here
      // card slider start here
      $('.card-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '#prevarrow1',
        nextArrow: '#nextarrow1',
      });
      // card slider end here
  }

}
