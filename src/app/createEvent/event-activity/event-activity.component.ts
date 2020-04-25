import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import { DatePipe, getLocaleFirstDayOfWeek } from '@angular/common';
import * as moment from 'moment';


declare var $;
@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrls: ['./event-activity.component.css']
})
export class EventActivityComponent implements OnInit {
  @ViewChild('picker', { static: true }) datePicker: MatDatepicker<Date>;
  @ViewChild('activities', { static: false }) activities: ElementRef;
  @ViewChild('anotherOne', { static: true }) anotherOne: ElementRef
  activityForm: FormGroup;
  activityId
  createdActivity: any;
  today = new Date()
  currentDay
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
    public loginService: LoginService,
    public dateFilter: DatePipe,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.eventId = params.id;
        this.viewDetailsOfEvent(this.eventId);
        this.getActivityFrom()
      }
    })

  }
  ngOnInit() {
    // this.scrollToBottom()
    // console.log("today date=======", this.hashTag)

    $('.wrapper').on('click', '.remove', function () {
      $('.remove').closest('.wrapper').find('.element').not(':first').last().remove();
    });
    $('.wrapper').on('click', '.clone', function () {
      $('.clone').closest('.wrapper').find('.element').first().clone().prepend('.inner-box');
    });

    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4'
    });



    // this.getActivityFrom()

  }





  addEvent(type: string, event, i) {
    this.displayTime[i] = (new Date(event.value))
    for (let i = 0; i < this.activityForm.value.activity.length; i++) {
      this.activityForm.value.activity[i].activityStartDate = moment($('#activityStartDate' + i).val()).format('YYYY-MM-DD')
      this.displayActivity = true
    }

    console.log("value of form group", this.activityForm);
    const keys = Object.keys(this.activityForm.controls);
    let form = this.activityForm.controls;
    keys.every((element, value) => {
      if (form[element].status == 'INVALID') {
        // flag = 1;
        this.displayActivity = false
        return false
      }
      else {
        this.displayActivity = true
        return true
      }
    });

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
    console.log("details of activity", createdActivity);

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
    else {
      let actArray = [];
      for (let i = 0; i < activities.length; i++) {
        console.log("index i ==", i, activities[i]);
        actArray.push(this.fb.group({
          activityId: new FormControl(activities[i]._id),
          activityName: new FormControl(activities[i].activityName),
          activityStartDate: new FormControl(activities[i].activityStartDate),
          eventId: new FormControl(this.eventId)
        }))
      }

      console.log("form group :::::", this.activityForm.value);
      return actArray;
    }

  }


  /**
   * @param {String} i
   * To remove added activity field 
   */
  removeActivityField(i: number, id): void {
    console.log("id of activity", id);
    this.displayActivity = true
    if (!id.activityId) {
      const control = <FormArray>this.activityForm.controls.activity;
      control.removeAt(i);
      this.displayTime.splice(i, 1)
      this.activityName.splice(i, 1)
      var dates = control.value.map(function (x) { return new Date(x.activityStartDate); })
      var earliest = new Date(Math.min.apply(null, dates));
      console.log("ear =====>", earliest);
      // this.currentDay = earliest
    }
    else {
      // console.log("call this", id);
      this._eventService.removeActivity(id).subscribe((response: any) => {
        console.log("activity remove completed", response);
        const control = <FormArray>this.activityForm.controls.activity;
        control.removeAt(i);
        this.displayTime.splice(i, 1)
        this.activityName.splice(i, 1)
        var dates = control.value.map(function (x) { return new Date(x.activityStartDate); })
        var earliest = new Date(Math.min.apply(null, dates));
        console.log("ear =====>", earliest);
        // this.currentDay = earliest
        // this.eventActivities = response.data.activities
        // this.getActivityFrom(this.eventActivities)
      }, error => {
        console.log("activity error when remove", error);

      })
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
    console.log("length of form", this.activityFormData.controls);

    this.displayActivity = false
    console.log("form group total item", this.activityForm);
    if (control.length <= 2) {
      let secondDate = $('#activityStartDate' + (control.length - 2)).val()
      // this.currentDay = new Date(secondDate)
    }

    $(document).ready(() => {
      var elem = $('#scrollHere-' + (this.activityFormData.controls.length - 1));
      console.log("what is elem =======", elem);

      console.log("elem.offset().top", elem.offset().top);
      if (elem) {
        $('.inner-box').scrollTop(elem.offset().top);

        $('.inner-box').scrollLeft(elem.offset().left);
      }
    })
  }

  checkActivityName(event, dynamic) {
    let arrayName = this.activityName.includes(event.target.value)
    console.log("what is in array name", arrayName);
    let message = document.getElementById(dynamic);
    if (arrayName == true) {
      this.displayActivity = false
      message.innerHTML = "Activity Name must be unique";
    } else if (arrayName == false) {
      const keys = Object.keys(this.activityForm.controls);
      let form = this.activityForm.controls;
      keys.every((element, value) => {
        console.log("what is in element", this.activityForm);
        if (form[element].status == 'INVALID') {
          // flag = 1;
          this.displayActivity = false
          return false
        }
        else {
          this.displayActivity = true
          return true
        }
      });
      // this.displayActivity = false
      message.innerHTML = ""

    }

  }



  /**
   * Create new activities for new event 
   */
  addActivity() {
    this.isLoad = true;
    this._eventService.addActivities(this.activityForm.value)
      .subscribe((data: any) => {
        this.isLoad = false;

        let routerData = '/eventGroup/' + this.eventId
        let output = this.loginService.returnLogin(routerData);
        if (output == true) {
          // this.router.navigate(['/myevent']);
          this.router.navigate(['/eventGroup/' + this.eventId])
        }
        // this.router.navigate(['/eventGroup/' + this.eventId], { state: [data.data] })
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
    this.isLoad = true
    this.isDisable = false
    this._eventService.getActivityDetails(eventId).subscribe((response: any) => {
      console.log("response of acitivty", response);
      if (response && !response.data.message) {
        this.eventActivities = response.data
        console.log("response of activity", this.eventActivities);
        this.eventActivities.forEach((element, index) => {
          console.log("elemtnt", element, index);
          this.activityName.push(element.activityName)
          this.displayTime.push(element.activityStartDate)
        });
        console.log("=============", this.activityName);
        var dates = this.eventActivities.map(function (x) { return new Date(x.activityStartDate); })
        var earliest = new Date(Math.min.apply(null, dates));
        console.log("ear =====>", earliest);
        let forNewDate = new Date()
        if (forNewDate > earliest) {
          console.log("first if condition")
          this.currentDay = earliest
        } else {
          console.log("call for last position");
          this.currentDay = forNewDate
        }
        // this.currentDay = earliest
        this.displayActivity = true
        this.getActivityFrom(this.eventActivities)
        this.isLoad = false
      } else {
        this.currentDay = new Date()
        this.getActivityFrom()
        // }
        console.log("log this or not");
        this.isLoad = false
        // this.currentDay = new Date()
      }
      // console.log("display time of activity", this.activityForm.value);

    }, error => {
      console.log("error while get activity", error);

    })
  }

  updateActivity() {
    this.isDisable = true
    console.log("value of activity while edit", this.activityForm.value);
    this._eventService.updateActivites(this.activityForm.value).subscribe((response: any) => {
      console.log("activity update completed", response);

      this.isDisable = false

      let routerData = '/eventGroup/' + this.eventId
      let output = this.loginService.returnLogin(routerData);
      if (output == true) {
        // this.router.navigate(['/myevent']);
        this.router.navigate(['/eventGroup/' + this.eventId])
      }
      // this.router.navigate(['/eventGroup/' + this.eventId])
    }, error => {
      console.log("error while update activity", error);
      this.isDisable = false

    })
  }

  backToEvent() {

    let routerData = '/editEvent/' + this.eventId
    let output = this.loginService.returnLogin(routerData);
    if (output == true) {
      // this.router.navigate(['/myevent']);
      this.router.navigate(['/editEvent/' + this.eventId])
    }
  }


  openDatePicker(i) {
    this.datePicker.open();
  }

}