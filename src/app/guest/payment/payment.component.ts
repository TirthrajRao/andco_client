import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
declare var $;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Output() accountType: EventEmitter<any> = new EventEmitter<any>()
  @Output() index: EventEmitter<any> = new EventEmitter<any>()
  private sub: any
  private hashTag: any
  isDisable
  displayTotal
  constructor(
    public activated: ActivatedRoute,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.sub = this.activated.params.subscribe(param => {
      this.hashTag = param.hashTag
    })
    this.getTotalOfItems()

  }


  getTotalOfItems() {
    this.eventService.getTotalOfCart(this.hashTag).subscribe((response: any) => {
      console.log("total of all items", response);
      this.displayTotal = response.data
    }, error => {
      console.log("error while get total", error)
    })
  }

  finalPayment() {
    let type = $('input[name="radio2"]:checked').val();
    console.log("selected bank type", type);
    this.accountType.emit({ type: type, index: 5, finalTotal: this.displayTotal })
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
