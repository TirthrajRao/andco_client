import { Component, OnInit, EventEmitter, Output, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-gift-donation',
  templateUrl: './gift-donation.component.html',
  styleUrls: ['./gift-donation.component.css']
})
export class GiftDonationComponent implements OnInit {
  @Output() displayItem: EventEmitter<any> = new EventEmitter<any>()
  @Output() address: EventEmitter<any> = new EventEmitter<any>()
  private sub: any
  private hashTag: any
  eventId
  allCartList: any = []
  grandTotal = 0;
  subTotal;
  finalGrandTotal;
  donation
  constructor(
    public activated: ActivatedRoute,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.sub = this.activated.params.subscribe(param => {
      console.log("hashtag ", param);
      this.hashTag = param.hashTag
    })
    // this.getCartItrems()
    this.getDonationAmount()
  }

  ngOnChanges(changes: SimpleChange) {
    this.sub = this.activated.params.subscribe(param => {
      console.log("hashtag ", param);
      this.hashTag = param.hashTag
    })
    // this.getCartItrems()
    this.getDonationAmount()
  }


  displayItems() {
    this.displayItem.emit(1)
  }

  displayAddress() {
    console.log("donation added", this.donation)
    // let myCart = {
    //   orderDetails: this.allCartList,
    //   finalTotal: this.finalGrandTotal,
    //   eventId: this.eventId,
    //   donationAmount: this.donation,
    // }
    let addDonation = {
      eventId: this.hashTag,
      donation: this.donation,
    }
    this.eventId
    this.eventService.addDonation(addDonation).subscribe((response) => {
      console.log("final cart with total", response);
      this.address.emit(3)
    }, error => {
      console.log("error while enter final payment", error)
    })
  }

  getDonationAmount() {
    this.eventService.getDonationAmount(this.hashTag).subscribe((response: any) => {
      console.log("donation if hoy", response);
      if (response && response.data) {
        this.donation = response.data.donation
      }
    }, error => {
      console.log("error while get donation", error)
    })
  }


  getCartItrems() {
    this.eventService.getCartItems(this.hashTag).subscribe((response: any) => {
      console.log("response of cart item", response);
      this.allCartList = response.data.cartList
      this.eventId = response.data.eventDetail._id
      // this.allCartList.forEach((item: any) => {
      //   console.log("single items of cart", item)
      //   this.subTotal = item.itemPrice * item.quantity
      //   this.grandTotal = this.grandTotal + this.subTotal
      //   this.finalGrandTotal = this.grandTotal
      // });
    }, error => {
      console.log("error while get cart list", error)
    })
  }


}
