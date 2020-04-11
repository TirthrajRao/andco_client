import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
declare var $;

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css', './../createEvent/set-price/set-price.component.css']
})
export class AddBankAccountComponent implements OnInit {

  bankForm: FormGroup;
  cardNumberForm: FormGroup;
  isDisable = false
  isLoad = false
  cardNumber = "^[0-9]*$"
  bankName = "^[a-zA-Z \-\']+"
  bankList = []
  cardList = []
  $sliderContainer
  $slider
  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.getBankDetails()
    this.initBankSlider()
    this.initCardSlider()
    this.bankForm = new FormGroup({
      bankName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
    })
    this.cardNumberForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.min(3)])
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



  /**
   * Display error message
   */
  get f() { return this.bankForm.controls; }


  /**
   * Display error message for address form
   */
  get g() { return this.cardNumberForm.controls; }


  getBankDetails() {
    this.loginService.getBankDetails().subscribe((response: any) => {
      console.log("details of bank", response);
      this.bankList = response.data.bankDetail
      this.cardList = response.data.cardDetails
      if (this.bankList) {
        this.$sliderContainer = $('.bank-slider');
        this.$sliderContainer.slick('unslick');
        setTimeout(() => {
          this.initBankSlider()
        }, 50)
      }
      if (this.cardList) {
        this.$sliderContainer = $('.card-slider');
        this.$sliderContainer.slick('unslick');
        setTimeout(() => {
          this.initCardSlider()
        }, 50)
      }

    }, error => {
      console.log("error while get details", error);

    })
  }


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
    }
  }
  addBankDetails() {
    $('#exampleModalCenter').modal("hide")
    this.isLoad = true
    console.log("bank accoutn form ", this.bankForm.value);
    this.loginService.addBankAccount(this.bankForm.value).subscribe((response: any) => {
      console.log("account added", response);
      this.getBankDetails()
      this.isLoad = false
      this.bankForm.reset()
    }, error => {
      console.log("error while add account", error);
      this.isLoad = false
    })
  }

  addCardDetails() {
    $('#exampleModalCard').modal("hide")
    this.isLoad = true
    this.loginService.addCardAccount(this.cardNumberForm.value).subscribe((response) => {
      console.log("response of card added", response);
      this.getBankDetails()
      this.isLoad = false
      this.cardNumberForm.reset()
    }, error => {
      console.log("error while add card", error);
    })
  }


}
