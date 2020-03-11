import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gift-donation',
  templateUrl: './gift-donation.component.html',
  styleUrls: ['./gift-donation.component.css']
})
export class GiftDonationComponent implements OnInit {
  @Output() displayItem: EventEmitter<any> = new EventEmitter<any>()
  @Output() address: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }


  displayItems() {
    this.displayItem.emit(1)
  }

  displayAddress() {
    this.address.emit(3)
  }

}
