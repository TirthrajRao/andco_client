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
  isTransfer
  isRegestery


  constructor() { }

  ngOnInit() {

    this.setPriceForm = new FormGroup({
      thanksMessage: new FormControl(''),
      afterEventMessage: new FormControl(''),
      payMentTransferDate: new FormControl(''),
      isLogistics: new FormControl(''),
      paymentDeadlineDate: new FormControl(''),
      paymentDeadlineTime: new FormControl(''),
      isTransfer: new FormControl('')
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


  setPrice() {
    // console.log("payment transfer date value", this.payMentTransfer);

    console.log("value of form", this.setPriceForm.value);

  }
  paymentCloseDate(data) {
    console.log("su ave che", data);
    if (data == 'test5') {
      this.setPriceForm.patchValue({
        payMentTransferDate: 'true'
      });
      this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
      this.isTransfer = false
    } else {
      this.isTransfer = true
    }
  }
  giftOfEvent(data) {
    if (data == 'test1') {
      this.isRegestery = false
    } else {
      this.isRegestery = true
    }
  }
  getDate(event) {
    console.log("hello ===>", event.target.value);
    this.setPriceForm.patchValue({
      payMentTransferDate: event.target.value
    });
    this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
  }

  selectedValue(event) {
    console.log("value of logistics", event.target.id);
    let selected = event.target.id
    if (selected == 'test7') {
      this.setPriceForm.patchValue({
        isLogistics: 'true'
      })
    } else {
      this.setPriceForm.patchValue({
        isLogistics: 'false'
      })
    }

  }
}
