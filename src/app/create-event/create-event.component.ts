import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { config } from '../config'
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  userName = JSON.parse(sessionStorage.getItem('userName'));
  eventForm: FormGroup;
  isPublicVal = false;
  isLogistics = false;
  path = config.baseMediaUrl;
  eventTypeValue
  createdEventDetails
  files: Array<File> = [];
  imgURL: any;
  public imagePath;




  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    // create event slider start
    this.initSlickSlider()
    // create event slider end

    //tooltip js start
    $(".tooltip-class").hover(function () {
      $(this).attr("tooltip-data", $(this).attr("title"));
      $(this).removeAttr("title");
    }, function () {
      $(this).attr("title", $(this).attr("tooltip-data"));
      $(this).removeAttr("tooltip-data");
    });
    //tooltip js end


    // Create New event form start

    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      hashTag: new FormControl('', [Validators.required, Validators.minLength(4)]),
      profile: new FormControl('', [Validators.required]),
      deadlineDate: new FormControl(''),
      isPublic: new FormControl(this.isPublicVal),
      isLogistics: new FormControl(this.isLogistics),
      background: new FormControl(''),
      defaultImage: new FormControl('')
    })

    // Create New event form end

    // DropDown Js
    $('.create-event-type-menu li > a').click(function () {
      this.eventTypeValue = $(this).html();
      $('.create-event-type-menu > a').html(this.eventTypeValue);
      console.log("event selcet thai jaje ========", this.eventTypeValue);
      setControl(this.eventTypeValue);
    });
    var eventFormLocal = this.eventForm;
    var setControl = function (event) {
      eventFormLocal.controls.eventType.setValue(event)
      console.log("event selcet thai jaje biji var ========", eventFormLocal.controls.eventType.value);
    }

  }


  /**
   * Error message of eventDetails 
   */
  get f() { return this.eventForm.controls }


  /**
   * Init slick slider for create new event
   */
  initSlickSlider() {
    $('.create-event-slider').not('.slick-initialized').slick({
      infinite: false,
      draggable: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      adaptiveHeight: true,
      fade: true,
      prevArrow: '<button class="prevarrow">Back</button>',
      nextArrow: '<button class="nextarrow">Next</button>',
    });
  }


  /**
   * @param {String} event
   * To upload profile photo of event
   */
  addFile(event) {
    console.log("profile photo path", event);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
      this.files = event;
      var reader = new FileReader();
      this.imagePath = this.files;
      reader.readAsDataURL(this.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
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
}









// <div class="profile_photo profile_image_box text-center"
// touranchor = "change-profile" ng - reflect - tour - anchor="change-profile" >
//   <img * ngIf="createdEventDetails && createdEventDetails.profilePhoto"
// src = "{{path}}{{createdEventDetails.profilePhoto}}"
// class="rounded-circle" >
//   <input type="file" name = "files" value = "files" formControlName = "profile"
//     (change) = "addFile($event.target.files)" id = "customFile"
// accept = "image/png, image/jpeg, image/jpg" style = "display: none;" >
//   <label for= "customFile" class= "profile_and_cover_edit text-center"
// title = "Change Profile" > <i class= "fa fa-camera"
// aria - hidden="true" > </i></label >
//   <span>
//   <img[src]="imgURL" height = "200" class="float-right rounded-circle"
// id = "imageFilter"
// onerror = "this.src='/assets/images/profile_photo.png'" > </span>
//   < /div>
