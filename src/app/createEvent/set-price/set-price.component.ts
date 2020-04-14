import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { EventService } from '../../services/event.service';
import { LoginService } from '../../services/login.service';

import { Router, ActivatedRoute } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { every } from 'rxjs/operators';
declare var $: any
import * as _ from 'lodash';
import { async } from 'q';
import * as moment from 'moment';



@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.css']
})
export class SetPriceComponent implements OnInit {

  private sub: any
  private eventId: any
  setPriceForm: FormGroup;
  isLoad = false
  isDisable = false
  isTransfer
  isRegestery
  isPayment
  isEventPlannerSelected;
  isEventPlannerUpdate
  isEventVendorSelected
  isEventVendorUpdate
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  object1 = {
    planner: ''
  }
  object2 = {
    vendor: ''
  }
  hashTag = sessionStorage.getItem('hasTag');
  eventLink = sessionStorage.getItem('eventLink');
  $sliderContainer
  $slider
  errorMessaage;
  currentDay = new Date()
  time = this.currentDay.getHours() + ":" + this.currentDay.getMinutes();
  setPriceDetails
  hearAboutMessage
  vendorMessage
  aboutTypeOf
  selectedAccount
  selectedCardAccount
  totalAccount
  constructor(
    public alertService: AlertService,
    public eventService: EventService,
    public loginService: LoginService,
    private router: Router,
    private activated: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("what is current time", this.time);

    this.getBankDetails()
    this.loginService.sharedBankDetails.subscribe(response => {
      console.log("when click on plus ", response);
    })

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // console.log("link of event======", this.eventLink);

    this.setPriceForm = new FormGroup({
      welcomeMessage: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9 _ . ,]+$")]),
      thankyouMessage: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9 _ . ,]+$")]),
      payMentTransferDate: new FormControl(''),
      isLogistics: new FormControl(''),
      paymentDeadlineDate: new FormControl('', [Validators.required]),
      paymentDeadlineTime: new FormControl('', [Validators.required]),
      bankDetails: new FormControl('', [Validators.required]),
      hearAbout: new FormControl(''),
      linkOfEvent: new FormControl(''),
      message: new FormControl(''),
      vendorMessage: new FormControl(''),
      regestery: new FormControl('')
    })
    this.sub = this.activated.params.subscribe(param => {
      this.eventId = param.id
      this.getSetPriceDetailsOfEvent(this.eventId)
    })
    this.initSlickSlider()
    // console.log("time zone ", this.timezone);
  }

  getBankDetails() {
    this.loginService.getBankDetails().subscribe((response: any) => {
      console.log("details of bank", response);
      this.totalAccount = response.data
      // this.bankTotal = response.data.bankDetail
      // this.cardTotal = response.data.cardDetails
    }, error => {
      console.log("error while get details", error);

    })
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

    })

    this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide, previousSlide) => {
      console.log("event on before", currentSlide, nextSlide);
      // this.previousSlide(currentSlide)
    })
  }


  previousSlide(slide) {
    // console.log("slide na click ma su ave", slide);

  }

  getSetPriceDetailsOfEvent(eventId) {

    this.eventService.getPriceOfEvent(eventId).subscribe((response: any) => {
      // console.log("response of set price", response);
      // this.setPriceDetails = ''
      if (response.welcomeMessage) {
        this.setPriceDetails = response
        console.log("response of set price", this.setPriceDetails);
        if (this.setPriceDetails.bankAccount != null) {
          console.log("call for bank account");
          this.selectedAccount = this.setPriceDetails.bankAccount
        }
        if (this.setPriceDetails.cardAccount != null) {
          this.selectedCardAccount = this.setPriceDetails.cardAccount
        }
        let selectedLogistics = this.setPriceDetails.isLogistics
        this.aboutTypeOf = this.setPriceDetails.hearAbout
        // console.log("if about type is selected or not", this.aboutTypeOf);
        if (this.setPriceDetails.payMentTransferDate == 'true') {
          $('input:radio[id="test5"]').prop('checked', true);
        }
        if (selectedLogistics == "isdelivery") {
          console.log("call true==========");
          $('input:radio[id="isdelivery"]').prop('checked', true);
        } else if (selectedLogistics == "noDelivery") {
          console.log("call false =======");
          $('input:radio[id="noDelivery"]').prop('checked', true);
        }
        if (this.setPriceDetails.payMentTransferDate != 'true') {
          $('input:radio[id="test6"]').prop('checked', true);
          // this.isTransfer = true
          this.isPayment = true
        }
        if (this.setPriceDetails.regestery == 'true') {
          $('input:radio[id="test1"]').prop('checked', true);
        }
        if (this.setPriceDetails.hearAbout && this.setPriceDetails.hearAbout.aboutType == 'planner') {
          console.log("this is called");
          this.isEventPlannerUpdate = true
          this.hearAboutMessage = this.setPriceDetails.hearAbout.message
          console.log("messgae of hear about", this.hearAboutMessage);
        }
        if (this.setPriceDetails.hearAbout && this.setPriceDetails.hearAbout.aboutType == 'vendor') {
          console.log("this is called");
          this.isEventVendorUpdate = true
          this.vendorMessage = this.setPriceDetails.hearAbout.message
          console.log("messgae of hear about", this.hearAboutMessage);
        }
      }

    }, error => {
      console.log("error while get price ", error);

    })
  }

  selectbankAccount(event) {
    console.log("when bank account selected", event);
    let obj = {
      _id: event,
      flag: 'bank'
    }

    this.setPriceForm.patchValue({
      bankDetails: obj
    })
    this.setPriceForm.get('bankDetails').updateValueAndValidity()

  }

  selectCard(event) {

    let obj = {
      _id: event,
      flag: 'card'
    }

    this.setPriceForm.patchValue({
      bankDetails: obj
    })
    this.setPriceForm.get('bankDetails').updateValueAndValidity()
  }
  /**
   * Display error message
   */
  get f() { return this.setPriceForm.controls; }


  newClick(data) {
    // console.log("this is very important", data);

  }

  nextArrowClick(event) {
    // console.log("nextArrowClick($event)", event);

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
        if (element == 'welcomeMessage') {
          // console.log("thank you message error");
          this.errorMessaage = 'Welcome message is required'
        } else if (element == 'thankyouMessage') {
          this.errorMessaage = 'Thank you message is required'
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
      console.log("value of set price", this.setPriceForm);
      this.eventService.setPriceOfEvent(this.setPriceForm.value, this.eventId).subscribe((response: any) => {
        console.log("response of set price of event", response);
        this.alertService.getSuccess(response.message)
        this.router.navigate(['created-event-message'])
      }, error => {
        console.log("error while set price of event", error)
      })
    }
  }

  updateSetPrice() {
    console.log("call for update", this.setPriceForm.value);
    this.isLoad = true
    const keys = Object.keys(this.setPriceForm.controls);
    let form = this.setPriceForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      // console.log("bank element", form[element], value)
      if (form[element] == this.setPriceForm.controls.bankDetails) {
        if (form[element].status == 'INVALID') {
          console.log("call or not");
          console.log("this is perfect", element);
          if (this.setPriceDetails.bankAccount) {
            let obj = {
              _id: this.setPriceDetails.bankAccount._id,
              flag: 'bank'
            }
            this.setPriceForm.patchValue({
              bankDetails: obj
            })
            this.setPriceForm.get('bankDetails').updateValueAndValidity()
          } else {
            let obj = {
              _id: this.setPriceDetails.cardAccount._id,
              flag: 'card'
            }

            this.setPriceForm.patchValue({
              bankDetails: obj
            })
            this.setPriceForm.get('bankDetails').updateValueAndValidity()
          }
        }
      } else {
        if (form[element].status == 'INVALID') {
          flag = 1;
          this.isLoad = false
          if (element == 'welcomeMessage') {
            console.log("thank you message error", element);
            this.errorMessaage = 'Thank you message is required'
          } else if (element == 'thankyouMessage') {
            this.errorMessaage = 'After Event message is required'
          } else if (element == 'paymentDeadlineDate') {
            this.errorMessaage = 'Payment Date is required'
          } else if (element == 'paymentDeadlineTime') {
            this.errorMessaage = 'Payment Time is required'
          }
          this.alertService.getError(this.errorMessaage)
          return false
        }
        else {
          return true
        }
      }
    });
    if (flag == 0) {
      if (this.aboutTypeOf != undefined) {
        if (this.setPriceForm.controls.hearAbout.value == 'planner') {
          console.log("call this for planner");
          let hearAbout = {
            aboutType: this.aboutTypeOf.aboutType,
            message: this.hearAboutMessage
          }
          this.setPriceForm.controls.hearAbout.setValue(hearAbout)
          this.setPriceForm.patchValue({
            hearAbout: hearAbout
          })
          this.setPriceForm.get('hearAbout').updateValueAndValidity()
        } else if (this.setPriceForm.controls.hearAbout.value == 'vendor') {
          console.log("call this for planner");
          let hearAbout = {
            aboutType: this.aboutTypeOf.aboutType,
            message: this.vendorMessage
          }
          // this.setPriceForm.controls.hearAbout.setValue(hearAbout)
          this.setPriceForm.patchValue({
            hearAbout: hearAbout
          })
          this.setPriceForm.get('hearAbout').updateValueAndValidity()
        } else {
          let hearAbout = {
            aboutType: this.aboutTypeOf.aboutType
          }
          this.setPriceForm.patchValue({
            hearAbout: hearAbout
          })
          this.setPriceForm.get('hearAbout').updateValueAndValidity()
        }
      }
      console.log("final data to  update", this.setPriceForm.value);
      this.eventService.updateEetPriceOfEvent(this.setPriceForm.value, this.eventId).subscribe((response: any) => {
        console.log("response of set price of event", response);
        this.isLoad = false
        this.alertService.getSuccess(response.message)
        this.router.navigate(['set-message/' + 'update'])
      }, error => {
        console.log("error while set price of event", error)
        this.isLoad = false
      })
    }

  }

  detailsOfBank(event) {
    // console.log("bank details in set price", event);
    this.setPriceForm.patchValue({
      bankDetails: event
    })
    // console.log("enter form value", this.setPriceForm.value);

    this.setPriceForm.get('bankDetails').updateValueAndValidity()
  }
  paymentCloseDate(data) {
    // console.log("su ave che", data);
    if (data == 'test5') {
      this.setPriceForm.patchValue({
        payMentTransferDate: 'true'
      });
      this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
      this.isTransfer = false
      this.isPayment = false
    } else {
      if (this.setPriceDetails && this.setPriceDetails.payMentTransferDate != 'true') {
        this.isTransfer = false
        this.isPayment = true
      } else {
        this.isTransfer = true
        this.isPayment = false
      }
    }
  }
  giftOfEvent(data) {
    if (data == 'test1') {
      this.isRegestery = false
      this.setPriceForm.patchValue({
        regestery: 'true'
      })
      this.setPriceForm.get('regestery').updateValueAndValidity()
    } else {
      this.isRegestery = true
    }
  }
  getDate(event) {
    // console.log("hello ===>", event.value);
    // moment($(event.value).val()).format('YYYY-MM-DD')
    this.setPriceForm.patchValue({
      payMentTransferDate: moment(event.value).format('YYYY-MM-DD')
    });
    this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
  }

  selectedValue(event) {
    // console.log("value of logistics", event.target.id);
    let selected = event.target.id
    if (selected == 'isdelivery') {
      this.setPriceForm.patchValue({
        isLogistics: 'isdelivery'
      })
      this.setPriceForm.get('isLogistics').updateValueAndValidity();
    } else {
      this.setPriceForm.patchValue({
        isLogistics: 'noDelivery'
      })
      this.setPriceForm.get('isLogistics').updateValueAndValidity();
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
      let hearAbout = {
        aboutType: event.target.value
      }
      this.setPriceForm.patchValue({
        hearAbout: hearAbout
      })
      this.setPriceForm.get('hearAbout').updateValueAndValidity()
    }
  }


  updateDropDown(event) {
    console.log("selected drop down value", event.target.value);
    if (event.target.value == 'planner') {
      this.isEventPlannerUpdate = true
      this.isEventVendorUpdate = false
      console.log("hear about message", this.hearAboutMessage)
    } else if (event.target.value == 'vendor') {
      this.isEventVendorUpdate = true
      this.isEventPlannerUpdate = false
    } else {
      let updateHear = {
        aboutType: event.target.value
      }
      console.log("this else part is call or not");
      this.isEventPlannerUpdate = false
      this.isEventVendorUpdate = false
      this.setPriceForm.patchValue({
        hearAbout: updateHear
      })
      this.setPriceForm.get('hearAbout').updateValueAndValidity()
      console.log("value of set price of hear about after update", this.setPriceForm.value);
      if (this.aboutTypeOf) {
        console.log("ca;ll this or not");
        this.aboutTypeOf = updateHear
        console.log("change type", this.aboutTypeOf);
      }
    }
  }

  plannerValue(event) {
    console.log("planner value", event.target.value);
    let hearAbout = {
      aboutType: 'planner',
      message: event.target.value
    }
    this.setPriceForm.patchValue({
      hearAbout: hearAbout
    })
    this.setPriceForm.get('hearAbout').updateValueAndValidity()
  }

  updatePlannerValue(event) {
    console.log("call or not", this.hearAboutMessage);

    this.aboutTypeOf = this.aboutTypeOf
  }


  updateVendorValue(event) {
    console.log("call or not", this.hearAboutMessage);
    this.aboutTypeOf = this.aboutTypeOf
  }


  vendorValue(event) {
    let hearAbout = {
      aboutType: 'vendor',
      message: event.target.value
    }
    this.setPriceForm.patchValue({
      hearAbout: hearAbout
    })
    this.setPriceForm.get('hearAbout').updateValueAndValidity()
  }

  skipButton() {
    this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) + 1);
  }


  backToGroup() {
    this.router.navigate(['/eventGroup/' + this.eventId])
  }
}
