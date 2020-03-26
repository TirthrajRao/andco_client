import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ExcelService } from '../../services/excel.service';
import { SearchListPipe } from '../../search-list.pipe';
import * as _ from 'lodash';

@Component({
  selector: 'app-guest-collection',
  templateUrl: './guest-collection.component.html',
  styleUrls: ['./guest-collection.component.css']
})
export class GuestCollectionComponent implements OnInit {
  @Input('guestItems') guestItems
  @Input('noList') noListOfGuest
  displayGuestItems = []
  current = 0
  formateData: any
  firstLetter = []
  secondLetter = []
  searchArray = []
  searchText;
  isDisplay = false
  noListMessage
  constructor(
    public excelService: ExcelService,
    public searchPipe: SearchListPipe
  ) { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("changes in guest display list", changes);



    if (changes.guestItems && changes.guestItems.currentValue) {
      console.log("guest details list changes", changes.guestItems);
      this.displayGuestList(changes.guestItems.currentValue)
    }
    if (changes.noListOfGuest && changes.noListOfGuest.currentValue) {
      console.log("call this for no list of guest", changes.noListOfGuest.currentValue);
      this.noListFound()
    }
    // console.log("item of guest list in his page", this.displayGuestItems);

  }
  displayGuestList(list) {
    this.noListMessage = ''
    this.isDisplay = true
    console.log("list of guest", list);
    this.displayGuestItems = list
    this.current = 0
    this.searchArray = this.displayGuestItems
    console.log("total list", list.length);
    list.forEach(singleList => {
      this.firstLetter.push(singleList.firstName.charAt(0))
      console.log("singleItem", this.firstLetter);
      // console.log("first letter of word", firstLetter);
      this.secondLetter.push(singleList.lastName.charAt(0))
    });
    this.formateData = this.organise(this.displayGuestItems)
    console.log("formate data details", this.formateData);

  }


  noListFound() {
    this.isDisplay = false
    this.noListMessage = 'There are no guest in this event'
    // this.displayGuestItems = []
  }

  downLoad() {
    this.excelService.exportAsExcelFile(this.formateData, 'export-to-excel');
  }



  organise(arr) {
    console.log("array of items with guest", arr);
    let finalArray = []
    let obj = []
    arr.forEach((singleItem) => {
      singleItem.items.forEach((single) => {
        // console.log("item list", single);
        let item = {
          itemName: single.itemId.itemName,
          itemPrice: single.itemId.itemPrice,
          activityName: single.itemId.activityId.activityName,
          quantity: single.quantity
        }
        let newObj = {
          firstName: singleItem.firstName,
          lastName: singleItem.lastName,
          phoneNo: singleItem.phoneNo,
          email: singleItem.email,
          address: singleItem.address,
          itemName: single.itemId.itemName,
          itemPrice: single.itemId.itemPrice,
          activityName: single.itemId.activityId.activityName,
          quantity: single.quantity
          // items: item
        }
        obj.push(newObj)
      })
    })
    console.log("object is ready", obj);

    return obj
  }



  onKey(searchText) {
    console.log("display list of guest", this.displayGuestItems);

    console.log("searchText", searchText);
    var dataToBeFiltered = this.searchArray;
    var developer = this.searchPipe.transform1(dataToBeFiltered, searchText);
    console.log("developer =======>", developer);
    this.displayGuestItems = [];
    this.firstLetter = []
    this.secondLetter = []
    if (developer.length > 0) {
      let message = document.getElementById('message')
      message.innerHTML = ""
    }
    if (developer.length > 0) {
      _.forEach(developer, (content) => {
        console.log("content after search", content);
        this.displayGuestItems.push(content);

        this.firstLetter.push(content.firstName.charAt(0))
        console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(content.lastName.charAt(0))
      });
    } else {
      let message = document.getElementById('message')
      message.innerHTML = "Sorry there is no user of this name"
    }
  }

}
