import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AddBankModalComponent } from '../../add-bank-modal/add-bank-modal.component';
import { AddCardmodalComponent } from '../../add-cardmodal/add-cardmodal.component';
import { MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';


declare var $: any
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css', './../set-price/set-price.component.css', './../../add-bank-account/add-bank-account.component.css']
})
export class BankDetailsComponent implements OnInit {

  @Input('accountDetails') accountDetails
  @Output() bankDetails: EventEmitter<any> = new EventEmitter<any>()
  bankForm: FormGroup;
  isBankSelected
  isCardSelected
  displayDetails
  $sliderContainer
  $slider
  bankList = []
  cardList = []
  selectedBank
  constructor(
    private _change: ChangeDetectorRef,
    public loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {



    this.getBankDetails()
    this.initBankSlider()
    this.initCardSlider()

  }



  initBankSlider() {
    this.$sliderContainer = $('.bank-slider')
    this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '#prevarrow',
      nextArrow: '#nextarrow',
    })
  }


  initCardSlider() {
    this.$sliderContainer = $('.card-slider')
    this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '#prevarrow1',
      nextArrow: '#nextarrow1',
    })
  }

  getBankDetails() {
    this.loginService.getBankDetails().subscribe((response: any) => {
      console.log("details of bank", response);
      this.bankList = response.data.bankDetail
      this.cardList = response.data.cardDetails
      if (this.bankList) {
        this.$sliderContainer = $('.bank-slider');
        this.$sliderContainer.slick('unslick');
        setTimeout(() => {
          this.initBankSlider()
        }, 50)
      }
      if (this.cardList) {
        this.$sliderContainer = $('.card-slider');
        this.$sliderContainer.slick('unslick');
        setTimeout(() => {
          this.initCardSlider()
        }, 50)
      }
    }, error => {
      console.log("error while get details", error);

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
    console.log("bank details for send data", this.bankDetails);

    if (this.displayDetails.bankName) {
      this.isBankSelected = true
      $('input:radio[id="test3"]').prop('checked', true);
      // this.bankForm.patchValue({
      //   bankName: this.displayDetails.bankName
      // });
      // this.bankForm.get('bankName').updateValueAndValidity();

      // this.bankForm.patchValue({
      //   accountNumber: this.displayDetails.accountNumber
      // });
      // this.bankForm.get('accountNumber').updateValueAndValidity();
      // this.bankDetails.emit(this.bankForm.value)
    } else {
      $('input:radio[id="test4"]').prop('checked', true);

      // this.bankForm.patchValue({
      //   cardNumber: this.displayDetails.cardNumber
      // });
      // this.bankForm.get('cardNumber').updateValueAndValidity();
      // this.bankDetails.emit(this.bankForm.value)
      this.isCardSelected = true
    }
  }



  changeBankName($event, details) {
    console.log("details of bank ", details);
    this.bankDetails.emit(details)
    console.log("=================", this.bankDetails);


    
  }


  selectBank() {
    this.selectedBank = $('input[name="radio-group"]:checked').val();
    console.log("what is the value", this.selectedBank);

  }



  bankSelect() {
    this.isBankSelected = true
    this.isCardSelected = false
    this.$sliderContainer = $('.bank-slider');
    this.$sliderContainer.slick('unslick');
    setTimeout(() => {
      this.initBankSlider()
    }, 50)
    // this.initBankSlider()
    // console.log("this.isBankSelected", this.isBankSelected);
    // this._change.detectChanges()

  }
  addBankAccount() {
    let data
    var addBank = this.openDialog(AddBankModalComponent, data).subscribe((response) => {
      console.log("what is in response", response);
      if (response != undefined)
        this.getBankDetails()
    })
  }


  addCardDetail() {
    let data
    var addBank = this.openDialog(AddCardmodalComponent, data).subscribe((response) => {
      console.log("what is in response", response);
      if (response != undefined)
        this.getBankDetails()
    })
  }

  openDialog(someComponent, data = {}): Observable<any> {
    console.log("OPENDIALOG", "DATA = ", data);
    const dialogRef = this.dialog.open(someComponent, { data });
    return dialogRef.afterClosed();
  }
  cardSeleced() {
    this.isCardSelected = true
    this.isBankSelected = false
    this.$sliderContainer = $('.card-slider');
    this.$sliderContainer.slick('unslick');
    setTimeout(() => {
      this.initCardSlider()
    }, 50)
  }
}
