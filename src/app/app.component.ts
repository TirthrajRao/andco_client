import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  ngOnInit() {
    // console.log("get the width of screen", screen.width);
    // console.log("get the height of screen ", screen.height);
    // if (screen.width < 575) {
    //   console.log("this is perfect for mobile size");
    //   sessionStorage.setItem('isMobile', 'true')
    // } else {
    //   sessionStorage.setItem('isMobile', 'false')
    // }


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
