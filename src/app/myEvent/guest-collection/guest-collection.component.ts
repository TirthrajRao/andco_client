import { Component, OnInit, Input, SimpleChanges, HostListener, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ExcelService } from '../../services/excel.service';
import { SearchListPipe } from '../../search-list.pipe';
import { config } from '../../config';
import { saveAs } from "file-saver";
import * as _ from 'lodash';
// import { EventEmitter } from 'protractor';
declare var $: any

@Component({
  selector: 'app-guest-collection',
  templateUrl: './guest-collection.component.html',
  styleUrls: ['./guest-collection.component.css']
})
export class GuestCollectionComponent implements OnInit {
  @Input('guestItems') guestItems
  @Input('noList') noListOfGuest
  @Input('eventId') eventId
  @Output() listForPrint: EventEmitter<any> = new EventEmitter<any>();
  @Output() printClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() displayData: EventEmitter<any> = new EventEmitter<any>();
  isPrint: boolean = false;


  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint(event) {
    this.isPrint = true;
    console.log("log before pppprint");
  }
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event) {
    this.isPrint = false
    console.log("log after pppprint");
  }
  // @Input() image: string;
  displayGuestItems = []
  current
  formateData: any
  firstLetter = []
  secondLetter = []
  searchArray = []
  searchText;
  isDisplay = false
  isLoad = false
  noListMessage
  newEventId
  eventHashTag
  blob: any
  isDownload
  image
  pdfPath = config.pdfUrl
  finalUrl
  sendUrl
  constructor(
    public excelService: ExcelService,
    public searchPipe: SearchListPipe,
    public eventService: EventService
  ) { }

  ngOnInit() {
  }


  onPrint() {
    this.isPrint = true
    this.printClick.emit(this.isPrint)
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("changes in guest display list", changes.guestItems);

    if (changes.eventId && changes.eventId.currentValue) {
      this.newEventId = changes.eventId.currentValue
    }
    console.log("event=========", this.newEventId);

    if (changes.guestItems && changes.guestItems.currentValue) {
      // console.log("guest details list changes", changes.guestItems);
      this.displayGuestList(changes.guestItems.currentValue)
    }
    if (changes.noListOfGuest && changes.noListOfGuest.currentValue) {
      // console.log("call this for no list of guest", changes.noListOfGuest.currentValue);
      this.noListFound()
    }
    // console.log("item of guest list in his page", this.displayGuestItems);

  }
  displayGuestList(list) {
    this.noListMessage = ''
    this.isDisplay = true
    this.displayGuestItems = list
    // this.eventId = list.eventId
    // console.log("list of guest", this.eventId);


    this.current = 0
    this.searchArray = this.displayGuestItems
    // console.log("total list", list.length);
    this.displayGuestItems.forEach(singleList => {
      let grandTotal = 0
      let finalTotalOfEvent
      singleList.items.forEach((singleItem) => {
        let subTotal = (singleItem.itemId.itemPrice * singleItem.quantity)
        grandTotal = grandTotal + subTotal
        finalTotalOfEvent = grandTotal
        // console.log("what is the finale total of single guest", finalTotalOfEvent);
      })
      singleList['total'] = finalTotalOfEvent
      this.firstLetter.push(singleList.firstName.charAt(0))
      this.secondLetter.push(singleList.lastName.charAt(0))
      singleList['firstLetter'] = singleList.firstName.charAt(0)
      singleList['lastLetter'] = singleList.lastName.charAt(0)
      // console.log("singleItem", this.firstLetter);
      // console.log("first letter of word", firstLetter);
    });
    console.log("what is in final output after adding", this.displayGuestItems);

    this.listForPrint.emit({ data: this.displayGuestItems, flag: false })
    this.formateData = this.organise(this.displayGuestItems)
    // console.log("formate data details", this.formateData);

  }


  noListFound() {
    this.isDisplay = false
    this.noListMessage = 'There is no guest purchased any items'
    // this.displayGuestItems = []
  }

  downLoad() {
    this.excelService.exportAsExcelFile(this.formateData, 'export-to-excel');
  }

  geneRatePdf(value) {
    console.log("value of save", value);
    this.isLoad = true

    console.log("response of total list", this.displayGuestItems);
    this.eventService.geneRatePdf(this.displayGuestItems, this.newEventId, value).subscribe((response: any) => {
      console.log("response of pdf generator", response);
      this.eventHashTag = response.data.hashTag
      // this.image = "https://test.andcowith.me/join_enter.d3935dc0e5ccd82def8d.png"
      // this.isLoad = false
      if (value == 'save') {
        this.saveToFileSystem(response.data.data)
      }
      if (value == 'share') {
        this.shareFile(response.data.data)
      }
    }, error => {
      console.log("error while generate pdf", error)
    })
  }

  private saveToFileSystem(response) {
    var byteArray = new Uint8Array(response.data);
    this.blob = new Blob([byteArray], { type: 'application/pdf' });
    console.log("what is final out put of blob", this.blob)
    let fileName = this.eventHashTag + '-' + 'GuestList'
    console.log("file name", fileName)
    saveAs(this.blob, fileName);
    this.isLoad = false;
  }



  private shareFile(response) {
    var byteArray = new Uint8Array(response.data);
    this.blob = new Blob([byteArray], { type: 'application/pdf' });


    this.finalUrl = this.pdfPath + this.eventHashTag + '.pdf'
    console.log("what is final url to share", this.finalUrl);
    // this.sendUrl = 'whatsapp://send?text=' + encodeURIComponent('https://test.andcowith.me/assets/images/andco_logo.png')

    // console.log("what is final out put of blob", this.blob)
    // let fileName = this.eventHashTag + '-' + 'GuestList'
    // console.log("file name", fileName)
    // this.image = new File([this.blob], fileName, { type: 'contentType', lastModified: Date.now() });
    // console.log("what is the output of file", file);

    // saveAs(this.blob, fileName);
    this.isLoad = false;
    $('#shareIconButton').modal("show")

  }

  shareGuestList() {
    $('#shareIconButton').modal("show")

  }


  accordianCheck(i) {
    console.log("index of accordian", i);
    this.current = i
  }





  organise(arr) {
    // console.log("array of items with guest", arr);
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
    // console.log("object is ready", obj);

    return obj
  }



  onKey(searchText) {
    // console.log("display list of guest", this.displayGuestItems);

    // console.log("searchText", searchText);
    var dataToBeFiltered = this.searchArray;
    var developer = this.searchPipe.transform1(dataToBeFiltered, searchText);
    // console.log("developer =======>", developer);
    this.displayGuestItems = [];
    this.firstLetter = []
    this.secondLetter = []
    if (developer.length > 0) {
      let message = document.getElementById('message')
      message.innerHTML = ""
    }
    if (developer.length > 0) {
      _.forEach(developer, (content) => {
        // console.log("content after search", content);
        this.displayGuestItems.push(content);

        this.firstLetter.push(content.firstName.charAt(0))
        // console.log("singleItem", this.firstLetter);
        // console.log("first letter of word", firstLetter);
        this.secondLetter.push(content.lastName.charAt(0))
      });
    } else {
      let message = document.getElementById('message')
      message.innerHTML = "Sorry there is no user of this name"
    }
  }

}
