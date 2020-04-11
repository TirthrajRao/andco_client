import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

declare var $: any
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css', './../set-price/set-price.component.css', './../../add-bank-account/add-bank-account.component.css']
})
export class BankDetailsComponent implements OnInit {

  @Input('accountDetails') accountDetails
  @Output() bankDetails: EventEmitter<any> = new EventEmitter<any>()
  bankForm: FormGroup;
  isBankSelected
  isCardSelected
  displayDetails
  $sliderContainer
  $slider
  bankList = []
  cardList = []

  constructor(
    private _change: ChangeDetectorRef,
    public loginService: LoginService

  ) { }

  ngOnInit() {



    this.getBankDetails()
    this.initBankSlider()
    this.initCardSlider()

    // $(document).ready(function () {
    //   let checked = $('input[name="radio2"]:checked').val();
    // console.log("value of checked", checked)
    //   if (checked == 'on') {
    //     this.isBankSelected = true
    //     this.isCardSelected = false
    //   }
    // })

    this.bankForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_ ]*$")]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)])
    })
  }



  initBankSlider() {
    this.$sliderContainer = $('.bank-slider')
    this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '#prevarrow',
      nextArrow: '#nextarrow',
    })
  }


  initCardSlider() {
    this.$sliderContainer = $('.card-slider')
    this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '#prevarrow1',
      nextArrow: '#nextarrow1',
    })
  }

  getBankDetails() {
    this.loginService.getBankDetails().subscribe((response: any) => {
      console.log("details of bank", response);
      this.bankList = response.data.bankDetail
      this.cardList = response.data.cardDetails
    }, error => {
      console.log("error while get details", error);

    })
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("change when edit bank details", changes);
    if (changes.accountDetails && changes.accountDetails.currentValue) {
      this.displayAccountDetails(changes.accountDetails.currentValue)
    }
  }

  displayAccountDetails(details) {
    console.log("details", details);
    this.displayDetails = details
    console.log("bank details for send data", this.bankDetails);

    if (this.displayDetails.bankName) {
      this.isBankSelected = true
      $('input:radio[id="test3"]').prop('checked', true);
      // this.bankForm.patchValue({
      //   bankName: this.displayDetails.bankName
      // });
      // this.bankForm.get('bankName').updateValueAndValidity();

      // this.bankForm.patchValue({
      //   accountNumber: this.displayDetails.accountNumber
      // });
      // this.bankForm.get('accountNumber').updateValueAndValidity();
      // this.bankDetails.emit(this.bankForm.value)
    } else {
      $('input:radio[id="test4"]').prop('checked', true);

      // this.bankForm.patchValue({
      //   cardNumber: this.displayDetails.cardNumber
      // });
      // this.bankForm.get('cardNumber').updateValueAndValidity();
      // this.bankDetails.emit(this.bankForm.value)
      this.isCardSelected = true
    }
  }



  changeBankName($event, details) {
    console.log("details of bank ", details);
    this.bankDetails.emit(details)
    console.log("=================", this.bankDetails);

  }




  /**
   * Display error message
   */
  get f() { return this.bankForm.controls; }

  addNumber(event, form) {
    // console.log("logs of number", event.target.value);
    var field1 = (<HTMLInputElement>document.getElementById("accountNumber")).value;
    let message = document.getElementById('message2');
    // console.log(field1);
    if (/[a-zA-Z]/g.test(field1)) {
      message.innerHTML = "Please enter only numbers"
    }
    else if (!(/[0-9]{16}/.test(field1))) {
      // this.isDisable = true;
      // console.log("Please enter valid number");
      if (field1.length < 16) {
        message.innerHTML = "Please enter 16 digit number";
      }
    } else {
      message.innerHTML = ""
      // this.isDisable = false;
      // console.log("Valid entry");
      if (event.target.value.length == 16) {
        // console.log("ama ave ");
        this.bankDetails.emit(this.bankForm.value)
      }
    }
  }


  enterCard(event) {
    // console.log("when enter card number", event.target.value);
    var field1 = (<HTMLInputElement>document.getElementById("cardNumber")).value;
    let message = document.getElementById('message3');
    // console.log(field1);
    if (/[a-zA-Z]/g.test(field1)) {
      message.innerHTML = "Please enter only numbers"
    }
    else if (!(/[0-9]{16}/.test(field1))) {
      // this.isDisable = true;
      // console.log("Please enter valid number");
      if (field1.length < 16) {
        message.innerHTML = "Please enter 16 digit number";
      }
    } else {
      message.innerHTML = ""
      // this.isDisable = false;
      // console.log("Valid entry");
      if (event.target.value.length == 16) {
        // console.log("ama ave ");
        this.bankDetails.emit(this.bankForm.value)
      }
    }
  }


  bankSelect() {
    this.isBankSelected = true
    this.isCardSelected = false
    this.$sliderContainer = $('.bank-slider');
    this.$sliderContainer.slick('unslick');
    setTimeout(() => {
      this.initBankSlider()
    }, 50)
    // this.initBankSlider()
    // console.log("this.isBankSelected", this.isBankSelected);
    // this._change.detectChanges()

  }
  addBankAccount() {
    console.log("call this");
    this.loginService.nextBankDetails('bank')
    // console.log("what is in data", data);

  }

  cardSeleced() {
    this.isCardSelected = true
    this.isBankSelected = false
    this.$sliderContainer = $('.card-slider');
    this.$sliderContainer.slick('unslick');
    setTimeout(() => {
      this.initCardSlider()
    }, 50)
  }
}
