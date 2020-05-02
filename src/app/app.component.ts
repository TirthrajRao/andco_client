import { Component } from '@angular/core';
// import { LoginService } from './services/login.service';
var moment = require('moment-timezone'); // moment-timezone

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  ngOnInit() {
    // console.log(moment.tz.names());  // Get list of all available time zone names

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log("what is the current position of user", position);

    //     var d = new Date(position.timestamp);
    //     let time = d.getHours() + ":" + d.getMinutes()
    //     console.log("whats is the current time", time);
    //     // this.showPosition(position);
    //   });
    // } else {
    //   // alert("Geolocation is not supported by this browser.");
    // }
  }
}
