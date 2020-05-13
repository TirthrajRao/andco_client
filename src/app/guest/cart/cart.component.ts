import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../guest-item-total/guest-item-total.component.css']
})
export class CartComponent implements OnInit {

  @Output() addMore: EventEmitter<any> = new EventEmitter<any>()
  @Output() backDonation: EventEmitter<any> = new EventEmitter<any>()
  @Output() address: EventEmitter<any> = new EventEmitter<any>()

  grandTotal = 0;
  subTotal;
  finalGrandTotal;
  finalData = []
  displayTotal
  finalTotalDisplay
  totalDonation
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.getCartDetails()
  }

  getCartDetails() {

    let totalItem = JSON.parse(localStorage.getItem('allCartList'))
    let donation = JSON.parse(localStorage.getItem('donation'))
    let eventId = localStorage.getItem('eventId')
    this.totalDonation = donation.donation
    this.eventService.getItems(totalItem, eventId).subscribe((response: any) => {
      console.log("response of that evene", response);
      // finalData = []
      this.finalData = response
      this.finalData.forEach((item: any) => {
        // console.log("single items of cart", item)
        this.subTotal = item.itemPrice * item.quantity
        this.grandTotal = this.grandTotal + this.subTotal
        this.finalGrandTotal = this.grandTotal
        this.displayTotal = this.finalGrandTotal
      });

      // console.log("what is the final total", this.finalGrandTotal);
      if (this.displayTotal) {
        this.finalTotalDisplay = this.displayTotal + donation.donation
      } else {
        this.finalTotalDisplay = donation.donation
      }

      // this.isLoad = false
    }, error => {
      console.log("error while get cart list", error)

      // this.isLoad = false
    })

  }

  addMoreItems() {
    this.addMore.emit({ index: 0 })
  }

  backToDonation() {
    this.backDonation.emit(2)
  }
  addAddress() {
    this.address.emit(3)
  }

}
