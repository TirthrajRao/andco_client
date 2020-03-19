import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../../services/event.service';
declare var $;
@Component({
  selector: 'app-my-event-link',
  templateUrl: './my-event-link.component.html',
  styleUrls: ['./my-event-link.component.css', './../my-event-activity/my-event-activity.component.css']
})
export class MyEventLinkComponent implements OnInit {

  reminderForm: FormGroup;
  currentDay = new Date()
  @Input('eventLink') eventLink
  displayEventLink
  displayDate: Date;
  displayTime
  index = 0
  eventId
  afterEventMessage
  hours: any;
  minutes: any;
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {

    this.reminderForm = new FormGroup({
      reminderMessage: new FormControl(''),
      reminderStartDate: new FormControl(''),
      reminderStartTime: new FormControl('')
    });


    $('.my-event-tab-slider').not('.slick-initialized').slick({
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
    });
  }


  ngOnChanges(changes: SimpleChanges) {

    console.log("display link of event", changes.eventLink);
    this.displayEventLink = changes.eventLink.currentValue.eventLink
    this.eventId = changes.eventLink.currentValue.eventId
  }


  addEvent(type: string, event, i) {
    this.displayDate = (new Date(event.value))
    console.log("value of form group", this.displayTime);
  }

  timeChanged(event) {
    this.displayTime = event
  }

  timePickerClosed(){
    let tempTime = this.displayTime.split(':')
    this.hours = tempTime[0]
    this.minutes = tempTime[1].split(' ')[0]
    console.log("event of time pickert", this.displayTime);
  }

  shareLink() {
    $('.step-1-link').css({ 'display': 'none' })
    $('.step-2-link').css({ 'display': 'block' })
  }


  reminderMessage(data) {
    this.index = data
  }

  reminderMessageSend() {
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
