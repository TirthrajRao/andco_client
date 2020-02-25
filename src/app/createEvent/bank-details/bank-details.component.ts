import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

declare var $: any
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css', './../set-price/set-price.component.css']
})
export class BankDetailsComponent implements OnInit {

  @Output() bankDetails: EventEmitter<any> = new EventEmitter<any>()
  bankForm: FormGroup;
  isBankSelected
  isCardSelected


  constructor(
    private _change: ChangeDetectorRef
  ) { }

  ngOnInit() {

    // $(document).ready(function () {
    //   let checked = $('input[name="radio2"]:checked').val();
    //   console.log("value of checked", checked)
    //   if (checked == 'on') {
    //     this.isBankSelected = true
    //     this.isCardSelected = false
    //   }
    // })

    this.bankForm = new FormGroup({
      bankName: new FormControl(''),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      cardNumber: new FormControl('')
    })
  }



  /**
   * Display error message
   */
  get f() { return this.bankForm.controls; }

  addNumber(event) {
    console.log("logs of number", event.target.value);
    if (event.target.value.length == 16) {
      console.log("from value", this.bankForm.value)
      this.bankDetails.emit(this.bankForm.value)
    }
  }



  bankSelect() {
    this.isBankSelected = true
    this.isCardSelected = false
    console.log("this.isBankSelected", this.isBankSelected);
    // this._change.detectChanges()

  }
  cardSeleced() {
    this.isCardSelected = true
    this.isBankSelected = false
  }
}
