import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css', './../payment/payment.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  @Input('accountType') accountType
  @Output() lastIndex: EventEmitter<any> = new EventEmitter<any>()
  @Output() thankYouDetails: EventEmitter<any> = new EventEmitter<any>()
  private sub: any
  private hashTag: any
  bankAccountFrom: FormGroup;
  cardNumberForm: FormGroup;
  ussdForm: FormGroup
  bankName = "^[a-zA-Z \-\']+"
  accountNumber = "^[0-9]*$"
  displayTotal
  accountDetails
  cartList = []
  itemList = []
  grandTotal = 0;
  subTotal;
  finalGrandTotal;
  eventId
  index = 0
  donation: any;
  isDiable = false
  isLoad = false
  constructor(
    public eventService: EventService,
    public activated: ActivatedRoute
  ) { }

  ngOnInit() {

    this.bankAccountFrom = new FormGroup({
      bankName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)])
    })

    this.cardNumberForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.min(3)])
    })

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("selected type in his component", changes);
    if (changes.accountType.currentValue) {
      this.displaySelectedAccount(changes.accountType.currentValue.type)
      this.displayTotal = changes.accountType.currentValue.total
      this.donation = changes.accountType.currentValue.donation
    }
    console.log("donation of event", this.donation)
    this.sub = this.activated.params.subscribe(param => {
      this.hashTag = param.hashTag
    })
    this.getItemDetails()
    this.getAccountDetails(changes.accountType.currentValue.type)
  }

  getItemDetails() {
    this.isLoad = true
    this.eventService.getCartItems(this.hashTag).subscribe((response: any) => {
      console.log("response of cart list", response);
      this.cartList = response.data.cartList
      this.eventId = response.data.eventDetail._id
      this.cartList.forEach((item: any) => {
        console.log("single items of cart", item)
        this.subTotal = item.itemPrice * item.quantity
        this.grandTotal = this.grandTotal + this.subTotal
        this.finalGrandTotal = this.grandTotal
      });
    }, error => {
      console.log("error while get cart details", error)
    })
  }


  getAccountDetails(accountType) {
    this.eventService.getAccountDetails(accountType).subscribe((response: any) => {
      console.log("response of account details", response);
      this.accountDetails = response.data[0]
      this.isLoad = false
    }, error => {
      console.log("error while get acccount details", error);

    })
  }


  /**
   * Display error message for address form
   */
  get f() { return this.bankAccountFrom.controls; }

  /**
   * Display error message for address form
   */
  get g() { return this.cardNumberForm.controls; }

  displaySelectedAccount(selectedAccount) {
    if (selectedAccount == 'account') {
      this.index = 0
    }
    if (selectedAccount == 'card') {
      this.index = 1
    }
    if (selectedAccount == 'ussd') {
      this.index = 2
    }
  }
  displayType() {
    this.lastIndex.emit(4)
  }

  finalPayment() {
    console.log("let donation details", this.donation)
    let finalDonation
    if (this.donation == undefined) {
      finalDonation = 0
    } else {
      finalDonation = this.donation
    }
    this.isDiable = true
    // this.isLoad = true
    let myCart = {
      orderDetails: this.cartList,
      finalTotal: this.finalGrandTotal,
      eventId: this.eventId,
      donationAmount: finalDonation,
    }
    console.log("index of page", this.index);
    let finalData
    let selectedValue = false
    if (this.index == 0) {
      console.log("first bank details", this.bankAccountFrom.value);
      finalData = this.bankAccountFrom.value
      selectedValue = false
    }
    if (this.index == 1) {
      console.log("second card details", this.cardNumberForm.value);
      finalData = this.cardNumberForm.value
      selectedValue = true
    }
    console.log("what is final ", myCart);

    this.eventService.addAccountDetails(finalData, selectedValue, myCart).subscribe((response: any) => {
      console.log("response of payment completed", response);
      this.thankYouDetails.emit({ message: response.data, index: 6 })
      this.isLoad = false
    }, error => {
      console.log("error while add account ", error)
      this.isDiable = false
    })
  }
}
