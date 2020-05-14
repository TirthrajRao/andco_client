import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router'
import * as _ from 'lodash';
declare var $;

@Component({
  selector: 'app-main-collection',
  templateUrl: './main-collection.component.html',
  styleUrls: ['./main-collection.component.css']
})
export class MainCollectionComponent implements OnInit {
  $slideContainter;
  $slider;
  isDisplay = false
  listOfEvent = []
  selectedIndex
  navTabs = ["Total", "Guests"]
  selectedActiveTab
  totalOfEvent
  totalCollection
  indexOfPage
  eventId
  displayGuestItems = []
  isLoad = false
  noValueMessage
  eventDetails
  constructor(
    public eventService: EventService,
    public route: Router,
    public activated: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getTotalEvent()
    this.activated.queryParams.subscribe(params => {
      console.log("whats is the value of params", params);
      if (params['collection']) {
        this.eventId = params.collection

        // this.selectedIndex = index
        if (this.eventDetails == undefined) {
          this.getCollection(this.eventId)
        }
      }
      if (params['guestList']) {
        console.log("call or not")
        this.eventId = params.guestList
        if (this.eventDetails == undefined) {
          // this.indexOfPage =1
          this.isDisplay = true
          if (this.totalOfEvent == undefined) {
            this.eventService.getEventCollection(this.eventId).subscribe((response: any) => {
              this.totalOfEvent = response.data.eventTotal
            })
          }
          this.selectedTab(1)
        }
      }
    })
    // this.initEventSlider();
  }


  initEventSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.myEvent-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<button type="button" class="prevarrow"><img src="assets/images/event-white-arrow.png" alt="arrow"></button>',
        nextArrow: '<button type="button" class="nextarrow"><img src="assets/images/event-white-arrow.png" alt="arrow"></button>',
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],

      })
    }, 50)
  }



  getTotalEvent() {
    this.isLoad = true
    this.eventService.getLoginUserEvent().subscribe((response: any) => {
      console.log("total event of login user", response);
      this.listOfEvent = response.data
      let vivek = this.eventId
      console.log("===============", vivek);
      if (vivek) {
        var index = _.findIndex(this.listOfEvent, function (o) { return o._id == vivek })
        console.log("value of index", index);
        this.selectedIndex = index
      }
      setTimeout(() => {
        this.initEventSlider()
      }, 100)
      this.isLoad = false
    }, error => {
      console.log("error while get event", error);
      this.isLoad = false
    })
  }

  getCollection(event, index?) {
    this.selectedIndex = index
    console.log("event id", event._id);
    this.eventId = event
    this.isLoad = true
    this.eventService.getSingleEventDetails(this.eventId).subscribe((response: any) => {
      console.log("what is the response of that single event", response);
      this.eventDetails = response.data
      this.collectionDetails()
    }, error => {
      this.isLoad = false
      console.log("error while get details", error);

    })
  }


  collectionDetails() {
    this.eventService.getEventCollection(this.eventId).subscribe((response: any) => {
      console.log("response of collection", response);
      response.data['isClosed'] = this.eventDetails.isClosed
      if (!response.data.eventTotal.message) {
        this.isDisplay = true
        this.totalOfEvent = response.data.eventTotal
        this.totalCollection = response.data
        this.selectedActiveTab = 0
        this.indexOfPage = 0
        this.isLoad = false
        this.noValueMessage = ''
      } else {
        this.noValueMessage = response.data.eventTotal.message
        // this.totalOfEvent = []
        // this.totalCollection = []
        this.isDisplay = false
        this.isLoad = false
        console.log("call this==============");
      }
      this.route.navigate(['/main-collection'], { queryParams: { collection: this.eventId } });
    }, error => {
      console.log("error while get collections", error);
      this.isLoad = false
    })
  }

  selectedTab(i) {
    this.selectedActiveTab = i
    console.log("selected event", i);
    if (i == 1) {
      this.isLoad = true
      this.eventService.getItemsOfGuest(this.eventId).subscribe((response: any) => {
        console.log("details of guest list", response);
        if (response && response.data.length > 0) {
          console.log("call this", this.totalOfEvent);

          this.displayGuestItems = response.data
          this.indexOfPage = 1
          this.isLoad = false
          this.route.navigate(['/main-collection'], { queryParams: { guestList: this.eventId } });
        }
      }, error => {
        console.log("error while get details of guest", error);
        this.isLoad = false
      })
    }
    if (i == 0) {
      console.log("call or not");
      this.getCollection(this.eventId)
    }
  }
}
