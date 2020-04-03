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
  noListMessage
  constructor() { }

  ngOnInit() {
  }



  ngOnChanges(changes: SimpleChanges) {
    console.log("changes when guest is load", changes.displayGuest.currentValue);
    if (changes.displayGuest && changes.displayGuest.currentValue) {
      this.finalList = changes.displayGuest.currentValue
      this.displayList(changes.displayGuest.currentValue)
      this.selctedIndex = 4
    } else {
      console.log("call this or not", this.selctedIndex);
      this.noListMessage = 'There is no guest in this event'
      this.displayGuest = []
      this.finalList = []
      this.selctedIndex = 4
    }
  }

  displayList(list) {
    console.log("display total list", list);
    if (list.totalGuest && list.totalGuest.length) {
      this.noListMessage = ''
      this.displayGuest = list.totalGuest[0]
      this.selctedIndex = 4
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
    } else {
      console.log("call this or not");
      this.noListMessage = 'There is no guest in this event'
      this.displayGuest = []
      this.finalList = []
    }
  }


  displayListOfPlatForm(i) {
    console.log("index of icon", this.displayGuest);
    this.firstLetter = []
    this.secondLetter = []
    this.selctedIndex = i
    if (i == 0 && (this.finalList.whatsUpList && this.finalList.whatsUpList.length)) {
      this.displayGuest = this.finalList.whatsUpList[0]
      if (this.displayGuest && this.displayGuest.length) {
        this.noListMessage = ''
        this.displayGuest.forEach(singleList => {
          console.log("single object is ready", singleList);
          this.firstLetter.push(singleList.userName.firstName.charAt(0))
          console.log("singleItem", this.firstLetter);
          // console.log("first letter of word", firstLetter);
          this.secondLetter.push(singleList.userName.lastName.charAt(0))
        });
      } else {
        console.log("for whats up");
        this.noListMessage = 'There is no guest join from whats up'
      }
    } else if (i == 1 && (this.finalList.faceBookList && this.finalList.faceBookList.length)) {
      this.displayGuest = this.finalList.faceBookList[0]
      if (this.displayGuest && this.displayGuest.length) {
        this.noListMessage = ''
        this.displayGuest.forEach(singleList => {
          console.log("single object is ready", singleList);
          this.firstLetter.push(singleList.userName.firstName.charAt(0))
          console.log("singleItem", this.firstLetter);
          // console.log("first letter of word", firstLetter);
          this.secondLetter.push(singleList.userName.lastName.charAt(0))
        });
      } else {
        console.log("call face book or not");
        this.noListMessage = 'There is no guest join from facebook'
      }
    } else if (i == 2 && (this.finalList.textMessageList && this.finalList.textMessageList.length)) {
      this.displayGuest = this.finalList.textMessageList[0]
      if (this.displayGuest && this.displayGuest.length) {
        this.noListMessage = ''
        this.displayGuest.forEach(singleList => {
          console.log("single object is ready", singleList);
          this.firstLetter.push(singleList.userName.firstName.charAt(0))
          console.log("singleItem", this.firstLetter);
          // console.log("first letter of word", firstLetter);
          this.secondLetter.push(singleList.userName.lastName.charAt(0))
        });
      } else {
        this.noListMessage = 'There is no guest join from contacts'
      }
    } else if (i == 3 && (this.finalList.googleList && this.finalList.googleList.length)) {
      this.displayGuest = this.finalList.googleList[0]
      if (this.displayGuest && this.displayGuest.length) {
        this.noListMessage = ''
        this.displayGuest.forEach(singleList => {
          console.log("single object is ready", singleList);
          this.firstLetter.push(singleList.userName.firstName.charAt(0))
          console.log("singleItem", this.firstLetter);
          // console.log("first letter of word", firstLetter);
          this.secondLetter.push(singleList.userName.lastName.charAt(0))
        });
      } else {
        this.noListMessage = 'There is no guest join from gmail'
      }
    } else if (i == 4 && (this.finalList.totalGuest && this.finalList.totalGuest.length)) {
      this.displayGuest = this.finalList.totalGuest[0]
      this.noListMessage = ''
      // if (this.displayGuest && this.displayGuest.length) {
      this.displayGuest.forEach(singleList => {
        console.log("single object is ready", singleList);
        this.firstLetter.push(singleList.userName.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(singleList.userName.lastName.charAt(0))
      });
      // } else {

      // }
    } else {
      console.log("call this or not");
      if (i == 0) {
        this.noListMessage = 'There is no guest join from whats up'
      } else if (i == 1) {
        this.noListMessage = 'There is no guest join from facebook'
      } else if (i == 2) {
        this.noListMessage = 'There is no guest join from contacts'
      } else if (i == 3) {
        this.noListMessage = 'There is no guest join from gmail'
      } else {
        this.noListMessage = 'There is no guest in this event'
        this.displayGuest = []
        this.finalList = []
      }
    }
  }

}
