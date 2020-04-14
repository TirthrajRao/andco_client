import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent, base64ToFile, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { config } from '../../config'
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

declare var $;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @Output() eventActivities: EventEmitter<any> = new EventEmitter<any>()

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  cropImage: any
  transform: ImageTransform = {};

  private sub: any
  private eventId: any
  userName = JSON.parse(sessionStorage.getItem('userName'));
  eventForm: FormGroup;
  $slider
  $sliderContainer
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
  displayImage
  errorMessaage: string;
  selctedIndex
  selectedThemeIndex
  customEventType
  customType
  hashTagIndex
  prevIndex = 0
  saveEvent = false
  blob: any
  eventType = ["Wedding", "Birthday", "Funeral", "Reunion", "Club/Group", "Anniversary"]
  eventBackGround = [
    {
      themeName: 'floral',
      path: 'assets/images/floral.png'
    },
    {
      themeName: 'marble',
      path: 'assets/images/marble.png'
    },
    {
      themeName: 'wood',
      path: 'assets/images/wood.png'
    },
    {
      themeName: 'origami',
      path: 'assets/images/origami.png'
    },
    {
      themeName: 'classic',
      path: 'assets/images/classic.png'
    },
    {
      themeName: 'lines',
      path: 'assets/images/lines.png'
    },
    {
      themeName: 'luxury',
      path: 'assets/images/luxury.png'
    },
    {
      themeName: 'instrument',
      path: 'assets/images/instrument.png'
    }
  ]
  cropPath: any;



  constructor(
    public router: Router,
    public activated: ActivatedRoute,
    public eventService: EventService,
    public alertService: AlertService,
    public loginService: LoginService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


    this.sub = this.activated.params.subscribe(param => {
      this.eventId = param.eventId
      if (this.eventId) {
        console.log("event id for edit", this.eventId);
        this.getEditEventDetails(this.eventId)
      }
    })

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
      hashTag: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[A-Za-z0-9]+$")]),
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
      // console.log("event select thai jaje ========", this.eventTypeValue);
      setControl(this.eventTypeValue);
    });
    var eventFormLocal = this.eventForm;
    var setControl = function (event) {
      // console.log("type is selected========", event)
      eventFormLocal.controls.eventType.setValue(event)
      // console.log("event select thai jaje biji var ========", eventFormLocal.controls.eventType.value);
    }

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
    this.eventForm.controls.profile.setValue(this.blob)
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


  // Get Event details
  getEditEventDetails(eventId) {
    this.eventService.getEventDetails(eventId).subscribe((response: any) => {
      console.log("response for edit event", response);
      this.createdEventDetails = response.data
      if (this.createdEventDetails.eventType) {
        console.log("what is value", this.createdEventDetails.eventType);
        let customType = this.createdEventDetails.eventType
        const resSomeSearch1 = this.eventType.some(item =>
          item === customType
        );
        console.log("it is important for event tyep", resSomeSearch1);
        if (resSomeSearch1 == false) {
          this.eventType.push(customType)
          let selectedEventType = this.eventType.indexOf(this.createdEventDetails.eventType)
          this.eventForm.controls.eventType.setValue(this.createdEventDetails.eventType)
          this.selctedIndex = selectedEventType
        } else {
          let selectedEventType = this.eventType.indexOf(this.createdEventDetails.eventType)
          this.eventForm.controls.eventType.setValue(this.createdEventDetails.eventType)
          this.selctedIndex = selectedEventType
        }
      }
      let index = this.eventBackGround.findIndex(x => x.path === this.createdEventDetails.eventTheme);
      this.themeUrl = this.createdEventDetails.eventTheme
      this.croppedImage = this.path + this.createdEventDetails.profilePhoto
      this.imgURL = this.path + this.createdEventDetails.profilePhoto
      // this.imageChangedEvent = this.path + this.createdEventDetails.profilePhoto
      this.displayImage = true
      // this.eventActivities.emit(this.createdEventDetails.activity)
      console.log("index of event", index);
      this.selectedThemeIndex = index
      this.eventForm.controls.profile.setValue(this.createdEventDetails.profilePhoto)
    }, error => {
      console.log("error while get event details", error);

    })
  }


  selectEvent(i) {
    console.log("index of type", i);
    this.selctedIndex = i
    const selectedCategory = this.eventType[i];
    this.eventForm.controls.eventType.setValue(selectedCategory)
    console.log("selectedCategory", selectedCategory);

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
      this.$sliderContainer = $('.create-event-slider')
      this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
        infinite: false,
        draggable: false,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        adaptiveHeight: true,
        fade: true,
        accessibility: false,
        prevArrow: '#previouesOne',
        nextArrow: '#nextOne',
      });
      // $('.prevarrow, .nextarrow, .created-event-custom-button').attr('tabindex', '-1');
      // this.isDisable = true
      this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        // this.nextSlide(currentSlide)
        console.log("event on before", currentSlide, nextSlide);
        // this.hashTagIndex = currentSlide
        if (currentSlide == 4 && nextSlide == 5) {
          this.saveEvent = true
        } else {
          this.saveEvent = false
        }
      })
    }, 100)
  }


  nextSlide(event) {
    console.log("ama kaik avu joye", event);
    const keys = Object.keys(this.eventForm.controls);
    let form = this.eventForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      console.log("bank element", form[element], element)
      if (form[element] == this.eventForm.controls.hashTag) {
        console.log("call or not");
        console.log("this is perfect", this.eventForm.controls.hashTag.value);
      } else {
        return true
      }
    })
  }

  /**
   * @param {String} event
   * To upload profile photo of event
   */

  addFile(event) {
    console.log("profile photo path", event, this.imgURL);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
      this.files = event;
      var reader = new FileReader();
      this.imagePath = this.files;
      reader.readAsDataURL(this.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.displayImage = false
        // console.log("image url", this.imgURL);
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
  defaultBackgroundImage(path, i) {
    this.themeUrl = path
    this.eventForm.controls.background.setValue(path)
    this.selectedThemeIndex = i
  }

  setDefaultBackGround(path) {
    this.themeUrl = path
    $('#setDefault').modal("hide")
    this.eventForm.controls.background.setValue(path)
    this.selectedThemeIndex = null
  }

  ngOnChanges({ formDirty }: SimpleChanges) {
    if (formDirty.currentValue) {
      // console.log("first one");

      // this.inputCtrl.markAsDirty();
    } else {
      // console.log("second one");
      // this.inputCtrl.markAsPristine();
    }
  }


  skipButton() {
    // console.log("call or not", this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide'))));
    // this.isDisable = true
    this.prevIndex = 1
    const keys = Object.keys(this.eventForm.controls);
    let form = this.eventForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      // console.log("bank element", form[element], element)
      if (form[element] == this.eventForm.controls.hashTag) {
        // this.isDisable = true
        if (form[element].status == 'VALID') {
          console.log("this is important", this.eventForm.controls.hashTag.value);
          let checkHashTagValue = this.eventForm.controls.hashTag.value
          this.eventService.checkHashTag(checkHashTagValue, this.eventId).subscribe((response: any) => {
            console.log("response of hashtag or not", response);
            if (response.data == true) {
              console.log("data is true of false");
              this.isDisable = false
              this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) + 1);
            } else {
              let message = document.getElementById('message1');
              message.innerHTML = "Hashtag Already Exists";
              this.isDisable = true
            }
          }, error => {
            console.log("if it is avalible", error);

          })
        } else {
          console.log("what is ");
          this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) + 1);
        }
      }
      else {
        return true
      }
    })
  }
  skipButtons() {
    this.$slider.slick('slickGoTo', parseInt(this.$slider.slick('slickCurrentSlide')) - 1);
  }


  enterCustomType() {
    this.customType = 0
    $('#otherEventType').modal("show")
  }

  addEventType() {
    console.log("event type new one", this.customEventType)
    this.eventType.push(this.customEventType)
    this.customEventType = ''
    this.customType = 1
    $('#otherEventType').modal("hide")
  }


  /**
   * Create new event
   */
  addEvent() {
    console.log("final value of form", this.eventForm)
    const keys = Object.keys(this.eventForm.controls);
    let form = this.eventForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      if (form[element].status == 'INVALID') {
        flag = 1;
        if (element == 'eventTitle') {
          this.errorMessaage = 'Event Title is required'
        } else if (element == 'eventType') {
          this.errorMessaage = 'Event Type is required'
        } else if (element == 'hashTag') {
          this.errorMessaage = 'Hashtag is required'
        } else if (!this.blob) {
          this.errorMessaage = 'Profile is required'
        }
        this.alertService.getError(this.errorMessaage)
        return false
      }
      else {
        return true
      }
    });
    if (flag == 0) {
      this.isLoad = true
      if (this.eventForm.controls.background.value == "") {
        console.log("when np bg selected");
        let path = 'assets/images/guest.png'
        this.eventForm.controls.background.setValue(path)
      }

      this.eventService.addEvent(this.eventForm.value, this.blob)
        .subscribe((data: any) => {
          // console.log("event details", data.data.hashTag);
          sessionStorage.setItem('eventLink', data.data.eventLink)
          sessionStorage.setItem('hasTag', data.data.hashTag)
          // this.isDisable = true
          this.alertService.getSuccess(data.message)
          this.eventForm.reset()

          let routerData = '/eventActivity/' + data.data._id
          let output = this.loginService.returnLogin(routerData);
          if (output == true) {
            // this.router.navigate(['/myevent']);
            this.router.navigate(['/eventActivity/' + data.data._id])
          }
          // this.router.navigate(['/eventActivity/' + data.data._id]);
          this.isLoad = false
        }, (error: any) => {
          this.isDisable = false
          this.isLoad = false
          // console.log(error);
          this.alertService.getError(error.message);
          return
          // })
        })
    }
  }


  updateEvent() {
    console.log("update event value", this.eventForm);

    const keys = Object.keys(this.eventForm.controls);
    let form = this.eventForm.controls;
    let flag = 0;
    keys.every((element, value) => {
      if (form[element].status == 'INVALID') {
        flag = 1;
        if (element == 'eventTitle') {
          this.errorMessaage = 'Event Title is required'
        } else if (element == 'eventType') {
          this.errorMessaage = 'Event Type is required'
        } else if (element == 'hashTag') {
          this.errorMessaage = 'Hashtag is required'
        }
        // } else if (this.files.length == 0) {
        //   this.errorMessaage = 'Profile is required'
        // }
        this.alertService.getError(this.errorMessaage)
        return false
      }
      else {
        return true
      }
    });
    if (flag == 0) {
      this.isLoad = true
      this.eventService.updateEvent(this.eventId, this.eventForm.value, this.blob)
        .subscribe((data: any) => {
          console.log("event details", data);
          sessionStorage.setItem('eventLink', data.data.eventLink)
          sessionStorage.setItem('hasTag', data.data.hashTag)
          // this.isDisable = true
          this.alertService.getSuccess(data.message)
          // this.eventForm.reset()

          let routerData = '/eventActivity/' + data.data._id
          let output = this.loginService.returnLogin(routerData);
          if (output == true) {
            // this.router.navigate(['/myevent']);
            this.router.navigate(['/eventActivity/' + data.data._id])
          }
          // this.router.navigate(['/eventActivity/' + data.data._id]);
          this.isLoad = false
        }, (error: any) => {
          this.isDisable = false
          this.isLoad = false
          // console.log(error);
          this.alertService.getError(error.message);
          return
          // })
        })
    }
  }

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
      // console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = null;
    }
  }
  openImageModal() {
    $('#imageUpload').modal("show")

  }
  saveImage() {
    $('#imageUpload').modal("hide")
  }

  closeImageModel() {
    $('#imageUpload').modal("hide")
  }
}

