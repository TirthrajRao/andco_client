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

  @Input('bankAccount') bankAccount
  @Input('cardAccount') cardAccount
  @Input('allAmount') totalAmount
  @Output() bankDetails: EventEmitter<any> = new EventEmitter<any>()
  @Output() selectedBankAccount: EventEmitter<any> = new EventEmitter<any>()
  @Output() selectedCardAccount: EventEmitter<any> = new EventEmitter<any>()
  bankForm: FormGroup;
  isBankSelected
  isCardSelected
  displayDetails
  $sliderContainer
  $slider
  bankList:any
  cardList:any
  bankSelected
  coronaCard
  coronaBank
  isLoad = false
  constructor(
    private _change: ChangeDetectorRef,
    public loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.getBankDetails()
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

  initBankSliderAfter() {
    this.$sliderContainer = $('.bank-sliderAfter')
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


  initCardSliderAfter() {
    this.$sliderContainer = $('.card-sliderAfter')
    this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '#prevarrow1',
      nextArrow: '#nextarrow1',
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("change when edit bank details", changes);
    if (changes.totalAmount && changes.totalAmount.currentValue) {
      this.bankList = changes.totalAmount.currentValue.bankDetail
      this.cardList = changes.totalAmount.currentValue.cardDetails
      console.log("list of bank", this.bankList);
      
      if (this.bankList && (changes.bankAccount && !changes.bankAccount.currentValue)) {
        this.$sliderContainer = $('.bank-slider');
        this.$sliderContainer.slick('unslick');
        setTimeout(() => {
          this.initBankSlider()
        }, 50)
      }
      if (this.cardList && (changes.cardAccount && !changes.cardAccount.currentValue)) {
        this.$sliderContainer = $('.card-slider');
        this.$sliderContainer.slick('unslick');
        setTimeout(() => {
          this.initCardSlider()
        }, 50)
      }
    }

    if (changes.bankAccount && changes.bankAccount.currentValue) {
      this.displayBankAccount(changes.bankAccount.currentValue)
    }
    if (changes.cardAccount && changes.cardAccount.currentValue) {
      this.disPlayCard(changes.cardAccount.currentValue)
    }
  }




  getBankDetails() {
    this.isLoad = true
    this.loginService.getBankDetails().subscribe((response: any) => {
      console.log("details of bank", response);
      this.bankList = response.data.bankDetail
      this.cardList = response.data.cardDetails
      if (this.bankList) {
        if (this.coronaBank) {
          // console.log("what is call");
          setTimeout(() => {
            $('#radio-group-' + this.coronaBank).prop('checked', true)
          }, 10)
          setTimeout(() => {
            this.initBankSliderAfter()
          }, 5)
        } else {
          console.log("or else part");
          this.$sliderContainer.slick('unslick');
          this.$sliderContainer = $('.bank-slider');
          setTimeout(() => {
            this.initBankSlider()
          }, 5)
        }
      }
      if (this.cardList) {
        if (this.coronaCard) {
          // console.log("what is call");
          setTimeout(() => {
            $('#radio-groupCard-' + this.coronaCard).prop('checked', true)
          }, 10)
          setTimeout(() => {
            this.initCardSliderAfter()
          }, 5)
        } else {
          this.$sliderContainer.slick('unslick');
          this.$sliderContainer = $('.card-slider');
          setTimeout(() => {
            this.initCardSlider()
          }, 5)
        }
      }
      this.isLoad = false
    }, error => {
      console.log("error while get details", error);

    })
  }



  disPlayCard(card) {
    console.log("value of card total", this.cardList);
    this.coronaCard = card._id
    if (this.cardList && this.cardList.length) {
      this.isCardSelected = true
      $('input:radio[id="test4"]').prop('checked', true);
      setTimeout(() => {
        $('#radio-groupCard-' + this.coronaCard).prop('checked', true)
      }, 10)
      setTimeout(() => {
        this.initCardSliderAfter()
      }, 5)
    }
  }


  displayBankAccount(account) {
    this.coronaBank = account._id
    if (this.bankList && this.bankList.length) {
      this.isBankSelected = true
      $('input:radio[id="test3"]').prop('checked', true);
      setTimeout(() => {
        $('#radio-group-' + this.coronaBank).prop('checked', true)
      }, 10)
      setTimeout(() => {
        this.initBankSliderAfter()
      }, 5)
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


  selectBank(event) {
    // console.log("event when add account", event.target.value);
    this.selectedBankAccount.emit(event.target.value)
    // console.log("what is the value", this.selectedBankAccount);

  }
  selectCard(event) {
    this.selectedCardAccount.emit(event.target.value)
  }

  updateCard(event) {
    $('#radio-groupCard-' + this.coronaCard).prop('checked', false)
    this.selectedCardAccount.emit(event.target.value)
  }

  updateBank(event) {
    $('#radio-group-' + this.coronaBank).prop('checked', false)
    this.selectedBankAccount.emit(event.target.value)
  }

  bankSelect() {
    this.isBankSelected = true
    this.isCardSelected = false
    if (this.coronaBank) {
      console.log("what is call");
      setTimeout(() => {
        $('#radio-group-' + this.coronaBank).prop('checked', true)
      }, 10)
      setTimeout(() => {
        this.initBankSliderAfter()
      }, 5)
    } else {
      console.log("or else part");
      this.$sliderContainer.slick('unslick');
      this.$sliderContainer = $('.bank-slider');
      setTimeout(() => {
        this.initBankSlider()
      }, 5)
    }
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
    if (this.coronaCard) {
      // console.log("what is call");
      setTimeout(() => {
        $('#radio-groupCard-' + this.coronaCard).prop('checked', true)
      }, 10)
      setTimeout(() => {
        this.initCardSliderAfter()
      }, 5)
    } else {
      this.$sliderContainer.slick('unslick');
      this.$sliderContainer = $('.card-slider');
      setTimeout(() => {
        this.initCardSlider()
      }, 5)
    }
  }
}
