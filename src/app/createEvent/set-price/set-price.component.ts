import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.css']
})
export class SetPriceComponent implements OnInit {

  setPriceForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.setPriceForm = new FormGroup({
      thanksMessage: new FormControl(''),
      afterEventMessage: new FormControl(''),
      isLogistics: new FormControl(''),
      paymentDeadlineDate: new FormControl(''),
      paymentDeadlineTime: new FormControl('')
    })



    // set-price main slider js start
    $('.set-price-main-slider').slick({
      infinite: false,
      draggable: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      fade: true,
      prevArrow: '<button class="prevarrow">Back</button>',
      nextArrow: '<button class="nextarrow">Next</button>',
    });
    // set-price main slider js end
  }

}
