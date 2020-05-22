import { Component, OnInit, EventEmitter } from '@angular/core';
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
import { element } from 'protractor';
import { timezone } from '../../timezone';
// import{} from '../../config'


@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.css']
})
export class SetPriceComponent implements OnInit {
  // timeChanged: EventEmitter<string> 

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
  time = this.currentDay.getHours() + ":" + this.currentDay.getMinutes()
  setPriceDetails
  hearAboutMessage
  vendorMessage
  aboutTypeOf
  selectedAccount
  selectedCardAccount
  totalAccount
  newTime
  default
  isBack = false
  isDisableNext = false
  selectedPaymentTransferDate: string;
  backButtonIndex = 0
  saveEvent = false
  currentSlideIndex
  nextSlideIndex
  backSlider = false
  displayTimeZone = timezone
  selectedTimeZone
  defaultTimeZone
  onlyDisplay = false
  displayTime = false
  constructor(
    public alertService: AlertService,
    public eventService: EventService,
    public loginService: LoginService,
    private router: Router,
    private activated: ActivatedRoute
  ) { }

  ngOnInit() {


    console.log("value of timezone", this.timezone)
    // get Curren Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("what is the current position of user", position);
        let location = []
        location[0] = position.coords.latitude
        location[1] = position.coords.longitude
        // this.loginService.getTimeZone(location).subscribe((response) => {
        //   console.log("response of user", response)
        // })
        // var newOne = position.timestamp
        var d = new Date(position.timestamp);
        let time = d.getHours() + ":" + d.getMinutes()
        console.log("whats is the current time", time);
        // var d1 = new Date(1588428253);
        var n = d.getTimezoneOffset() / -60;
        console.log("what is value ===========", n)
        let check = this.displayTimeZone.filter(x =>
          x.offset == n
        )
        // setTimeout(() => {

        this.defaultTimeZone = check[0].text
        // }, 100)
        console.log("check by all list", check);
        console.log("check by direct=========", this.defaultTimeZone);
      });
    } else {
      // alert("Geolocation is not supported by this browser.");
    }




    console.log("value of timezone", this.displayTimeZone)
    this.isDisableNext = true
    if (this.backButtonIndex == 0) {
      this.isBack = true
    }
    console.log("what is current time", this.time);

    this.getBankDetails()
    this.loginService.sharedBankDetails.subscribe(response => {
      console.log("when click on plus ", response);
    })

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // console.log("link of event======", this.eventLink);

    this.setPriceForm = new FormGroup({
      welcomeMessage: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9 _ . , ! \" ? '']+$")]),
      thankyouMessage: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9 _ . , ! ? '']+$")]),
      payMentTransferDate: new FormControl('', [Validators.required]),
      isLogistics: new FormControl('', [Validators.required]),
      paymentDeadlineDate: new FormControl('', [Validators.required]),
      paymentDeadlineTime: new FormControl('', [Validators.required]),
      bankDetails: new FormControl(''),
      hearAbout: new FormControl('', [Validators.required]),
      linkOfEvent: new FormControl(''),
      message: new FormControl(''),
      vendorMessage: new FormControl(''),
      regestery: new FormControl(''),
      timeZoneSelect: new FormControl(''),
      defaultTime: new FormControl('')
    })
    this.sub = this.activated.params.subscribe(param => {
      this.eventId = param.id
      this.getSetPriceDetailsOfEvent(this.eventId)
    })
    this.initSlickSlider()
    // console.log("time zone ", this.timezone);
  }

  getBankDetails() {
    this.isLoad = true
    this.loginService.getBankDetails().subscribe((response: any) => {
      console.log("details of bank", response);
      this.totalAccount = response.data
      // this.bankTotal = response.data.bankDetail
      // this.cardTotal = response.data.cardDetails
    }, error => {
      this.isLoad = false
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
      arrows: false,
      fade: true,
      swipe: false,
      // prevArrow: '<button type="button" class="prevarrow">Back</button>',
      // nextArrow: '<button type="button" class="nextarrow" (click)="nextArrowClick($event)">Next</button>',

    })

    this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide, previousSlide) => {
      // console.log("event on before", event);
      this.previousSlide(currentSlide, nextSlide)
    })
  }


  previousSlide(current, next) {
    console.log("current slide and next slider every time==========", current, next);

    this.currentSlideIndex = current
    this.nextSlideIndex = next
    // if (this.currentSlideIndex) {
    //   this.backSlider = false
    // }
    if (!this.setPriceDetails) {
      this.isDisableNext = true
    }
    if ((current == 0 && next == 1)) {
      console.log("call this or not");

      this.isBack = false
    }
    if ((current == 0 && next == 1) && ((this.setPriceForm.controls.welcomeMessage.status == 'VALID' && this.setPriceForm.controls.thankyouMessage.status == 'VALID'))) {
      this.isDisableNext = false
    }
    if ((current == 2 && next == 3) && (this.setPriceForm.controls.payMentTransferDate.status == 'VALID')) {
      this.isDisableNext = false
    }
    if ((current == 3 && next == 4) && (this.setPriceForm.controls.isLogistics.status == 'VALID')) {
      this.isDisableNext = false
    }
    if ((current == 4 && next == 5)) {
      this.displayTime = true
      // && ((this.setPriceForm.controls.paymentDeadlineDate.status == 'VALID' && this.setPriceForm.controls.paymentDeadlineTime.status == 'VALID'))
      if (this.setPriceForm.controls.paymentDeadlineDate.status == 'INVALID' && this.setPriceDetails) {
        // console.log("this is what i want============");
        // console.log("this is for when date is past");
        // console.log("when slider is called ===========", this.setPriceDetails.paymentDeadlineDate);
        // console.log("Date.now for today============", this.currentDay);

        if (moment(this.currentDay) > moment(this.setPriceDetails.paymentDeadlineDate)) {
          this.isDisableNext = true
          this.onlyDisplay = true
        }
        else {
          this.isDisableNext = false
        }

      }
      if (this.setPriceForm.controls.paymentDeadlineDate.status == 'VALID' && this.setPriceForm.controls.paymentDeadlineTime.status == 'VALID') {
        this.isDisableNext = false
      }
      //  else {
      //   // console.log();
      //   this.isDisableNext = false
      //   console.log("this is normal for close one");

      // }
      // this.isDisableNext = false
    }
    if (current == 5 && next == 6) {
      this.isDisableNext = false
    }
    if ((current == 1 && next == 0) && !this.setPriceDetails) {
      this.isBack = true
    }
    if (current == 6 && next == 7) {
      console.log("for edit price details", this.setPriceForm);

      this.saveEvent = true
      this.isDisable = false
    } else {
      this.saveEvent = false
    }
  }

  welcomeMessageEnter(event) {
    console.log("what is in event", event.target.value);
    if (this.setPriceForm.controls.welcomeMessage.status == 'VALID' && this.setPriceForm.controls.thankyouMessage.status == 'VALID') {
      console.log("call this ");
      this.setPriceForm.patchValue({
        welcomeMessage: event.target.value
      })
      this.setPriceForm.get('welcomeMessage').updateValueAndValidity()
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
  }

  thankyouMessageEnter(event) {
    if (this.setPriceForm.controls.welcomeMessage.status == 'VALID' && this.setPriceForm.controls.thankyouMessage.status == 'VALID') {
      // console.log("call this ");
      this.setPriceForm.patchValue({
        thankyouMessage: event.target.value
      })
      this.setPriceForm.get('thankyouMessage').updateValueAndValidity()
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
  }

  paymentDate(event) {
    // console.log("payment close date", event);
    if (this.onlyDisplay == true) {
      console.log("check to old data=========", this.onlyDisplay);
      this.onlyDisplay = false
    }
    if (this.setPriceForm.controls.paymentDeadlineDate.status == 'VALID' && this.setPriceForm.controls.paymentDeadlineTime.status == 'VALID') {
      console.log("this is perfect");
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }

  }

  timeChanged(event) {
    console.log("event of timer", event);

  }

  closeEvent() {
    console.log("now it want to call");

    if (this.setPriceForm.controls.paymentDeadlineDate.status == 'VALID' && this.setPriceForm.controls.paymentDeadlineTime.status == 'VALID') {
      console.log("this is perfect");
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
  }

  nextSlide() {
    this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) + 1);
    this.backButtonIndex = 1
    if (this.backButtonIndex == 1) {
      this.isBack = false
    }
  }


  backToGroup() {
    console.log("what is the value of slide", this.currentSlideIndex, this.nextSlideIndex)
    console.log("form is ");

    // this.router.navigate(['/eventGroup/' + this.eventId])
    if (!this.setPriceDetails) {
      this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) - 1);
      this.isDisableNext = false
    }
    if (this.setPriceDetails && (this.currentSlideIndex == undefined && this.nextSlideIndex == undefined)) {
      this.router.navigate(['/eventGroup/', this.eventId])
    }
    // if (this.setPriceDetails && (this.currentSlideIndex == 2 && this.nextSlideIndex == 1)) {
    //   this.router.navigate(['/eventGroup/', this.eventId])
    // }
    if (this.setPriceDetails && (this.currentSlideIndex == 1 && this.nextSlideIndex == 0)) {
      this.router.navigate(['/eventGroup/', this.eventId])
    }
    if (this.setPriceDetails) {
      this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) - 1);
      this.isDisableNext = false
    }
    // if (this.setPriceDetails && this.backSlider == true) {
    //   this.router.navigate(['/eventGroup/', this.eventId])
    // }
    // if (this.setPriceDetails && this.backSlider == false) {
    //   this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) - 1);
    //   // this.backSlider = false
    // }
  }

  loaderStart(event) {
    if (event == 'true') {
      console.log("what is event from bank page========", event);
      this.isLoad = true
    }
    if (event == 'false') {
      this.isLoad = false
    }
    // else {
    //   this.isLoad = false
    // }


  }


  getSetPriceDetailsOfEvent(eventId) {
    this.eventService.getPriceOfEvent(eventId).subscribe((response: any) => {
      console.log("response of set price", response);
      this.isLoad = false
      // this.setPriceDetails = ''
      if (response.welcomeMessage) {
        this.backSlider = true
        this.isDisableNext = false
        this.isBack = false
        this.setPriceDetails = response
        this.isDisable = false
        console.log("response of set price", this.setPriceDetails);
        this.selectedTimeZone = this.setPriceDetails.timeZoneSelect
        console.log("value of set price", this.selectedTimeZone);

        if (this.setPriceDetails.bankAccount != null) {
          console.log("call for bank account");
          this.selectedAccount = this.setPriceDetails.bankAccount
        }
        if (this.setPriceDetails.cardAccount != null) {
          this.selectedCardAccount = this.setPriceDetails.cardAccount
        }
        let selectedLogistics = this.setPriceDetails.isLogistics
        if (selectedLogistics) {
          this.setPriceForm.patchValue({
            isLogistics: selectedLogistics
          });
          this.setPriceForm.get('isLogistics').updateValueAndValidity();
        }
        this.aboutTypeOf = this.setPriceDetails.hearAbout
        // console.log("if about type is selected or not", this.aboutTypeOf);
        if (this.setPriceDetails.payMentTransferDate == 'true') {
          $('input:radio[id="test5"]').prop('checked', true);
          this.setPriceForm.patchValue({
            payMentTransferDate: this.setPriceDetails.payMentTransferDate
          });
          this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
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
          this.setPriceForm.patchValue({
            payMentTransferDate: this.setPriceDetails.payMentTransferDate
          });
          this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
          // this.isTransfer = true
          this.isPayment = true
        }
        if (this.setPriceDetails.regestery == 'true') {
          $('input:radio[id="test1"]').prop('checked', true);
        }
        if (this.setPriceDetails.linkOfEvent) {
          $('input:radio[id="test2"]').prop('checked', true);
          this.isRegestery = true
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
      } else {
        console.log("checck this else ********");

        this.isBack = true
      }
    }, error => {
      this.isLoad = false
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
    if (this.setPriceForm.controls.bankDetails.status == 'VALID') {
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
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
    if (this.setPriceForm.controls.bankDetails.status == 'VALID') {
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
  }
  /**
   * Display error message
   */
  get f() { return this.setPriceForm.controls; }


  changeTime(event) {
    console.log("event of changes time", this.setPriceForm);

    // this.setPriceForm.patchValue({
    //   paymentDeadlineTime: event.target.value
    // })
    // this.setPriceForm.get('paymentDeadlineTime').updateValueAndValidity()


    if (this.setPriceForm.controls.paymentDeadlineDate.status == 'VALID' && this.setPriceForm.controls.paymentDeadlineTime.status == 'VALID') {
      console.log("this is perfect");
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
  }

  selectTimeZone(event) {
    console.log("what is the value of selected time", event);
    this.setPriceForm.patchValue({
      timeZoneSelect: event.target.value
    })
    this.setPriceForm.get('timeZoneSelect').updateValueAndValidity()
  }



  setPrice() {
    console.log("value of form", this.setPriceForm);
    // let message
    this.isLoad = true
    const keys = Object.keys(this.setPriceForm.controls);
    let form = this.setPriceForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      if (form[element].status == 'INVALID') {
        this.isLoad = false
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
        this.isLoad = false
        this.alertService.getSuccess(response.message)
        this.router.navigate(['created-event-message'])
      }, error => {
        this.isLoad = false
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
        // if (form[element].status == 'INVALID') {
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
        } else if (this.setPriceDetails.cardAccount) {
          let obj = {
            _id: this.setPriceDetails.cardAccount._id,
            flag: 'card'
          }

          this.setPriceForm.patchValue({
            bankDetails: obj
          })
          this.setPriceForm.get('bankDetails').updateValueAndValidity()
        }
        // }
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
    console.log("whenn this one is call", this.setPriceForm);

    if (data == 'test5') {
      console.log("this.setPriceForm.controls.payMentTransferDate ==== >>>>>>>", this.setPriceForm.controls.payMentTransferDate)

      this.setPriceForm.patchValue({
        payMentTransferDate: 'true'
      });
      this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
      this.isTransfer = false
      this.isPayment = false
      console.log("payment close date=========", this.setPriceForm);
      if (this.setPriceForm.controls.payMentTransferDate.status == 'VALID') {
        console.log("for transfer");
        this.isDisableNext = false
      } else {
        // if (this.setPriceDetails) {
        //   this.setPriceForm.controls.payMentTransferDate.setValue('true');
        //   console.log("call this else part", this.setPriceForm);
        //   this.isDisableNext = false
        //   this.isPayment = false
        // } else {
        this.isDisableNext = true
        // }
      }
    } else {
      console.log("setPriceDetailssetPriceDetailssetPriceDetailssetPriceDetails", this.setPriceForm)
      if ((this.setPriceDetails && this.setPriceDetails.payMentTransferDate != 'true') && this.setPriceForm.controls.payMentTransferDate.value != 'true') {
        console.log("this is first one to set---------");

        this.isTransfer = false
        this.isPayment = true
        // this.isDisableNext = false
      } else if (this.setPriceForm.controls.payMentTransferDate.value == 'true' && this.setPriceDetails.payMentTransferDate) {
        console.log("this is for perfect to join========", this.setPriceDetails.payMentTransferDate);
        this.isTransfer = false
        this.isPayment = true

        this.setPriceForm.patchValue({
          payMentTransferDate: this.setPriceDetails.payMentTransferDate
        });
        this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
      }
      else {
        console.log("su ave che", data)
        console.log("value of form", this.setPriceForm);
        if (this.setPriceForm.controls.payMentTransferDate.value == 'true' && !this.selectedPaymentTransferDate) {
          console.log("for transfer");
          this.isDisableNext = true
        } else if (this.selectedPaymentTransferDate) {
          this.setPriceForm.patchValue({
            payMentTransferDate: this.selectedPaymentTransferDate
          });
          this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
          this.isDisableNext = false
        }
        else {
          this.isDisableNext = false
        }
        // this.isDisableNext = true
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
      this.isDisableNext = false
    } else {
      if (!this.setPriceDetails) {
        this.isRegestery = true
        this.isDisableNext = true
      } else {
        this.isRegestery = true
        this.isDisableNext = false
      }
    }
  }

  addRegestry(event) {
    console.log("value of event regestry", event.target.value);
    if (event.target.value) {
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }

  }
  getDate(event) {
    // console.log("hello ===>", event.value);
    // moment($(event.value).val()).format('YYYY-MM-DD')
    this.selectedPaymentTransferDate = moment(event.value).format('YYYY-MM-DD')
    this.setPriceForm.patchValue({
      payMentTransferDate: moment(event.value).format('YYYY-MM-DD')
    });
    this.setPriceForm.get('payMentTransferDate').updateValueAndValidity();
    if (this.setPriceForm.controls.payMentTransferDate.status == 'VALID') {
      console.log("for transfer");
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }
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
    if (this.setPriceForm.controls.isLogistics.status == 'VALID') {
      console.log("for logisctics");
      this.isDisableNext = false
    } else {
      this.isDisableNext = true
    }

  }

  onDropDown(event) {
    console.log("selected drop down value", event.target.value);
    if (event.target.value == 'planner') {
      this.isEventPlannerSelected = true
      this.isEventVendorSelected = false
    } else if (event.target.value == 'vendor') {
      console.log("second if");

      this.isEventVendorSelected = true
      this.isEventPlannerSelected = false
    } else {
      console.log("final else condition is call ");

      this.isEventPlannerSelected = false
      this.isEventVendorSelected = false
      let hearAbout = {
        aboutType: event.target.value
      }
      this.setPriceForm.patchValue({
        hearAbout: hearAbout
      })
      this.setPriceForm.get('hearAbout').updateValueAndValidity()
      this.isDisable = false
    }
  }


  updateDropDown(event) {
    console.log("selected drop down value", this.hearAboutMessage);
    if (event.target.value == 'planner') {
      this.isEventPlannerUpdate = true
      this.isEventVendorUpdate = false
      this.isDisable = true
      console.log("hear about message", this.hearAboutMessage)
      if (this.hearAboutMessage != undefined) {
        this.isDisable = false
      }
    } else if (event.target.value == 'vendor') {
      this.isEventVendorUpdate = true
      this.isEventPlannerUpdate = false
      this.isDisable = true
      if (this.vendorMessage != undefined) {
        this.isDisable = false
      }
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
      this.isDisable = false
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
    if (event.target.value) {

      let hearAbout = {
        aboutType: 'planner',
        message: event.target.value
      }
      this.setPriceForm.patchValue({
        hearAbout: hearAbout
      })
      this.setPriceForm.get('hearAbout').updateValueAndValidity()
    } else {
      this.isDisable = true
    }
  }

  updatePlannerValue(event) {
    console.log("call or not", this.hearAboutMessage);

    // this.aboutTypeOf = this.aboutTypeOf
    if (event.target.value) {
      this.aboutTypeOf = this.aboutTypeOf
      this.isDisable = false
    } else {
      this.isDisable = true
    }
  }


  updateVendorValue(event) {
    console.log("call or not", this.hearAboutMessage);
    if (event.target.value) {
      this.aboutTypeOf = this.aboutTypeOf
      this.isDisable = false
    } else {
      this.isDisable = true
    }
  }


  vendorValue(event) {
    if (event.target.value) {
      let hearAbout = {
        aboutType: 'vendor',
        message: event.target.value
      }
      this.setPriceForm.patchValue({
        hearAbout: hearAbout
      })
      this.setPriceForm.get('hearAbout').updateValueAndValidity()
    } else {
      this.isDisable = true
    }
  }

  skipButton() {
    this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) + 1);
  }




  opened(event) {
    console.log("event open caught here !!!!", event);
    let tempTime = new Date()
    console.log("time ", tempTime)
    this.time = tempTime.getHours() + ":" + tempTime.getMinutes() + " pm";
    console.log("after ", this.time)
  }

}
