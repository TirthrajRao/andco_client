import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

declare var $;
@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrls: ['./event-activity.component.css']
})
export class EventActivityComponent implements OnInit {
  activityForm: FormGroup;

  today = new Date()
  currentYear = this.today.getFullYear()
  maxYear = new Date(this.today.setFullYear(this.today.getFullYear() + 10)).getFullYear();
  month
  days = [{
    id: '',
    name: 'DAY'
  }];

  years = [{
    Id: '',
    Name: 'YEAR'
  }];
  months = [{
    Id: '',
    Name: 'MONTH'
  }, {
    Id: 0,
    Name: 'JANUARY'
  }, {
    Id: 1,
    Name: 'FEBRUARY'
  }, {
    Id: 2,
    Name: 'MARCH'
  }, {
    Id: 3,
    Name: 'APRIL'
  }, {
    Id: 4,
    Name: 'MAY'
  }, {
    Id: 5,
    Name: 'JUNE'
  }, {
    Id: 6,
    Name: 'JULY'
  }, {
    Id: 7,
    Name: 'AUGUST'
  }, {
    Id: 8,
    Name: 'SEPTEMBER'
  }, {
    Id: 9,
    Name: 'OCTOBER'
  }, {
    Id: 10,
    Name: 'NOVEMBER'
  }, {
    Id: 11,
    Name: 'DECEMBER'
  }];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log("today date=======", this.today)
    $('.wrapper').on('click', '.remove', function () {
      $('.remove').closest('.wrapper').find('.element').not(':first').last().remove();
    });
    $('.wrapper').on('click', '.clone', function () {
      $('.clone').closest('.wrapper').find('.element').first().clone().appendTo('.inner-box');
    });
    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4'
    });


    // DatePicker Format
    let x
    for (x = 1; x <= 31; x++) {
      this.days.push({ id: x, name: x })
    }

    for (x = this.currentYear; x <= this.maxYear; x++) {
      this.years.push({ Id: x, Name: x });
    }

    this.getActivityFrom()

  }

  get activityFormData() { return <FormArray>this.activityForm.get('activity'); }

  /**
   * @param {JSON} createdActivity
   * Edit event activities 
   */
  getActivityFrom(createdActivity?) {
    console.log("update activity details", createdActivity);
    this.activityForm = new FormGroup({
      activity: this.fb.array(this.activityArray(createdActivity))
    });
    // setTimeout(() => {
    //   $("#activityStartDate0").datepicker({
    //     minDate: new Date(),
    //     onClose: function () {
    //       $("#activityEndDate0").datepicker(
    //         "change",
    //         { minDate: new Date($('#activityStartDate0').val()) }
    //       );
    //     }
    //   });
    //   $("#activityEndDate0").datepicker({
    //     onClose: function () {
    //       $("#activityStartDate0").datepicker(
    //         "change",
    //         { maxDate: new Date($('#activityEndDate0').val()) }
    //       );
    //     }
    //   });
    // }, 200)
  }

  /**
   * @param {String} activities
   *  To create new activity
   */
  activityArray(activities?: any[]) {
    console.log("activities", activities);
    if (!activities) {
      return [this.fb.group({
        activityName: new FormControl(''),
        activityStartDate: new FormControl(''),
        // activityEndDate: new FormControl(''),
        // eventId: new FormControl(this.eventId)
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
        // activityEndDate: new FormControl(activities[i].activityEndDate.split("T")[0]),
        // eventId: new FormControl(activities[i].eventId)
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

    const control = <FormArray>this.activityForm.controls.activity;
    control.push(this.fb.group({
      activityName: new FormControl(''),
      activityStartDate: new FormControl(''),
      // activityEndDate: new FormControl(''),
      // eventId: new FormControl(this.eventId)
    }));
    // setTimeout(() => {
    //   console.log($('#activityEndDate' + (control.length - 2)).val());
    //   $("#activityStartDate" + (control.length - 1)).datepicker({
    //     minDate: new Date($('#activityEndDate' + (control.length - 2)).val()),
    //     onClose: function () {
    //       console.log($('#activityEndDate' + (control.length - 1)).val());
    //       $("#activityEndDate" + (control.length - 1)).datepicker(
    //         "change",
    //         { minDate: new Date($('#activityStartDate' + (control.length - 1)).val()) }
    //       );
    //     }
    //   });
    //   $("#activityEndDate" + (control.length - 1)).datepicker({
    //     // maxDate: new Date($('#activityEndDate'+(control.length - 1)).val()),
    //     onClose: function () {
    //       $("#activityStartDate" + (control.length - 1)).datepicker(
    //         "change",
    //         { maxDate: new Date($('#activityEndDate' + (control.length - 1)).val()) }
    //       );
    //     }
    //   });
    // }, 200)
  }

}