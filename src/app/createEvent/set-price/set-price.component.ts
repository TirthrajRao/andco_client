import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
declare var $: any

@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.css']
})
export class SetPriceComponent implements OnInit {

  setPriceForm: FormGroup;
  isDisable = false
  isTransfer
  isRegestery
  isEventPlannerSelected;
  isEventVendorSelected
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  object1 = {
    planner: ''
  }
  object2 = {
    vendor: ''
  }
  hashTag = sessionStorage.getItem('hasTag');
  constructor(
    public alertService: AlertService
  ) { }

  ngOnInit() {

    this.setPriceForm = new FormGroup({
      thanksMessage: new FormControl('', [Validators.required]),
      afterEventMessage: new FormControl('', [Validators.required]),
      payMentTransferDate: new FormControl(''),
      isLogistics: new FormControl(''),
      paymentDeadlineDate: new FormControl('', [Validators.required]),
      paymentDeadlineTime: new FormControl('', [Validators.required]),
      bankDetails: new FormControl('', [Validators.required]),
      hearAbout: new FormControl('')
    })

    console.log("time zone ", this.timezone);


    // set-price main slider js start
    // setTimeout(() => {

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
    // }, 500)
    // set-price main slider js end
  }


  setPrice() {
    console.log("value of form", this.setPriceForm);
    let message = 'Price Set in Created Event'
    this.alertService.getSuccess(message)

  }
  detailsOfBank(event) {
    console.log("bank details in set price", event);
    this.setPriceForm.patchValue({
      bankDetails: event
    })
    this.setPriceForm.get('bankDetails').updateValueAndValidity()
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

  onDropDown(event) {
    console.log("selected drop down value", event.target.value);
    if (event.target.value == 'planner') {
      this.isEventPlannerSelected = true
      this.isEventVendorSelected = false
    } else if (event.target.value == 'vendor') {
      this.isEventVendorSelected = true
      this.isEventPlannerSelected = false
    } else {
      this.isEventPlannerSelected = false
      this.isEventVendorSelected = false
    }
  }

  plannerValue(event) {
    console.log("planner value", event.target.value);
    this.setPriceForm.patchValue({
      hearAbout: event.target.value
    })
    this.setPriceForm.get('hearAbout').updateValueAndValidity()
  }
}
