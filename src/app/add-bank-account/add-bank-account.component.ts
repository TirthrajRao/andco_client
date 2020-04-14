import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AddBankModalComponent } from '../add-bank-modal/add-bank-modal.component';
import { AddCardmodalComponent } from '../add-cardmodal/add-cardmodal.component';
import { Observable } from 'rxjs/internal/Observable';
// import { MatDialog } from '@angular/material';
import { MatPaginator, PageEvent, MatDialog } from '@angular/material';


declare var $;

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css', './../createEvent/set-price/set-price.component.css']
})
export class AddBankAccountComponent implements OnInit {

  bankForm: FormGroup;
  cardNumberForm: FormGroup;
  isDisable = false
  isLoad = false
  cardNumber = "^[0-9]*$"
  bankName = "^[a-zA-Z \-\']+"
  bankList = []
  cardList = []
  $sliderContainer
  $slider
  constructor(
    public loginService: LoginService,
    public dialog: MatDialog


  ) {
  }

  ngOnInit() {

    this.loginService.sharedBankDetails.subscribe(response => {
      console.log("when click on plus ", response);
    })


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



  /**
   * Display error message
   */
  get f() { return this.bankForm.controls; }


  /**
   * Display error message for address form
   */
  get g() { return this.cardNumberForm.controls; }


  getBankDetails() {
    this.isLoad = true
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
      this.isLoad = false
    }, error => {
      console.log("error while get details", error);

      this.isLoad = false
    })
  }



  addBankAccount() {
    console.log("click to check ");
    let data
    var addBank = this.openDialog(AddBankModalComponent, data).subscribe((response) => {
      console.log("what is in response", response);
      this.getBankDetails()
    })
  }
  openDialog(someComponent, data = {}): Observable<any> {
    console.log("OPENDIALOG", "DATA = ", data);
    const dialogRef = this.dialog.open(someComponent, { data });
    return dialogRef.afterClosed();
  }

  openCardModal() {
    let data
    var addBank = this.openDialog(AddCardmodalComponent, data).subscribe((response) => {
      console.log("what is in response", response);
      this.getBankDetails()
    })
  }

}
