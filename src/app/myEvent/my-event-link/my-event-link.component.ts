import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../../services/event.service';
declare var $;
@Component({
  selector: 'app-my-event-link',
  templateUrl: './my-event-link.component.html',
  styleUrls: ['./my-event-link.component.css','./../my-event-activity/my-event-activity.component.css']
})
export class MyEventLinkComponent implements OnInit {

  reminderForm: FormGroup;
  currentDay = new Date()
  @Input('eventLink') eventLink
  displayEventLink
  displayTime: Date;
  constructor() { }

  ngOnInit() {

    this.reminderForm = new FormGroup({
      reminderMessage: new FormControl(''),
      reminderStartDate: new FormControl(''),
      reminderStartTime: new FormControl('')
    })






    $('.my-event-tab-slider').not('.slick-initialized').slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: false,
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
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        },
      ],
    });
  }


  ngOnChanges(changes: SimpleChanges) {

    console.log("display link of event", changes.eventLink);
    this.displayEventLink = changes.eventLink.currentValue
  }


  addEvent(type: string, event, i) {
    this.displayTime = (new Date(event.value))
    // for (let i = 0; i < this.activityForm.value.activity.length; i++) {
    //   this.activityForm.value.activity[i].activityStartDate = moment($('#activityStartDate' + i).val()).format('YYYY-MM-DD')
    // }
    console.log("value of form group", this.displayTime);

  }


  shareLink() {
    $('.step-1-link').css({ 'display': 'none' })
    $('.step-2-link').css({ 'display': 'block' })
  }


  reminderMessage() {
    $('.step-1-link').css({ 'display': 'none' })
    $('.step-2-link').css({ 'display': 'none' })
    $('.step-3-link').css({ 'display': 'block' })
  }

  reminderMessageSend() {
    console.log("details of reminder message", this.reminderForm.value);

  }

}
