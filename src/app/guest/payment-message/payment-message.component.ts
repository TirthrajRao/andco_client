import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-payment-message',
  templateUrl: './payment-message.component.html',
  styleUrls: ['./payment-message.component.css', './../payment/payment.component.css']
})
export class PaymentMessageComponent implements OnInit {
  @Input('thankYouDetail') displayFinalMessage
  finalTotal
  createrName
  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("changes of final step", changes)
    if (changes.displayFinalMessage.currentValue) {
      this.finalTotal = changes.displayFinalMessage.currentValue.finalTotal
      this.createrName = changes.displayFinalMessage.currentValue.createrName
    }

  }

}
