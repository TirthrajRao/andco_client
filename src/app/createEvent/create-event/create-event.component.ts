import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { config } from '../../config'
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
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
  themeFile
  imgURL: any;
  themeUrl: any;
  public imagePath;
  public themePath;
  isDisable = false
  submitted = false;
  isLoad = false
  // elRef: any;



  constructor(
    public router: Router,
    public eventService: EventService,
    public alertService: AlertService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }
  //   ngAfterViewInit() {
  //     let loader = this.elRef.nativeElement.querySelector('#loader'); 
  //     loader.style.display = "none"; //hide loader
  //  }

  ngOnInit() {
    //background image select active start
    $('.sample_bg').click(function (e) {
      $('.bg-select-div.active').removeClass('active');
      var $parent = $(this).parent();
      $parent.addClass('active');
      e.preventDefault();
    });
    //background image select active end

    // create event slider start
    this.initSlickSlider()
    // create event slider end

   


    // Create New event form start

    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      hashTag: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z]+$")]),
      profile: new FormControl('', [Validators.required]),
      background: new FormControl(''),
    })

    // Create New event form end

    // Create event active class js start
    $('.create-event-type-menu ul li a').click(function (e) {
      $('.create-event-type-menu ul li.active').removeClass('active');
      var $parent = $(this).parent();
      $parent.addClass('active');
      e.preventDefault();
    });
    // Create event active class js end

    // DropDown Js
    $('.create-event-type-menu li > a').click(function () {
      this.eventTypeValue = $(this).html();
      $('.create-event-type-menu > a').html(this.eventTypeValue);
      console.log("event select thai jaje ========", this.eventTypeValue);
      setControl(this.eventTypeValue);
    });
    var eventFormLocal = this.eventForm;
    var setControl = function (event) {
      eventFormLocal.controls.eventType.setValue(event)
      console.log("event select thai jaje biji var ========", eventFormLocal.controls.eventType.value);
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
    setTimeout(() => {
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
    }, 100)
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
        this.eventForm.controls.profile.setValue(this.files)
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


  /** 
   * @param path background image path
   * Display selected image 
   */
  defaultBackgroundImage(path) {
    this.themeUrl = path
    this.eventForm.controls.background.setValue(path)
    $('.bg-select-div').addClass('active')
    console.log("form details========", this.eventForm.value)
  }

  /**
   * Create new event
   */
  addEvent() {
    this.isLoad = true
    this.isDisable = true
    console.log(this.eventForm.value);
    console.log("in twelve_slide");
    this.eventService.addEvent(this.eventForm.value, this.files)
      .subscribe((data: any) => {
        console.log("event details", data);
        // this.isDisable = true
        this.isLoad = false
        this.alertService.getSuccess(data.message)
        this.eventForm.reset()
        this.router.navigate(['/menu']);
      }, (error: any) => {
        this.isDisable = false
        this.isLoad = false
        console.log(error);
        this.alertService.getError(error.message);
      })
  }


  // removeSpace(event) {
  //   console.log("hash tag details", event.target.value)
  //   let form = event.target.value;
  //   let message1 = document.getElementById('message1');
  //   let reg = new RegExp("[a-zA-Z]");
  //   if (reg.test(form)) {
  //     console.log("message==========", message1)
  //     message1.innerHTML = "Name can not start with digit"
  //   } else {
  //     message1.innerHTML = null;
  //   }
  // }

  removeSpace(value) {
    // let form = event.target.value
    // console.log("name", form)
    const nameInput = /[a-zA-Z ]/;
    $("#hashTag").on({
      keydown: function (e) {
        if (e.which === 32)
          return false;
      },
      change: function () {
        this.value = this.value.replace(/\s/g, "");
      }
    });
    let message1 = document.getElementById('message1');
    if (!value.hashTag.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = null;
    }
  }

}

