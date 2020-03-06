import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { config } from '../../config'
@Component({
  selector: 'app-event-profile-pic',
  templateUrl: './event-profile-pic.component.html',
  styleUrls: ['./event-profile-pic.component.css']
})
export class EventProfilePicComponent implements OnInit {

  @Input('profile') profilePhoto
  path = config.baseMediaUrl;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("when click on profile tab", this.profilePhoto);

  }
  changePhoto() {
    alert('display photo')
  }

}
