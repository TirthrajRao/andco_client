import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { config } from '../../config'
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-event-profile-pic',
  templateUrl: './event-profile-pic.component.html',
  styleUrls: ['./event-profile-pic.component.css']
})
export class EventProfilePicComponent implements OnInit {

  @Input('profile') profilePhoto
  path = config.baseMediaUrl;
  files: Array<File> = [];
  public imagePath;
  imgURL: any;

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("when click on profile tab", this.profilePhoto);

  }
  addFile(event) {
    // console.log("profile photo path", event);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
      this.files = event;
      var reader = new FileReader();
      this.imagePath = this.files;
      reader.readAsDataURL(this.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        console.log("selected photo", this.files[0]);
        this.eventService.changeProfilePhoto(this.files[0], this.profilePhoto.eventId).subscribe(((response: any) => {
          console.log("pforile photo is changed", response);
          this.profilePhoto = response.update.profilePhoto
        }), error => {
          console.log("error while upload file", error);

        })
      }
    }

    // else {
    //   Swal.fire({
    //     title: 'Error',
    //     text: "You can upload only image",
    //     // type: 'warning',
    //   })

    // }
  }

}
