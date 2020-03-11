import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  bankAccountFrom: FormGroup;
  cardNumberForm: FormGroup;
  ussdForm: FormGroup
  bankName = "^[a-zA-Z \-\']+"
  accountNumber = "^[0-9]*$"
  index = 0
  constructor(
    public eventService: EventService
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

    // this.ussdForm= new FormGroup({

    // })

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("selected type in his component", changes);
    if (changes.accountType.currentValue) {
      this.displaySelectedAccount(changes.accountType.currentValue)
    }
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
    this.eventService.addAccountDetails(finalData , selectedValue).subscribe((response) => {
      console.log("response of bank details added", response);
    }, error => {
      console.log("error while add account ", error)
    })

  }
}
