import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  itemName
  description

  constructor(
    public dialogRef: MatDialogRef<DescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log("what is data of page", this.data);
    this.dialogRef.disableClose = true;
    this.itemName = this.data.itemName
    this.description = this.data.description
  }


  closeModel() {
    this.dialogRef.close();
  }

}
