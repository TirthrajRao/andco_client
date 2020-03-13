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
  index = 0
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
    }
    this.sub = this.activated.params.subscribe(param => {
      this.hashTag = param.hashTag
    })
    this.getItemDetails()
    this.getAccountDetails(changes.accountType.currentValue.type)
  }

  getItemDetails() {
    this.eventService.getCartItems(this.hashTag).subscribe((response: any) => {
      console.log("response of cart list", response);
      this.cartList = response.data.cartList
    }, error => {
      console.log("error while get cart details", error)
    })
  }


  getAccountDetails(accountType) {
    this.eventService.getAccountDetails(accountType).subscribe((response: any) => {
      console.log("response of account details", response);
      this.accountDetails = response.data
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
    this.eventService.addAccountDetails(finalData, selectedValue, this.cartList).subscribe((response) => {
      console.log("response of bank details added", response);
    }, error => {
      console.log("error while add account ", error)
    })

  }
}
