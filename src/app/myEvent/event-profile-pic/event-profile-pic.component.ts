import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { config } from '../../config'
import { EventService } from '../../services/event.service';
import { ImageCroppedEvent, base64ToFile, Dimensions, ImageTransform, ImageCropperComponent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';
// import {} from 'ca';


declare var $;

@Component({
  selector: 'app-event-profile-pic',
  templateUrl: './event-profile-pic.component.html',
  styleUrls: ['./event-profile-pic.component.css']
})
export class EventProfilePicComponent implements OnInit {

  @ViewChild("imageCropper", { static: true }) imageCropper: ImageCropperComponent;


  base64TrimmedURL: any;
  base64DefaultURL: any;
  generatedImage: any;
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
  currentImgUrl: any;
  dataUri: any;
  displayPhoto
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {

    console.log(" ************ Yash Shukla ********* ")
    // console.log(" Image Url is this :::::", this.profilePhoto.profile)
    // this.getBase64ImageFromURL(dataUri)

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
    if (changes.profilePhoto && changes.profilePhoto.currentValue) {
      this.displayPhoto = this.profilePhoto.profile
      this.eventId = this.profilePhoto.eventId
    }
    // var reader = new FileReader();
    // reader.onloadend = this._handleReaderLoaded.bind(this.profilePhoto.profile);
    // this.getBase64ImageFromURL(this.profilePhoto.profile)
    // reader.readAsDataURL(this.profilePhoto.profile);
  }
  addFile(event) {
    console.log("profile photo path", this.eventId);
    if (event[0].type == "image/png" || event[0].type == "image/png" || event[0].type == "image/png") {
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

  _handleReaderLoaded(e) {

    let reader = e.target;
    this.croppedImage = reader.result.substr(reader.result.indexOf(',') + 1);
    // console.log("what is the value of it", base64result);

  }

  saveImage() {
    $('#imageUpload').modal("hide")
    this.isLoad = true
    this.eventService.changeProfilePhoto(this.blob, this.eventId).subscribe((response: any) => {
      console.log("response of image change", response);
      this.displayPhoto = response.update.profile
      console.log("value of photo", this.profilePhoto);
      this.isLoad = false
    }, error => {
      console.log("error while update photo", error);
      this.isLoad = false
    })
  }


  getBase64ImageFromURL(url: string) {
    console.log("value of url =========", url);

    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    console.log("what is in this imgage========", img);

    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement("canvas");
    console.log("log this canvas or not", canvas);

    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    // This will draw image    
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL("image/png");
    console.log("this is console or not", dataURL);

    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|png);base64,/, "");
  }

  dataURItoBlob(dataURI): Observable<Blob> {
    console.log("call or not");

    return Observable.create((observer: Observer<Blob>) => {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      observer.next(blob);
      observer.complete();
    });
  }



  opoenNewModel() {
    // this.dataUri = this.path + this.profilePhoto.profile
    $('#imageUpload').modal("show")
    console.log("what is the value of photo", this.profilePhoto.profile)
    if (this.profilePhoto && this.profilePhoto.profile) {
      this.currentImgUrl = this.path + this.profilePhoto.profile
    } else {
      this.currentImgUrl = this.path + this.profilePhoto
    }


  }

  openImageModal() {


    if (this.profilePhoto.profile) {
      // First need to convert it into blob
      console.log(" Yash Check this ", this.profilePhoto.profile)

      $('#imageUpload').modal("show")


      let dataURI = this.path + this.profilePhoto.profile


      // convert base64 to raw binary data held in a string
      function getBase64Image(img) {

        console.log(" Image ", img)
        var canvas = document.createElement("canvas");
        console.log("what is canvas ", canvas);
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        console.log("what is in ctx=======", ctx);
        var dataURL = canvas.toDataURL("image/png");
        console.log(" Data url ", dataURL)
        return dataURL.replace(/^data:image\/(png|png);base64,/, "");
      }

      var base64 = getBase64Image(document.getElementById("profileImage"));

      console.log(" Converted IMage== in base64", base64)
      // this.croppedImage = base64
      // console.log(" Url ", url)

      // this.getBase64ImageFromURL(url)
      // .subscribe((data:string) => {
      //   this.base64TrimmedURL = data;
      // });

      // const date = new Date().valueOf();
      // let text = '';
      // const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // for (let i = 0; i < 5; i++) {
      //   text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length) );
      // }
      // // Replace extension according to your media type like this 
      // const imageName = date + '.' + text + '.png';
      // console.log(imageName);
      // // call method that creates a blob from dataUri
      // let imageBlob;
      // this.dataURItoBlob(this.base64TrimmedURL).subscribe(data => {
      //   imageBlob = data;
      // });
      // const imageFile = new File([imageBlob], imageName, { type: 'image/png' });


    }
    else {
      $('#imageUpload').modal("show")
    }

  }



}
