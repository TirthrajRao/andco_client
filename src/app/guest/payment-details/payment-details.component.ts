import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css', './../payment/payment.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Input('accountType') accountType
  @Output() lastIndex: EventEmitter<any> = new EventEmitter<any>()
  index = 0
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("selected type in his component", changes);
    if (changes.accountType.currentValue) {
      this.displaySelectedAccount(changes.accountType.currentValue)
    }
  }

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
}
