import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent, MatCalendar } from '@angular/material/datepicker';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


declare var $;
@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrls: ['./event-activity.component.css']
})
export class EventActivityComponent implements OnInit {
  @ViewChild(MatCalendar, { static: true }) _datePicker: MatCalendar<Date>
  activityForm: FormGroup;
  activityId
  createdActivity: any;

  today = new Date()
  currentDay = new Date()
  currentYear = this.today.getFullYear()
  maxYear = new Date(this.today.setFullYear(this.today.getFullYear() + 10)).getFullYear();
  sub: any;
  eventId: any;
  createdEventDetails: any;
  eventActivities: any;
  events: string[] = [];
  displayTime: any = [];
  finalDate: any = [];
  hashTag = sessionStorage.getItem('hasTag');
  isLoad = false
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public _eventService: EventService,
    public alertService: AlertService,
    public dateFilter: DatePipe
  ) {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.eventId = params.id;
        console.log("created event id", this.eventId);
        // this.viewDetailsOfEvent(this.eventId);
      }
    })
  }

  ngOnInit() {
    console.log("today date=======", this.hashTag)
    $('.wrapper').on('click', '.remove', function () {
      $('.remove').closest('.wrapper').find('.element').not(':first').last().remove();
    });
    $('.wrapper').on('click', '.clone', function () {
      $('.clone').closest('.wrapper').find('.element').first().clone().appendTo('.inner-box');
    });
    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4'
    });



    this.getActivityFrom()

  }

  addEvent(type: string, event, i) {

    console.log("event ma su ave che", this.displayTime)
    this.displayTime[i] = (new Date(event.value))
    console.log("final time to display", this.displayTime)
  }

  get activityFormData() { return <FormArray>this.activityForm.get('activity'); }

  selectDate(event) {
    console.log("call thay che ke nai", event)
  }

  getDate(event) {
    console.log("event call==========");
    console.log("event details==========", event)
    $('#activityStartDate').datepicker().on('dp.change', function (e) {
      console.log(e)
    })

  }


  /**
   * @param {JSON} createdActivity
   * Edit event activities 
   */
  getActivityFrom(createdActivity?) {
    console.log("update activity details", createdActivity);
    this.activityForm = new FormGroup({
      activity: this.fb.array(this.activityArray(createdActivity))
    });
  }

  /**
   * @param {String} activities
   *  To create new activity
   */
  activityArray(activities?: any[]) {
    console.log("activities", activities);
    if (!activities) {
      console.log("ama ave che ke nau");
      return [this.fb.group({
        activityName: new FormControl(''),
        activityStartDate: new FormControl(''),
        eventId: new FormControl(this.eventId)
      })]
    }
    /**
     * To edit created activities
     */
    let actArray = [];
    for (let i = 0; i < activities.length; i++) {
      actArray.push(this.fb.group({
        activityId: new FormControl(activities[i]._id),
        activityName: new FormControl(activities[i].activityName),
        activityStartDate: new FormControl(activities[i].activityStartDate.split("T")[0]),
        eventId: new FormControl(activities[i].eventId)
      }))
    }
    return actArray;
  }


  /**
   * @param {String} i
   * To remove added activity field 
   */
  removeActivityField(i: number, id): void {
    console.log("activity id", id)
    if (!id.activityId) {
      const control = <FormArray>this.activityForm.controls.activity;
      control.removeAt(i);
      this.displayTime.splice(i, 1)
      console.log("at the end date group", this.displayTime);

    }
    else {
      console.log("else part ma avu joye baki");

      //   console.log(id);
      //   // let event = this.eventId;
      //   console.log(event);
      //   this._eventService.removeActivity(id)
      //     .subscribe((data: any) => {
      //       console.log(data);
      //       this.createdActivity = data.data.activities
      //       this.getActivityFrom(this.createdActivity);
      //     }, err => {
      //       console.log(err);
      //     })
    }
  }


  /**
   * Add activity field with name,date 
   */
  addActivityField(): void {
    console.log("Form fields", this.activityForm.value);

    const control = <FormArray>this.activityForm.controls.activity;
    console.log("control ma su ave che", control.length)
    control.push(this.fb.group({
      activityName: new FormControl(''),
      activityStartDate: new FormControl(''),
      eventId: new FormControl(this.eventId)
    }));
    // setTimeout(() => {
    console.log($('#activityStartDate' + (control.length - 2)).val());
    let secondDate = $('#activityStartDate' + (control.length - 2)).val()
    console.log("selected second date", secondDate)
    this.currentDay = new Date(secondDate)
    // }, 200)

    //  (this.activityForm.value)
  }





  /**
   * Create new activities for new event 
   */
  addActivity() {
    this.isLoad = true;
    for (let i = 0; i < this.activityForm.value.activity.length; i++) {
      this.activityForm.value.activity[i].activityStartDate = moment($('#activityStartDate' + i).val()).format('YYYY-MM-DD')
      // this.activityForm.value.activity[i].activityStartDate = new Date($('#activityStartDate' + i).val()).toISOString()
      // this.activityForm.value.activity[i].activityEndDate = $('#activityEndDate' + i).val();
    }
    console.log("activity details", this.activityForm.value);
    this._eventService.addActivities(this.activityForm.value)
      .subscribe((data: any) => {
        // let activityArraySend = []

        this.isLoad = false;
        this.router.navigate(['/eventGroup/' + this.eventId], { state: [data.data] })
        console.log("activity add in database completed", data)
        this.alertService.getSuccess(data.message)
        // console.log("activity response data", data);
        // this.createdActivity = data.data;
        // this.groupLength = this.createdActivity.length;
        // console.log(this.createdActivity.length);
        // _.forEach(this.createdActivity, (date) => {
        //   this.activityStartDate = date.activityStartDate;
        //   this.activityEndDate = date.activityEndDate;
        //   console.log(this.activityStartDate, this.activityEndDate)
        // })
        // console.log(this.selectedStartDate);
        console.log("created activity response from server", this.createdActivity);
        // this.initGroupForm(this.createdActivity);
      }, (err: any) => {
        // this.isLoad = false;
        // console.log(err);
        // this.alertService.getError(err.message);
      })
  }




  /** 
   * @param {String} eventId
   * To get all details of particular event 
   */
  viewDetailsOfEvent(eventId) {
    // this._eventService.getEventDetails(eventId)
    // .subscribe((data: any) => {
    // console.log("created event details ", data);
    // this.createdEventDetails = data.data;
    // $('.selected_event_type > a').html(this.createdEventDetails.eventType);
    // this.eventForm.controls.eventType.setValue(this.createdEventDetails.eventType);
    // this.eventForm.controls.isPublic.setValue(this.createdEventDetails.isPublic);
    // this.imgURL = this.path + this.createdEventDetails.profilePhoto
    // this.themeURL = this.path + this.createdEventDetails.eventTheme
    // this.selectedStartDate = this.createdEventDetails.startDate.split("T")[0];
    // console.log(this.selectedStartDate);
    // this.selectedEndDate = this.createdEventDetails.endDate.split("T")[0];
    // console.log(this.selectedEndDate);
    // this.paymentDeadlineDate = this.createdEventDetails.paymentDeadlineDate.split("T")[0];
    // console.log(this.paymentDeadlineDate);
    //   this.eventActivities = this.createdEventDetails.activity;
    //   console.log(this.eventActivities);
    // }, (err: any) => {
    //   console.log(err);
    // this.alertService.getError(err.message);
    // })
  }
}