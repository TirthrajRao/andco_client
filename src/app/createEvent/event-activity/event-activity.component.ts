import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrls: ['./event-activity.component.css']
})
export class EventActivityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.wrapper').on('click', '.remove', function() {
      $('.remove').closest('.wrapper').find('.element').not(':first').last().remove();
    });
    $('.wrapper').on('click', '.clone', function() {
      $('.clone').closest('.wrapper').find('.element').first().clone().appendTo('.results');
    });
  }
}
