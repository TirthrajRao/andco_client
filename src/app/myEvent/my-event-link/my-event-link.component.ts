import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { EventService } from '../../services/event.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoginComponent } from 'src/app/login/login.component';
// import { LOADIPHLPAPI } from 'dns';
declare var $;
@Component({
  selector: 'app-my-event-link',
  templateUrl: './my-event-link.component.html',
  styleUrls: ['./my-event-link.component.css', './../my-event-activity/my-event-activity.component.css']
})
export class MyEventLinkComponent implements OnInit {

  private _success = new Subject<string>();
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  staticAlertClosed = false;
  successMessage: string;
  reminderForm: FormGroup;
  currentDay = new Date()
  @Input('eventLink') eventLink
  $slider
  $slideContainter
  displayEventLink
  displayDate: Date;
  displayTime
  index = 0
  selectedIndex
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
  eventLinkMenu = ["invitation", "Welcome", "Pay", "Remainder", "After Event"]
  isAll
  isOnly
  constructor(
    public eventService: EventService,
    public activated: ActivatedRoute
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
        infinite: false,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],
      })
    }, 50)
  }



  ngOnChanges(changes: SimpleChanges) {

    console.log("display link of event", changes.eventLink);
    this.displayEventLink = changes.eventLink.currentValue.eventLink

    this.eventId = changes.eventLink.currentValue.eventId
    this.getEventDetails(this.eventId)
  }

  getEventDetails(eventId) {
    this.eventService.getEventDetails(eventId).subscribe((response: any) => {
      console.log("response of event in link page", response);
      this.afterEventMessage = response.data.afterEventMessage
      this.invitatationMessage = response.data.invitationMessage
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
    // if (details.guestList == 'allList') {
    //   console.log("call this or not", details.guestList);
    //   this.isChecked = true
    //   $('input:radio[id="allList"]').prop('checked', true);

    //   // document.getElementById("allList").checked;
    // } else if (details.guestList == 'buyList') {
    //   this.isChecked = true
    //   console.log("or this===========", details.guestList);
    //   $('input:radio[id="buyList"]').prop('checked', true);
    // }
    this.displayDate = details.reminderStartDate
    this.displayTime = details.reminderStartTime
    if (this.displayTime) {
      this.timePickerClosed()
    }
    // setTimeout(() => {

    // },100)


  }

  changeEventLink(link) {
    console.log("link of evnt", link);
    let whatsup = 'WP'
    let google = 'GM'
    let facebookLink = 'FB'
    let textMessage = 'TX'

    let whatsupLink = link + '/' + whatsup
    let googleLink = link + '/' + google
    let faceBookLink = link + '/' + facebookLink
    let textMessageLink = link + '/' + textMessage

    this.whatsupLink = this.invitatationMessage + '-' + whatsupLink
    this.googleLink = this.invitatationMessage + '-' + googleLink
    this.faceBookLink = this.invitatationMessage + '-' + facebookLink
    this.textMessageLink = this.invitatationMessage + '-' + textMessageLink

    console.log("whats up link is ready", this.textMessageLink);
  }


  selectedMenu(i) {
    console.log("index of menu", i);
    this.selectedIndex = i
    if (i == 3) {
      this.index = 2
      console.log("call this or not", this.reminderDetails);
      let valueOfGuest = this.reminderDetails.guestList
      if (valueOfGuest == 'allList') {
        console.log("first one", valueOfGuest);
        $('input:radio[id="allList"]').prop('checked', true);
        // this.isAll = true
        // this.isOnly = false
      } else {
        console.log("second=========== one", valueOfGuest);
        // this.isOnly = true
        // this.isAll = false
      }
    }
    if (i == 4) {
      this.index = 3
      // if (this.reminderDetails != null)

      // this.displayReminderItems(this.reminderDetails)
    }
    if (i == 0) {
      this.index = 0
    }
    if (i == 1) {
      this.index = 4
    }
    if (i == 2) {
      this.index = 5
    }
  }


  addEvent(type: string, event) {
    this.displayDate = (new Date(event.value))
    console.log("value of form group", this.displayTime);
  }

  timeChanged(event) {
    this.displayTime = event
    console.log("selected time", this.displayTime);

    this.reminderForm.patchValue({
      reminderStartTime: this.displayTime
    })
    this.reminderForm.get('reminderStartTime').updateValueAndValidity()

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
    // if (selected == 'test7') {
    //   this.setPriceForm.patchValue({
    //     isLogistics: 'true'
    //   })
    // } else {
    //   this.setPriceForm.patchValue({
    //     isLogistics: 'false'
    //   })
    // }
  }


  reminderMessage(data) {
    this.index = data
  }

  reminderMessageSend(index) {
    console.log("details of reminder message", this.reminderForm.value);
    this.eventService.setReminderMessage(this.reminderForm.value, this.eventId).subscribe((response) => {
      this.index = index
      console.log("response of reminder message", response);
    }, error => {
      console.log("error while set reminer message", error);

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

}
