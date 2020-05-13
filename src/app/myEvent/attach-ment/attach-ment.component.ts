import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attach-ment',
  templateUrl: './attach-ment.component.html',
  styleUrls: ['./attach-ment.component.css']
})
export class AttachMentComponent implements OnInit {
  files: Array<File> = [];
  imgURL: any;
  public imagePath;

  constructor(

    public dialogRef: MatDialogRef<AttachMentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log("selected event", this.data);

  }



  addFile(event) {
    console.log("profile photo path", event, this.imgURL);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
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
  AddAttchment(){
    console.log("call this");
    
  }

}
