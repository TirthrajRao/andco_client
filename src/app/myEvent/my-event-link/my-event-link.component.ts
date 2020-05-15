import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormControlName } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { EventService } from '../../services/event.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoginComponent } from 'src/app/login/login.component';
import { MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { AttachMentComponent } from '../attach-ment/attach-ment.component';
import { config } from '../../config';
import Swal from 'sweetalert2';


// import { LOADIPHLPAPI } from 'dns';
declare var $;
@Component({
  selector: 'app-my-event-link',
  templateUrl: './my-event-link.component.html',
  styleUrls: ['./my-event-link.component.css', './../my-event-activity/my-event-activity.component.css', './../event-profile-pic/event-profile-pic.component.css']
})
export class MyEventLinkComponent implements OnInit {

  private _success = new Subject<string>();
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  staticAlertClosed = false;
  successMessage: string;
  reminderForm: FormGroup;
  afterEventForm: FormGroup;
  currentDay = new Date()
  @Input('eventLink') eventLink
  $slider
  $slideContainter
  displayEventLink
  displayDate: Date;
  displayTime
  index = 0
  selectedIndex = 0
  eventId
  afterEventMessage
  hours: any;
  minutes: any;
  timeHour: any
  whatsupLink;
  googleLink;
  faceBookLink;
  textMessageLink
  invitatationMessage
  reminderDetails
  welcomeMessage
  payMessage
  eventLinkMenu = ["Invitation", "Welcome", "Pay", "Reminder", "After Event"]
  isAll
  isOnly
  afterAll
  afterBuy
  flag: any
  eventDetails
  time = this.currentDay.getHours() + ":" + this.currentDay.getMinutes();
  files: Array<File> = [];
  imgURL: any;
  public imagePath;
  path = config.baseMediaUrl;
  currentIndex
  previousIndex

  constructor(
    public eventService: EventService,
    public activated: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {

    // alertForCopy start
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(500)
    ).subscribe(() => this.successMessage = null);
    // alertForCopy end

    this.reminderForm = new FormGroup({
      reminderMessage: new FormControl(''),
      reminderStartDate: new FormControl(''),
      reminderStartTime: new FormControl(''),
      guestList: new FormControl('')
    });

    this.afterEventForm = new FormGroup({
      afterEventMessage: new FormControl(''),
      listOfGuest: new FormControl('')
    })



    this.initMenuSlider()
    this.selectedIndex = 0
  }


  public changeSuccessMessage() {
    this._success.next(`Copied!!`);
  }


  initMenuSlider() {

    setTimeout(() => {
      this.$slideContainter = $('.my-event-tab-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        focusOnSelect: true,
        centerMode: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            }
          },
        ],
      })
      this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide, previousSlide) => {
        // $('.tab-name').removeClass('active');
        console.log("currentSlide", currentSlide)
        console.log("nextSlide", nextSlide)
        console.log("previousSlide", previousSlide);
        // let slidesLength = slick.$slides.length - 1,
        //   isCurrentFirstOrLast = currentSlide === 0 || currentSlide === slidesLength,
        //   isNextFirstOrLast = nextSlide === 0 || nextSlide === slidesLength;


        // console.log("slidesLength", slidesLength)
        // console.log("currentSlide === 0", currentSlide === 0);
        // console.log("currentSlide === slidesLength", currentSlide === slidesLength);
        // console.log("nextSlide === 0", nextSlide === 0);
        // console.log("nextSlide === slidesLength", nextSlide === slidesLength);
        // if (isCurrentFirstOrLast && isNextFirstOrLast) {
        //   let nextClone = $(event.currentTarget).find('.slick-cloned.slick-active');
        //   setTimeout(function () {
        //     nextClone.addClass('slick-current');
        //   }, 100)
        // }
        // if(nextSlide == 4 ){
        //   $('.tab-name').removeClass('active');
        // }
        // if (currentSlide == 3) {
        //   $('#4').addClass('active');
        // }
        if (currentSlide == 0 && nextSlide == 4) {
          $('.tab-name').removeClass('active');
          $('#4').addClass('active');
        }
        if (currentSlide == 4 && nextSlide == 0) {
          $('.tab-name').removeClass('active');
          $('#0').addClass('active');
        }
        if (currentSlide == 3 && nextSlide == 4) {
          $('.tab-name').removeClass('active');
          $('#4').addClass('active');
        }
        if (currentSlide == 4 && nextSlide == 3) {
          $('.tab-name').removeClass('active');
          $('#3').addClass('active');
        }
        if (currentSlide == 0 && nextSlide == 1) {
          $('.tab-name').removeClass('active');
          $('#1').addClass('active');
        }
      })
      this.$slider.on('afterChange', (e, slick, currentSlide, nextSlide) => {
        this.selectedMenu(currentSlide)
        if (nextSlide == 4) {
          $('#4').addClass('active');
        }
      })
    }, 50)

  }



  ngOnChanges(changes: SimpleChanges) {

    console.log("display link of event", changes.eventLink);
    if (changes.eventLink && changes.eventLink.currentValue) {
      this.displayEventLink = changes.eventLink.currentValue.eventLink
      this.eventId = changes.eventLink.currentValue.eventId
      this.getEventDetails(this.eventId)
    }

  }

  getEventDetails(eventId) {
    this.eventService.getEventDetails(eventId).subscribe((response: any) => {
      console.log("response of event in link page", response);
      this.eventDetails = response.data
      let checkMessage = response.data.afterEventMessage
      console.log("details of message", checkMessage);

      if (checkMessage && checkMessage.afterEventMessage) {
        this.afterEventMessage = response.data.afterEventMessage
        if (this.afterEventMessage && this.afterEventMessage.listOfGuest) {
          console.log("call thia ");
          let valueOfGuest = this.afterEventMessage.listOfGuest
          this.afterEventForm.patchValue({
            listOfGuest: valueOfGuest
          })
          this.afterEventForm.get('listOfGuest').updateValueAndValidity()
          if (valueOfGuest == 'totalList') {
            console.log("call this or not", valueOfGuest);
            this.afterAll = valueOfGuest
          } else {
            this.afterBuy = valueOfGuest
          }
        }
      }
      if (checkMessage && checkMessage.attachment) {
        this.imgURL = this.path + checkMessage.attachment
      }
      console.log("what is in after event mesaage details", this.afterEventMessage)
      this.invitatationMessage = response.data.invitationMessage
      this.payMessage = response.data.payMessage
      this.welcomeMessage = response.data.welcomeMessage
      this.reminderDetails = response.data.reminderDetails
      if (this.reminderDetails != null) {
        this.displayReminderItems(this.reminderDetails)
      }
    }, error => {
      console.log("error while get details");
    })
  }

  displayReminderItems(details) {
    this.displayDate = details.reminderStartDate
    this.reminderForm.patchValue({
      reminderStartTime: this.displayDate
    })
    this.reminderForm.get('reminderStartTime').updateValueAndValidity()
    this.displayTime = details.reminderStartTime
    if (this.displayTime) {
      this.reminderForm.patchValue({
        reminderStartTime: this.displayTime
      })
      this.reminderForm.get('reminderStartTime').updateValueAndValidity()
      this.timePickerClosed()
    }
    if (this.reminderDetails && this.reminderDetails.guestList) {
      console.log("call thia ");
      let valueOfGuest = this.reminderDetails.guestList
      this.reminderForm.patchValue({
        guestList: valueOfGuest
      })
      this.reminderForm.get('guestList').updateValueAndValidity()
      if (valueOfGuest == 'allList') {
        console.log("call this or not", valueOfGuest);
        this.isAll = valueOfGuest
      } else {
        this.isOnly = valueOfGuest
      }
    }
  }

  changeEventLink(link) {
    console.log("if inviation message is null", this.invitatationMessage);

    console.log("link of evnt", link);
    let whatsup = 'WP'
    let google = 'GM'
    let facebookLink = 'FB'
    let textMessage = 'TX'

    let whatsupLink = link + '/' + whatsup
    let googleLink = link + '/' + google
    let faceBookLink = link + '/' + facebookLink
    let textMessageLink = link + '/' + textMessage

    if (this.invitatationMessage != null) {
      this.whatsupLink = this.invitatationMessage + '-' + whatsupLink
      this.googleLink = this.invitatationMessage + '-' + googleLink
      this.faceBookLink = this.invitatationMessage + '-' + faceBookLink
      this.textMessageLink = this.invitatationMessage + '-' + textMessageLink
    } else {
      this.whatsupLink = whatsupLink
      this.googleLink = googleLink
      this.faceBookLink = faceBookLink
      this.textMessageLink = textMessageLink
    }
    console.log("whats up link is ready", this.faceBookLink);
  }


  selectedMenu(i) {
    // this.currentIndex = i
    // console.log("index of menu", this.currentIndex, this.previousIndex);
    this.selectedIndex = i
    // if (this.currentIndex) {
    //   console.log("call or not");

    //   $('#vivek' + this.currentIndex).addClass('active')
    // }
    // if (this.previousIndex) {
    //   $('#vivek' + i).removeClass('active')
    // }

    if (i == 3) {
      this.index = 2
      this.getEventDetails(this.eventId)
    }
    if (i == 4) {
      this.getEventDetails(this.eventId)
      this.index = 3
    }
    if (i == 0) {
      this.index = 0
      this.getEventDetails(this.eventId)
    }
    if (i == 1) {
      this.getEventDetails(this.eventId)
      this.index = 4
    }
    if (i == 2) {
      this.index = 5
    }
  }


  addEvent(type: string, event) {
    this.displayDate = (new Date(event.value))
    console.log("value of form group", this.displayTime);
    this.reminderMessageSend()
  }

  timeChanged(event) {
    this.displayTime = event
    console.log("selected time", this.displayTime);
    this.reminderForm.patchValue({
      reminderStartTime: this.displayTime
    })
    this.reminderForm.get('reminderStartTime').updateValueAndValidity()
    this.reminderMessageSend()
  }

  timePickerClosed() {
    let tempTime = this.displayTime.split(':')
    let final = tempTime[1].split(' ')[1]
    console.log("final am or pm", final);
    this.timeHour = final
    this.hours = tempTime[0]
    this.minutes = tempTime[1].split(' ')[0]
    console.log("event of time pickert", this.displayTime);
  }

  addInvitationMesage() {
    let inviteMessage = this.invitatationMessage
    console.log("focuus out event", inviteMessage);
    let message = {
      invitationMessage: this.invitatationMessage,
      eventId: this.eventId
    }
    this.eventService.addInviationMessage(message).subscribe((response) => {
      console.log("invitation message added", response);
      this.changeEventLink(this.displayEventLink)
    }, error => {
      console.log("error while set message", error);

    })
  }


  addWelcomeMessage() {
    let welcome = this.welcomeMessage
    console.log("changes in welcome message", welcome)
    let data = {
      welcomeMessage: this.welcomeMessage,
      eventId: this.eventId
    }
    this.eventService.addWelcomeMessage(data).subscribe((response) => {
      console.log("respinse of welcome message added", response)
    }, error => {
      console.log("errror while add welcome", error)
    })
  }


  enterPayMessage() {
    let message = {
      payMessage: this.payMessage,
      eventId: this.eventId
    }
    this.eventService.addPayMessage(message).subscribe((response) => {
      console.log("pay message added", message);
    }, error => {
      console.log("error while add pay message", error);

    })
  }

  shareLink(no) {
    console.log("invitation message", this.invitatationMessage);
    let message = {
      invitationMessage: this.invitatationMessage,
      eventId: this.eventId
    }
    this.eventService.addInviationMessage(message).subscribe((response) => {
      console.log("invitation message added", response);
      this.changeEventLink(this.displayEventLink)
      this.index = no
    }, error => {
      console.log("error while set message", error);

    })
  }


  selectList(event) {
    console.log("value of selected list", event.target.id);
    let selected = event.target.id
    this.reminderForm.patchValue({
      guestList: selected
    })
    this.reminderForm.get('guestList').updateValueAndValidity()
    console.log("value of reminder form", this.reminderForm.value);
    this.eventService.setReminderMessage(this.reminderForm.value, this.eventId).subscribe((response) => {
      console.log("reminder message set", response);
    }, error => {
      console.log("error while set reminder", error);

    })

  }


  reminderMessageAdd() {
    let messageData = this.reminderForm.get('reminderMessage').value
    console.log("what is the data", messageData);

    this.reminderForm.patchValue({
      reminderMessage: messageData
    })
    this.reminderForm.get('reminderMessage').updateValueAndValidity()
    this.reminderMessageSend()
  }


  reminderdate() {
    let messageDate = this.reminderForm.get('reminderStartDate').value
    console.log("date for check", messageDate);
  }

  checkAfterMessage() {
    let data = this.afterEventForm.get('afterEventMessage').value

    this.afterEventForm.patchValue({
      afterEventMessage: data
    })
    this.afterEventForm.get('afterEventMessage').updateValueAndValidity()
    console.log("after event message form", this.afterEventForm.value);
    this.afterEventMessageSend()
  }


  afterEventList(event) {
    let selected = event.target.id
    this.afterEventForm.patchValue({
      listOfGuest: selected
    })
    this.afterEventForm.get('listOfGuest').updateValueAndValidity()
    this.afterEventMessageSend()
  }

  reminderMessage(data) {
    this.index = data
  }

  reminderMessageSend(index?) {
    console.log("details of reminder message", this.reminderForm.value);
    this.eventService.setReminderMessage(this.reminderForm.value, this.eventId).subscribe((response) => {
      if (index) {
        this.index = index
      }
      console.log("response of reminder message", response);
    }, error => {
      console.log("error while set reminer message", error);

    })
  }

  updateReminder(index) {
    this.eventService.updateReminder(this.reminderForm.value, this.eventId).subscribe((response) => {
      console.log("response of update reminder", response);
      this.index = index
    }, error => {
      console.log("error while update respose", error)
    })
  }


  afterEventMessageSend(index?) {
    this.eventService.setAfterEventMessage(this.afterEventForm.value, this.eventId).subscribe((response) => {
      console.log("response of after event", response);
      if (index) {
        this.index = index
      }
    }, error => {
      console.log("error while set after message", error);

    })
  }

  getafterEventMessage(data) {
    this.eventService.getAfterEventMessage(this.eventId).subscribe((response: any) => {
      console.log("after event message display", response);
      this.afterEventMessage = response
      this.index = data
    }, error => {
      console.log("error while get after event message", error);

    })
  }



  openModel() {

    $('#infoItemModal').modal("show")


    // console.log("call this", item)
    // let data = {
    //   evenntId: this.eventId,
    //   // description: item.description
    // }
    // var addBank = this.openDialog(AttachMentComponent, data).subscribe((response) => {
    //   console.log("what is in response", response);
    // })
  }

  openDialog(someComponent, data = {}): Observable<any> {
    console.log("OPENDIALOG", "DATA = ", data);
    const dialogRef = this.dialog.open(someComponent, { data });
    return dialogRef.afterClosed();
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
  AddAttchment() {
    console.log("call this");
    this.eventService.afterEventAttachment(this.files[0], this.eventId).subscribe((response) => {
      console.log("attachment added in after event", response)
      $('#infoItemModal').modal("hide")
    }, error => {
      console.log("error while add attachment", error)
    })




  }
}
