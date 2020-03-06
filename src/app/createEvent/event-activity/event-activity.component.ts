import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
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
  @ViewChild('picker', { static: true }) datePicker: MatDatepicker<Date>;

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
  activityName: any = []
  displayActivity
  isDisable = false
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

        // this.viewDetailsOfEvent(this.eventId);
      }
    })
  }

  ngOnInit() {
    // console.log("today date=======", this.hashTag)
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
    this.displayTime[i] = (new Date(event.value))
    for (let i = 0; i < this.activityForm.value.activity.length; i++) {
      this.activityForm.value.activity[i].activityStartDate = moment($('#activityStartDate' + i).val()).format('YYYY-MM-DD')
    }
    console.log("value of form group", this.activityForm);

  }

  get activityFormData() { return <FormArray>this.activityForm.get('activity'); }

  selectDate(event) {

  }

  getDate(event) {


    $('#activityStartDate').datepicker().on('dp.change', function (e) {

    })

  }


  /**
   * @param {JSON} createdActivity
   * Edit event activities 
   */
  getActivityFrom(createdActivity?) {

    this.activityForm = new FormGroup({
      activity: this.fb.array(this.activityArray(createdActivity))
    });
  }

  /**
   * @param {String} activities
   *  To create new activity
   */
  activityArray(activities?: any[]) {

    if (!activities) {
      return [this.fb.group({
        activityName: new FormControl('', Validators.required),
        activityStartDate: new FormControl('', Validators.required),
        eventId: new FormControl(this.eventId)
      })]
    }
    /**
     * To edit created activities
     */
    // let actArray = [];
    // for (let i = 0; i < activities.length; i++) {
    //   actArray.push(this.fb.group({
    //     activityId: new FormControl(activities[i]._id),
    //     activityName: new FormControl(activities[i].activityName),
    //     activityStartDate: new FormControl(activities[i].activityStartDate.split("T")[0]),
    //     eventId: new FormControl(activities[i].eventId)
    //   }))
    // }
    // return actArray;
  }


  /**
   * @param {String} i
   * To remove added activity field 
   */
  removeActivityField(i: number, id): void {
    if (!id.activityId) {
      const control = <FormArray>this.activityForm.controls.activity;
      control.removeAt(i);
      this.displayTime.splice(i, 1)
      this.activityName.splice(i, 1)
      var dates = control.value.map(function (x) { return new Date(x.activityStartDate); })
      var earliest = new Date(Math.min.apply(null, dates));
      console.log("ear =====>", earliest);
      this.currentDay = earliest
    }
    else {
    }
  }


  /**
   * Add activity field with name,date 
   */
  addActivityField(): void {

    let activityNameOf = this.activityFormData.value

    const newArray = activityNameOf[activityNameOf.length - 1]

    this.activityName.push(newArray.activityName)
    const control = <FormArray>this.activityForm.controls.activity;

    control.push(this.fb.group({
      activityName: new FormControl('', Validators.required),
      activityStartDate: new FormControl('', Validators.required),
      eventId: new FormControl(this.eventId)
    }));
    console.log("form group total item", this.activityForm);
    if (control.length <= 2) {
      let secondDate = $('#activityStartDate' + (control.length - 2)).val()
      this.currentDay = new Date(secondDate)
    }
  }

  checkActivityName(event, dynamic) {
    let arrayName = this.activityName.includes(event.target.value)

    let message = document.getElementById(dynamic);
    if (arrayName == true) {
      this.displayActivity = false

      message.innerHTML = "Activity Name must be unique";
    } else if (arrayName == false) {
      this.displayActivity = true
      message.innerHTML = ""

    }
  }



  /**
   * Create new activities for new event 
   */
  addActivity() {
    this.isLoad = true;
    // for (let i = 0; i < this.activityForm.value.activity.length; i++) {
    //   this.activityForm.value.activity[i].activityStartDate = moment($('#activityStartDate' + i).val()).format('YYYY-MM-DD')
    // }

    this._eventService.addActivities(this.activityForm.value)
      .subscribe((data: any) => {
        this.isLoad = false;
        this.router.navigate(['/eventGroup/' + this.eventId], { state: [data.data] })
        this.alertService.getSuccess(data.message)
      }, (err: any) => {
        this.isLoad = false;
      })
  }




  /** 
   * @param {String} eventId
   * To get all details of particular event 
   */
  viewDetailsOfEvent(eventId) {
  }


  openDatePicker(i) {
    this.datePicker.open();
  }

}