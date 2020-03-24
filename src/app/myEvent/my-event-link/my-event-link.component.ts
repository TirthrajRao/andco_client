import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { EventService } from '../../services/event.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  eventLinkMenu = ["invitation", "Welcome", "Pay", "Remainder", "After Event"]
  constructor(
    public eventService: EventService,
    public activated: ActivatedRoute
  ) { }

  ngOnInit() {

    // alertForCopy start
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(100000)
    ).subscribe(() => this.successMessage = null);
    // alertForCopy end

    this.reminderForm = new FormGroup({
      reminderMessage: new FormControl(''),
      reminderStartDate: new FormControl(''),
      reminderStartTime: new FormControl('')
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
    this.changeEventLink(this.displayEventLink)
    this.eventId = changes.eventLink.currentValue.eventId
    this.getEventDetails(this.eventId)
  }

  getEventDetails(eventId) {
    this.eventService.getEventDetails(eventId).subscribe((response: any) => {
      console.log("response of event in link page", response);
      this.afterEventMessage = response.data.afterEventMessage
    }, error => {
      console.log("error while get details");

    })
  }

  changeEventLink(link) {
    console.log("link of evnt", link);
    let whatsup = 'WP'
    let google = 'GM'
    let facebookLink = 'FB'
    let textMessage = 'TX'

    this.whatsupLink = link + '/' + whatsup
    this.googleLink = link + '/' + google
    this.faceBookLink = link + '/' + facebookLink
    this.textMessageLink = link + '/' + textMessage
    console.log("whats up link is ready", this.textMessageLink);
  }


  selectedMenu(i) {
    console.log("index of menu", i);
    this.selectedIndex = i
    if (i == 3) {
      this.index = 2
    }
    if (i == 4) {
      this.index = 3
    }
    if (i == 0) {
      this.index = 0
    }
  }


  addEvent(type: string, event) {
    this.displayDate = (new Date(event.value))
    console.log("value of form group", this.displayTime);
  }

  timeChanged(event) {
    this.displayTime = event
    console.log("selected time", this.displayTime);

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
    this.index = no
    // $('.step-1-link').css({ 'display': 'none' })
    // $('.step-2-link').css({ 'display': 'block' })
  }


  reminderMessage(data) {
    this.index = data
  }

  reminderMessageSend(index) {
    this.index = index
    console.log("details of reminder message", this.reminderForm.value);

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
