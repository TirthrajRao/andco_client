import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('userName'));

  constructor() { }

  ngOnInit() {
  }

}
