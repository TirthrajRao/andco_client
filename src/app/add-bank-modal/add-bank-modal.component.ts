import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $;
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-add-bank-modal',
  templateUrl: './add-bank-modal.component.html',
  styleUrls: ['./../add-bank-account/add-bank-account.component.css']
})
export class AddBankModalComponent implements OnInit {

  bankForm: FormGroup;
  isDisable = false
  cardNumber = "^[0-9]*$"
  bankName = "^[a-zA-Z \-\']+"
  constructor(
    public loginService: LoginService,
    public dialogRef: MatDialogRef<AddBankModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    console.log("data in modal", this.data)
    this.bankForm = new FormGroup({
      bankName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
    })
  }

  get f() { return this.bankForm.controls; }



  addBankDetails() {
    // $('#exampleModalCenter').modal("hide")
    // this.isLoad = true
    console.log("bank accoutn form ", this.bankForm.value);
    this.loginService.addBankAccount(this.bankForm.value).subscribe((response: any) => {
      console.log("account added", response);
      this.dialogRef.close(response);
      // this.getBankDetails()
      // this.isLoad = false
      this.bankForm.reset()
    }, error => {
      console.log("error while add account", error);
      // this.isLoad = false
    })
  }

  closeModel() {
    this.dialogRef.close();
  }

}
