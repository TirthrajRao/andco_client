import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { single } from 'rxjs/operators';

@Component({
  selector: 'app-invited-guest',
  templateUrl: './invited-guest.component.html',
  styleUrls: ['./invited-guest.component.css']
})
export class InvitedGuestComponent implements OnInit {

  @Input('guestList') displayGuest
  guestFinalList
  firstLetter = []
  secondLetter = []
  finalList: any = []
  displayIcons = [
    {
      name: 'Whatsapp',
      path: 'assets/images/whatsapp.png'
    },
    {
      name: 'Facebook',
      path: 'assets/images/facebook-event.png'
    },
    {

      name: 'Mobile',
      path: 'assets/images/call-event.png'
    },
    {
      name: 'Google',
      path: 'assets/images/G.png'
    },
    {
      name: 'totalList',
      path: 'assets/images/invited-guest-menu.png'
    }
  ]
  selctedIndex
  constructor() { }

  ngOnInit() {
  }



  ngOnChanges(changes: SimpleChanges) {
    console.log("changes when guest is load", changes.displayGuest.currentValue);
    if (changes.displayGuest && changes.displayGuest.currentValue) {
      this.finalList = changes.displayGuest.currentValue
      this.displayList(changes.displayGuest.currentValue)
    }
  }

  displayList(list) {
    console.log("display total list", list);
    this.displayGuest = list.totalGuest[0]
    this.selctedIndex = 4
    this.displayGuest.forEach(singleList => {
      console.log("single object is ready", singleList);
      this.firstLetter.push(singleList.userName.firstName.charAt(0))
      console.log("singleItem", this.firstLetter);
      // console.log("first letter of word", firstLetter);
      this.secondLetter.push(singleList.userName.lastName.charAt(0))
    });
  }


  displayListOfPlatForm(i) {
    console.log("index of icon", i);
    this.firstLetter = []
    this.secondLetter = []
    this.selctedIndex = i
    if (i == 0) {
      this.displayGuest = this.finalList.whatsUpList[0]
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
    } else if (i == 1) {
      this.displayGuest = this.finalList.faceBookList[0]
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
    } else if (i == 2) {
      this.displayGuest = this.finalList.textMessageList[0]
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
    } else if (i == 3) {
      this.displayGuest = this.finalList.googleList[0]
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
    } else {
      this.displayGuest = this.finalList.totalGuest[0]
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
    }
  }

}
