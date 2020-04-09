import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ExcelService } from '../../services/excel.service';
import { SearchListPipe } from '../../search-list.pipe';
import { saveAs } from "file-saver";
import * as _ from 'lodash';
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
  displayGuestItems = []
  current = 0
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
  constructor(
    public excelService: ExcelService,
    public searchPipe: SearchListPipe,
    public eventService: EventService
  ) { }

  ngOnInit() {
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

    this.formateData = this.organise(this.displayGuestItems)
    // console.log("formate data details", this.formateData);

  }


  noListFound() {
    this.isDisplay = false
    this.noListMessage = 'There are no guest in this event'
    // this.displayGuestItems = []
  }

  downLoad() {
    this.excelService.exportAsExcelFile(this.formateData, 'export-to-excel');
  }

  geneRatePdf() {
    this.isLoad = true
    console.log("response of total list", this.displayGuestItems);

    this.eventService.geneRatePdf(this.displayGuestItems, this.newEventId).subscribe((response: any) => {
      console.log("response of pdf generator", response);
      this.eventHashTag = response.data.hashTag
      // this.isLoad = false
      this.saveToFileSystem(response.data.data)
    }, error => {
      console.log("error while generate pdf", error)
    })
  }

  private saveToFileSystem(response) {
    var byteArray = new Uint8Array(response.data);
    var blob = new Blob([byteArray], { type: 'application/pdf' });
    console.log("what is final out put of blob", blob)
    let fileName = this.eventHashTag + '-' + 'GuestList'
    console.log("file name", fileName)
    saveAs(blob, fileName);
    this.isLoad = false;
  }


  shareGuestList() {
    $('#shareIconButton').modal("show")

  }

  // async geneRatePdf(value) {
  //   pdfMake.fonts = {
  //     Roboto: {
  //       normal: 'Roboto-Regular.ttf',
  //       bold: 'Roboto-Medium.ttf',
  //       italics: 'Roboto-Italic.ttf',
  //       bolditalics: 'Roboto-MediumItalic.ttf'
  //     }
  //   };
  //   const documentDefinition = await this.setFormateOfList()
  //   console.log("what is in const", documentDefinition);

  //   if (value == 'save') {
  //     pdfMake.createPdf(documentDefinition/*, null, pdfFonts*/).download('First Guest List');
  //   } else if (value == 'preview') {
  //     pdfMake.createPdf(documentDefinition).open();
  //   }

  // }


  async setFormateOfList() {
    var dd: any = {
      info: {
        title: "First testing",
        author: "vivek bharda",
        subject: 'Event Guest List',
      },
      content: [
        {
          columns: [
            [
              {
                text: name
              },
            ]
          ]
        }
      ],
    }
    dd = await this.getDetailsOfGuest(dd)
    return dd
  }

  getDetailsOfGuest(dd) {
    console.log("what is in dd", dd);
    let array1 = []
    this.displayGuestItems.forEach((singleItem) => {
      console.log("single item list", singleItem);
      let obj1 = {
        name: singleItem.firstName
      }
      array1.push(obj1)
    })
    dd.content[0].columns[0].push(array1)
    console.log("------------", dd);
    return dd
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
