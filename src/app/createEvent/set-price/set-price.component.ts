import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';
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
      swipe: false,
      prevArrow: '<button type="button" class="prevarrow">Back</button>',
      nextArrow: '<button type="button" class="nextarrow">Next</button>',
    });
    // }, 500)
    // set-price main slider js end
    $('.prevarrow, .nextarrow, .set-price-custom-button').attr('tabindex', '-1');

    // $(".nextArrowClick").on("click", function(){
    //   alert("The paragraph was clicked.");
    // });
  }

  nextArrowClick() {
    console.log("nextArrowClick($event)");

  }
  setPrice() {
    console.log("value of form", this.setPriceForm);
    const message = 'Set price of created event'
    this.alertService.getSuccess(message)
    // const invalidMessage = []
    // const controls: any = this.setPriceForm.controls
    // for (const name in controls) {
    //   console.log("name of controls=========", name);

    //   if (controls[name].invalid) {
    //     console.log("invalid", controls[name]);
    //     invalidMessage.push(name)
    //     //     let message = 'Error in' + name
    //     //     this.alertService.getError(message)
    //   } else {
    //     console.log("---valid", controls[name]);
    //     //     // let message = 'Price Set in Created Event'
    //     //     // this.alertService.getSuccess(message)
    //     //     this.setPriceForm.reset()
    //     //     // this.router.navigate(['/menu'])
    //   }
    // }
    // return invalidMessage
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
}
