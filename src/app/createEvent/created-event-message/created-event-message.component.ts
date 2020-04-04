import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-created-event-message',
  templateUrl: './created-event-message.component.html',
  styleUrls: ['./created-event-message.component.css']
})
export class CreatedEventMessageComponent implements OnInit {
  private sub
  private update
  hashTag = sessionStorage.getItem('hasTag');

  constructor(
    public activated: ActivatedRoute
  ) {
    this.sub = this.activated.params.subscribe(param => {
      console.log("param", param);
      this.update = param.id
    })
  }

  ngOnInit() {
  }

}
