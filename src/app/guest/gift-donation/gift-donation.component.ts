import { Component, OnInit, EventEmitter, Output, SimpleChange, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-gift-donation',
  templateUrl: './gift-donation.component.html',
  styleUrls: ['./gift-donation.component.css']
})
export class GiftDonationComponent implements OnInit {
  @Input('cartLength') cartItems
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
  isLoad = false
  constructor(
    public activated: ActivatedRoute,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.sub = this.activated.params.subscribe(param => {
      console.log("hashtag ", param);
      this.hashTag = param.hashTag
    })
    this.getDonationAmount()
  }

  ngOnChanges(changes: SimpleChange) {
    console.log("cahnges of cart items", changes);

    this.sub = this.activated.params.subscribe(param => {
      console.log("hashtag ", param);
      this.hashTag = param.hashTag
    })
    this.getDonationAmount()
  }


  displayItems() {
    this.displayItem.emit(1)
  }

  displayAddress() {
    console.log("donation added", this.donation)
    this.isLoad = true
    let addDonation = {
      eventId: this.hashTag,
      donation: this.donation,
    }
    this.eventId
    this.eventService.addDonation(addDonation).subscribe((response) => {
      console.log("final cart with total", response);
      this.address.emit(3)
      // this.isLoad = false
    }, error => {

      this.isLoad = false
      console.log("error while enter final payment", error)
    })
  }

  getDonationAmount() {
    this.isLoad = true
    this.eventService.getDonationAmount(this.hashTag).subscribe((response: any) => {
      console.log("donation if hoy", response);
      if (response && response.data) {
        this.donation = response.data.donation
      }
      this.isLoad = false
    }, error => {

      this.isLoad = false
      console.log("error while get donation", error)
    })
  }
}
