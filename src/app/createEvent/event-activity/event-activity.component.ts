import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrls: ['./event-activity.component.css']
})
export class EventActivityComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    console.log("today date=======", this.today)
    $('.wrapper').on('click', '.remove', function () {
      $('.remove').closest('.wrapper').find('.element').not(':first').last().remove();
    });
    $('.wrapper').on('click', '.clone', function () {
      $('.clone').closest('.wrapper').find('.element').first().clone().appendTo('.inner-box');
    });
    // DatePicker Format
    let x
    for (x = 1; x <= 31; x++) {
      this.days.push({ id: x, name: x })
    }

    for (x = this.currentYear; x <= this.maxYear; x++) {
      this.years.push({ Id: x, Name: x });
    }

  }
}