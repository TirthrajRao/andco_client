import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $;
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-add-cardmodal',
  templateUrl: './add-cardmodal.component.html',
  styleUrls: ['./../add-bank-account/add-bank-account.component.css']
})
export class AddCardmodalComponent implements OnInit {

  cardNumberForm: FormGroup;
  isDisable = false
  cardNumber = "^[0-9]*$"
  bankName = "^[a-zA-Z \-\']+"

  constructor(
    public loginService: LoginService,
    public dialogRef: MatDialogRef<AddCardmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    this.cardNumberForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.min(3)])
    })
  }


  get g() { return this.cardNumberForm.controls; }

  addCardDetails() {
    // $('#exampleModalCard').modal("hide")
    // this.isLoad = true
    this.isDisable = true
    
    this.loginService.addCardAccount(this.cardNumberForm.value).subscribe((response) => {
      console.log("response of card added", response);
      this.dialogRef.close(response);
      // this.getBankDetails()
      // this.isLoad = false
      this.cardNumberForm.reset()
    }, error => {
      console.log("error while add card", error);
    })
  }

  closeModel() {
    this.dialogRef.close();
  }
}
