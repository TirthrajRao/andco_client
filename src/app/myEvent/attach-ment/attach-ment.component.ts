import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, FormControlName } from '@angular/forms';
import { EventService } from '../../services/event.service'
@Component({
  selector: 'app-attach-ment',
  templateUrl: './attach-ment.component.html',
  styleUrls: ['./attach-ment.component.css']
})
export class AttachMentComponent implements OnInit {
  files: Array<File> = [];
  imgURL: any;
  public imagePath;
  mailForm: FormGroup
  eventId
  constructor(
    private fb: FormBuilder,
    public eventService: EventService,
    public dialogRef: MatDialogRef<AttachMentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.dialogRef.disableClose = true;

  }

  ngOnInit() {


    this.mailDetails()

    console.log("selected event", this.data);




  }

  mailDetails() {
    this.mailForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email])
      arrayOfEmail: this.fb.array(this.formMail())
    })
  }
  formMail() {
    return [this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
      // activityName: new FormControl('', Validators.required),
      // activityStartDate: new FormControl('', Validators.required),
      // eventId: new FormControl(this.eventId)
    })]
  }
  get activityFormData() { return <FormArray>this.mailForm.get('arrayOfEmail'); }


  /**
   * Display error message for signUp form
   */
  get f() { return <FormArray>this.mailForm.controls.arrayOfEmail; }




  addFile(event) {
    console.log("profile photo path", event, this.imgURL);
    if (event[0].type == "image/png" || event[0].type == "image/png" || event[0].type == "image/png") {
      this.files = event;
      var reader = new FileReader();
      this.imagePath = this.files;
      reader.readAsDataURL(this.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        // this.displayImage = false
        // console.log("image url", this.imgURL);
        // this.eventForm.controls.profile.setValue(this.files)
      }
    }

    else {
      Swal.fire({
        title: 'Error',
        text: "You can upload only image",
        // type: 'warning',
      })

    }
  }
  AddAttchment() {
    console.log("call this");

  }


  addActivityField() {

    const control = <FormArray>this.mailForm.controls.arrayOfEmail;
    control.push(this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    }))
  }

  removeActivityField(i) {

    const control = <FormArray>this.mailForm.controls.arrayOfEmail;
    control.removeAt(i);
  }
  sendMailToAll() {
    console.log("this.mailform value", this.mailForm.value);
    this.dialogRef.close();
    this.eventService.shareLinkOnGmail(this.mailForm.value, this.data).subscribe((response) => {
      console.log("response of mail share in gmail", response);
    }, error => {
      console.log("error while send mail", error);

    })
  }

}
