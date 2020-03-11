import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var $;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Output() accountType: EventEmitter<any> = new EventEmitter<any>()
  @Output() index: EventEmitter<any> = new EventEmitter<any>()
  isDisable
  constructor() { }

  ngOnInit() {
  }


  finalPayment() {
    let type = $('input[name="radio2"]:checked').val();
    console.log("selected bank type", type);
    this.accountType.emit({ type: type, index: 5 })
  }

  onChange(event) {
    let type = $('input[name="radio2"]:checked').val();
    if (type != undefined) {
      this.isDisable = true
    } else {
      this.isDisable = false
    }
  }
  displayAddress() {
    this.index.emit(3)
  }
}
