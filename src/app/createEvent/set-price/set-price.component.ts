import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { every } from 'rxjs/operators';
declare var $: any
import * as _ from 'lodash';
import { async } from 'q';


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
  $sliderContainer
  $slider
  errorMessaage;
  constructor(
    public alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {

    this.setPriceForm = new FormGroup({
      thanksMessage: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]+$")]),
      afterEventMessage: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]+$")]),
      payMentTransferDate: new FormControl(''),
      isLogistics: new FormControl(''),
      paymentDeadlineDate: new FormControl('', [Validators.required]),
      paymentDeadlineTime: new FormControl('', [Validators.required]),
      bankDetails: new FormControl('', [Validators.required]),
      hearAbout: new FormControl('')
    })
    this.initSlickSlider()
    console.log("time zone ", this.timezone);


    // set-price main slider js start
    // setTimeout(() => {


    // }, 500)
    // set-price main slider js end
    // $('.prevarrow, .nextarrow, .set-price-custom-button').attr('tabindex', '-1');

    // $(".nextArrowClick").on("click", function () {
    //   // alert("The paragraph was clicked.");
    //   // console.log("form value=======", this.setPriceForm);
    //   var nextClick = () => {
    //     this.nextArrowClick()
    //   }

    // });
  }


  initSlickSlider() {
    this.$sliderContainer = $('.set-price-main-slider')
    this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
      infinite: false,
      draggable: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      fade: true,
      swipe: false,
      prevArrow: '<button type="button" class="prevarrow">Back</button>',
      nextArrow: '<button type="button" class="nextarrow" (click)="nextArrowClick($event)">Next</button>',
      nextArrowClick(event) {
        console.log("is this call or not", event);

        this.nextArrowClick(event)
      }
    })
    // var nextClick = this.nextArrowClick
    // this.$slider.on('click', function (event) {
    //   nextClick(event)
    // })

  }



  /**
   * Display error message
   */
  get f() { return this.setPriceForm.controls; }


  newClick(data) {
    console.log("this is very important", data);

  }

  nextArrowClick(event) {
    console.log("nextArrowClick($event)", event);

  }
  setPrice() {
    console.log("value of form", this.setPriceForm);
    // let message
    const keys = Object.keys(this.setPriceForm.controls);
    let form = this.setPriceForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      if (form[element].status == 'INVALID') {
        flag = 1;
        if (element == 'thanksMessage') {
          console.log("thank you message error");
          this.errorMessaage = 'Thank you message is required'
        } else if (element == 'afterEventMessage') {
          this.errorMessaage = 'After Event message is required'
        } else if (element == 'paymentDeadlineDate') {
          this.errorMessaage = 'Payment Date is required'
        } else if (element == 'paymentDeadlineTime') {
          this.errorMessaage = 'Payment Time is required'
        } else if (element == 'bankDetails') {
          this.errorMessaage = 'Bank Details is required'
        }
        // this.errorMessaage = 'nothing'
        this.alertService.getError(this.errorMessaage)
        return false
      }
      else {
        return true
      }
    });
    if (flag == 0) {
      let message = 'New Event created'
      this.alertService.getSuccess(message)
      this.router.navigate(['created-event-message'])
    }
  }
  detailsOfBank(event) {
    console.log("bank details in set price", event);
    this.setPriceForm.patchValue({
      bankDetails: event
    })
    console.log("enter form value", this.setPriceForm.value);

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
  skipButton() {
    this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) + 1);
  }
}
