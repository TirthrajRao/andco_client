import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { config } from '../../config'
import { EventService } from '../../services/event.service';
import { ImageCroppedEvent, base64ToFile, Dimensions, ImageTransform } from 'ngx-image-cropper';
declare var $;

@Component({
  selector: 'app-event-profile-pic',
  templateUrl: './event-profile-pic.component.html',
  styleUrls: ['./event-profile-pic.component.css']
})
export class EventProfilePicComponent implements OnInit {


  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  cropImage: any
  transform: ImageTransform = {};
  blob: any
  @Input('profile') profilePhoto
  path = config.baseMediaUrl;
  files: Array<File> = [];
  public imagePath;
  imgURL: any;
  eventId
  isLoad = false
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }



  fileChangeEvent(event: any): void {
    console.log("when image is without crop", event);
    this.imageChangedEvent = event;
    // this.files = event.target.files
    // this.eventForm.controls.profile.setValue(this.files)
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    let ImageURL = this.croppedImage
    var block = ImageURL.split(";");
    var contentType = block[0].split(":")[1];
    var byteString = atob(this.croppedImage.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    this.blob = new Blob([ia], { type: contentType });
    // blob['name'] = data.name
    console.log("blob====>", this.blob);
    // this.eventForm.controls.profile.setValue(this.blob)
  }



  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("when click on profile tab", this.profilePhoto);
    this.eventId = this.profilePhoto.eventId
  }
  addFile(event) {
    console.log("profile photo path", this.eventId);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
      this.files = event;
      var reader = new FileReader();
      this.imagePath = this.files;
      reader.readAsDataURL(this.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        console.log("selected photo", this.files[0]);
        this.eventService.changeProfilePhoto(this.files[0], this.eventId).subscribe(((response: any) => {
          console.log("pforile photo is changed", response);
          this.profilePhoto = response.update.profilePhoto
        }), error => {
          console.log("error while upload file", error);

        })
      }
    }
  }

  saveImage() {
    $('#imageUpload').modal("hide")
    this.isLoad = true
    this.eventService.changeProfilePhoto(this.blob, this.eventId).subscribe((response: any) => {
      console.log("response of image change");
      this.profilePhoto = response.update.profilePhoto
      this.isLoad = false
    }, error => {
      console.log("error while update photo", error);
      this.isLoad = false
    })
  }

  openImageModal() {
    $('#imageUpload').modal("show")
  }

}
