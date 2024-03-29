import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../../services/event.service';
declare var $;
@Component({
  selector: 'app-guest-address',
  templateUrl: './guest-address.component.html',
  styleUrls: ['./guest-address.component.css']
})
export class GuestAddressComponent implements OnInit {
  @Output() displayAccount: EventEmitter<any> = new EventEmitter<any>()
  @Output() backToCart: EventEmitter<any> = new EventEmitter<any>()
  addressForm: FormGroup;
  addressDetails
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  addressPattern = /[*\\/|":?><]/gi
  guestName = "^[a-zA-Z \-\']+"
  flag = 0
  isLoad = false
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {

    this.getAddressDetails()

    this.addressForm = new FormGroup({
      deliverName: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      deliverDays: new FormControl('', [Validators.required]),
      timePeriod: new FormControl('', [Validators.required])
    })
  }

  getAddressDetails() {
    this.addressDetails = JSON.parse(localStorage.getItem('addressDetails'))
    // this.isLoad = true
    // this.eventService.getAddressDetails().subscribe((response: any) => {
    //   // this.isLoad = false
    //   console.log("response of address if", response);
    //   if (response.response.sendData) {
    //     this.addressDetails = response.response.sendData
    //   }
    // }, error => {
    //   // this.isLoad = false
    //   console.log("error while get address", error)
    // })
  }


  /**
   * Display error message for address form
   */
  get f() { return this.addressForm.controls; }

  enterAddress() {
    // this.isLoad = true
    console.log("form value of cart", this.addressForm.value);
    localStorage.setItem('addressDetails', JSON.stringify(this.addressForm.value))
    this.displayAccount.emit(4)
    // this.eventService.enterAddress(this.addressForm.value).subscribe((response) => {
    //   console.log("response of enter address", response);
    // }, error => {
    //   this.isLoad = false
    //   console.log("error while enter address", error)
    // })
  }

	/**
	 * @param form {phone no}
	 * Phone no validation 
	 */
  validatePhone(form) {
    console.log(form);
    var phoneno = /[0-9]/;
    var message = document.getElementById('message');
    if (!form.phone.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";
    }
  }

  backToDonation() {
    console.log("call this or not")
    // this.displayAccount.emit(2)
    this.backToCart.emit(7)
  }
}
