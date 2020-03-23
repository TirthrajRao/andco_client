import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

declare var $: any
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css', './../set-price/set-price.component.css']
})
export class BankDetailsComponent implements OnInit {

  @Input('accountDetails') accountDetails
  @Output() bankDetails: EventEmitter<any> = new EventEmitter<any>()
  bankForm: FormGroup;
  isBankSelected
  isCardSelected
  displayDetails


  constructor(
    private _change: ChangeDetectorRef
  ) { }

  ngOnInit() {

    // $(document).ready(function () {
    //   let checked = $('input[name="radio2"]:checked').val();
    // console.log("value of checked", checked)
    //   if (checked == 'on') {
    //     this.isBankSelected = true
    //     this.isCardSelected = false
    //   }
    // })

    this.bankForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]+$")]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)])
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change when edit bank details", changes);
    if (changes.accountDetails && changes.accountDetails.currentValue) {
      this.displayAccountDetails(changes.accountDetails.currentValue)
    }
  }

  displayAccountDetails(details) {
    console.log("details", details);
    this.displayDetails = details
    if (this.displayDetails.bankName) {
      this.isBankSelected = true
      $('input:radio[id="test3"]').prop('checked', true);
    } else {
      $('input:radio[id="test4"]').prop('checked', true);
      this.isCardSelected = true
    }
  }




  /**
   * Display error message
   */
  get f() { return this.bankForm.controls; }

  addNumber(event, form) {
    // console.log("logs of number", event.target.value);
    var field1 = (<HTMLInputElement>document.getElementById("accountNumber")).value;
    let message = document.getElementById('message2');
    // console.log(field1);
    if (/[a-zA-Z]/g.test(field1)) {
      message.innerHTML = "Please enter only numbers"
    }
    else if (!(/[0-9]{16}/.test(field1))) {
      // this.isDisable = true;
      // console.log("Please enter valid number");
      if (field1.length < 16) {
        message.innerHTML = "Please enter 16 digit number";
      }
    } else {
      message.innerHTML = ""
      // this.isDisable = false;
      // console.log("Valid entry");
      if (event.target.value.length == 16) {
        // console.log("ama ave ");
        this.bankDetails.emit(this.bankForm.value)
      }
    }
  }


  enterCard(event) {
    // console.log("when enter card number", event.target.value);
    var field1 = (<HTMLInputElement>document.getElementById("cardNumber")).value;
    let message = document.getElementById('message3');
    // console.log(field1);
    if (/[a-zA-Z]/g.test(field1)) {
      message.innerHTML = "Please enter only numbers"
    }
    else if (!(/[0-9]{16}/.test(field1))) {
      // this.isDisable = true;
      // console.log("Please enter valid number");
      if (field1.length < 16) {
        message.innerHTML = "Please enter 16 digit number";
      }
    } else {
      message.innerHTML = ""
      // this.isDisable = false;
      // console.log("Valid entry");
      if (event.target.value.length == 16) {
        // console.log("ama ave ");
        this.bankDetails.emit(this.bankForm.value)
      }
    }
  }


  bankSelect() {
    this.isBankSelected = true
    this.isCardSelected = false
    // console.log("this.isBankSelected", this.isBankSelected);
    // this._change.detectChanges()

  }
  cardSeleced() {
    this.isCardSelected = true
    this.isBankSelected = false
  }
}
