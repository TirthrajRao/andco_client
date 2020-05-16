import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { LoginService } from '../../services/login.service'
import { config } from '../../config'
import { Subscription } from 'rxjs';
import { LocationStrategy, Location } from '@angular/common';
export let browserRefresh = false;
import * as _ from 'lodash';


// import { importExpr } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  @Output() headerEvent: EventEmitter<any> = new EventEmitter<any>();

  listOfEvent;
  activityDisplay = false
  totalActivity = []
  displayMenu = false
  eventHashTag
  selectedEventId
  displayProfile = false
  eventDetails
  eventProfile
  currenMenuIndex = 'activity';
  eventLink
  guestList = []
  totalCollections
  guestWithItems = []
  isCelebrant
  isClosed: any;
  isflow = false
  isLoad = false
  isPrint: boolean;
  collectionWithGuest = []
  printPhoto
  printTitle
  printHashTag
  path = config.baseMediaUrl;
  data
  existingEvent
  displayActivity = false
  selectedMenu
  subscription: Subscription;
  pageRefresh: boolean
  refreshEventId
  queryObj = {};
  allParams: any;
  selectedActivityIndex: any = -1;
  selectedGroupIndex: any;
  constructor(
    private route: Router,
    public eventService: EventService,
    public loginSerivce: LoginService,
    public activated: ActivatedRoute,
    private locationStrategy: LocationStrategy, 
    private _location: Location
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.subscription = route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !route.navigated;
      }
    });
  }

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint(event) {
    this.isPrint = true;
    console.log("log print in my event page");
  }
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event) {
    this.isPrint = false
    console.log("log print when closed page");
  }





  ngOnInit() {
    console.log("on init myEvent")
    this.pageRefresh = browserRefresh
    console.log("when page is refresh", this.pageRefresh)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    this.getLoginUserEvent()
    
    this.activated.queryParams.subscribe(params => {
      console.log("value of params", params)
      this.allParams = params
      this.queryObj['event'] = params['event']
      this.queryObj['activity'] = params['activity']
      this.queryObj['group'] = params['group']
      if (params['event']) {
        console.log("call for first time");
        console.log("what is when refresh", this.subscription)
        let obj = {
          eventId: params.event
        }
        console.log("details of event =================", this.eventDetails)
        this.refreshEventId = params.activity
        if (this.eventDetails == undefined) {
          this.eventService.getSingleEventDetails(params.event).subscribe((response: any) => {
            console.log("response when page is load", response);
            this.eventDetails = response.data
            this.eventHashTag = response.data.hashTag
            this.selectedEventId = this.eventDetails._id
            var index = _.findIndex(this.listOfEvent, function(o){ return o._id == response.data._id})
            console.log("------index of selected event on refresh is------", index)
            this.refreshEventId = index
            this.changeMenuWithArraow('activity')
          })
        }
      }
      if (params['collection']) {
        console.log("call for this ok ");

        this.selectedEventId = params.collection
        this.displayMenu = true
        this.displayActivity = true
        this.changeMenuWithArraow('collected')
        if (!this.totalCollections) {
          this.selectedMenu = 'collected'
        }
        let obj = {
          eventId: params.collection
        }
        this.getSingleEvent(obj)
        // this.getCollecctionOfEvent()
        // this.currenMenuIndex = 2
      }
      if (params['profile']) {
        this.displayActivity = true
        this.displayMenu = true
        this.selectedEventId = params.profile
        let obj = {
          eventId: params.profile
        }
        if (this.eventDetails == undefined) {
          this.selectedMenu = 'profile photo'
        }
        this.getSingleEvent(obj)
        this.changeMenuWithArraow('profile photo')
      }
      if (params['eventLink']) {
        this.displayActivity = true
        this.displayMenu = true
        this.selectedEventId = params.eventLink
        let obj = {
          eventId: params.eventLink
        }
        if (this.eventDetails == undefined) {
          this.selectedMenu = 'link'
        }
        this.getSingleEvent(obj)
        this.changeMenuWithArraow('link')
      }
      if (params['guestList']) {

        this.displayActivity = true
        this.displayMenu = true
        this.selectedEventId = params.guestList
        let obj = {
          eventId: params.guestList
        }
        if (this.eventDetails == undefined) {
          this.selectedMenu = 'invited guest'
        }
        this.getSingleEvent(obj)
        this.getGuestListOfEvent()
        this.changeMenuWithArraow('invited guest')

      }
    })

  }


  /**
   * Get event list of login user
   */
  getLoginUserEvent() {
    this.isLoad = true
    this.eventService.getLoginUserEvent().subscribe((res: any) => {
      this.listOfEvent = res.data
      this.isLoad = false
      console.log("list of total event of login user", this.listOfEvent);
      let tempId = this.selectedEventId
      var index = _.findIndex(this.listOfEvent, function (o) { return o._id == tempId })
      console.log("------index of selected event on refresh is------", index)
      this.refreshEventId = index
    }, error => {
      this.isLoad = false
      // console.log("error while get list of event", error);

    })
  }



  getSingleEvent(event) {
    console.log("getSingleEvent function in my-event", event)
    this.isLoad = true
    
    console.log("this.allParams before", typeof this.allParams, this.allParams)
    
    this.allParams = {}
    this.queryObj = {}
    console.log("this.allParams after", typeof this.allParams, this.allParams)
    // this.allParams = null;
    this.queryObj['event'] = event.eventId
    this.selectedActivityIndex = -1;
    this.changeQuery()
    console.log("right now current index is what", this.currenMenuIndex);
    this.eventService.getSingleEventDetails(event.eventId).subscribe((response: any) => {
      this.isLoad = false
      this.isCelebrant = response.data.isCelebrant
      this.eventHashTag = response.data.hashTag
      this.selectedEventId = response.data._id
      var index = _.findIndex(this.listOfEvent, function (o) { return o._id == response.data._id })
      console.log("------index of selected event on refresh is------", index)
      this.refreshEventId = index
      if (this.isCelebrant == true) {
        this.eventDetails = response.data
        // console.log("event details", this.eventDetails);
        this.printHashTag = this.eventDetails.hashTag
        this.printTitle = this.eventDetails.eventTitle
        this.printPhoto = this.eventDetails.profilePhoto
        // this.eventLink = response.data.eventLink
        
        this.changeMenuWithArraow(this.currenMenuIndex)
        if (this.currenMenuIndex == 'activity' && this.displayActivity == false) {
          this.getActivity()
          // this.route.navigate(['/myevent'], { queryParams: { activity: this.eventDetails.eventTitle } });
        }
        this.displayMenu = true
      } else {
        let data = '/guest/' + this.eventHashTag
        let output = this.loginSerivce.returnLogin(data);
        if (output == true) {
          this.route.navigate(['/guest/', this.eventHashTag])
        }
       
      }
      // if (this.currenMenuIndex == 2) {
      //   this.getCollecctionOfEvent()
      // }
      // console.log("details of event with hastag", this.eventDetails);
    }, error => {
      console.log("error while get single event details", error);
    })

  }

  selectedActivity(event){
    console.log("this.totalActivity", this.totalActivity, "event", event) 
    this.queryObj['activity'] = event.index
    if ("group" in this.queryObj ){
      console.log("IN IF this.queryObj['group']", this.queryObj['group'])
      delete this.queryObj['group']
    }
    console.log("this.queryObj on activity click", this.queryObj)
    this.changeQuery()
    // this.route.navigate(['/myevent'], { queryParams: { activity: '1' } });
  }
  selectedGroup(event){
    console.log("selectedGroup", event)
    this.selectedGroupIndex = event.index 
    this.queryObj['group'] = event.index
    this.changeQuery()
  }
  getProfileOfEvent() {
    if (this.eventDetails) {

      let profileArray =
      {
        profile: this.eventDetails.profilePhoto,
        eventId: this.selectedEventId
      }
      console.log("when profile change", profileArray)
      this.eventProfile = profileArray
    }
    this.queryObj = {}
    this.queryObj['profile'] = this.selectedEventId
    this.changeQuery()
    // this.route.navigate(['/myevent'], { queryParams: { profile: this.selectedEventId } });
  }

  getActivity() {
    console.log("getActivity() on refresh", this.eventDetails)
    this.totalActivity = this.eventDetails.activity
    this.displayMenu = true
    if(this.allParams && this.allParams.activity){
      console.log("the selected activity index is", this.allParams.activity)
      this.selectedActivityIndex = this.allParams.activity
      if (this.allParams && this.allParams.group){
        this.selectedGroupIndex = this.allParams.group
      }
    }
    else{
      console.log("no activity selected")
    }
    // console.log("call thay che ke nai ", this.totalActivity);
    // this.route.navigate(['/myevent'], { queryParams: { event: this.selectedEventId } });
  }

  getEventLink() {
    if (this.eventDetails) {
      this.eventLink = ({ eventLink: this.eventDetails.eventLink, eventId: this.selectedEventId })
    }
    this.queryObj = {}
    this.queryObj['eventLink'] = this.selectedEventId
    this.changeQuery()
    // this.route.navigate(['/myevent'], { queryParams: { eventLink: this.selectedEventId } });
  }


  getGuestListOfEvent() {
    this.isLoad = true
    this.eventService.getGuestList(this.selectedEventId).subscribe((response: any) => {
      console.log("response of guest list", response);
      this.guestList = response.data[0]
      this.queryObj ={}
      this.queryObj['guestList'] = this.selectedEventId
      this.changeQuery()
      // this.route.navigate(['/myevent'], { queryParams: { guestList: this.selectedEventId } });
      setTimeout(() => {
        this.isLoad = false
      })
    }, error => {
      console.log("error while guest list", error)
      this.isLoad = false
    })
  }



  getCollecctionOfEvent() {
    this.isLoad = true
    this.eventService.getEventCollection(this.selectedEventId).subscribe((response: any) => {
      console.log("response of collections", response);
      // response.data['isClosed'] = this.eventDetails.isClosed

      this.totalCollections = response.data
      this.queryObj = {}
      this.queryObj['collection'] = this.selectedEventId
      this.changeQuery()
      // this.route.navigate(['/myevent'], { queryParams: { collection: this.selectedEventId } });

      // this.isClosed = this.eventDetails.isClosed
      this.isLoad = false
    }, error => {
      console.log("erro while get collection", error);

    })
  }
  collectionLoader(event) {
    console.log("when data is reachedd to collection", event);
    if (event == false)
      this.isLoad = false
  }

  getItemsOfGuest(event) {
    this.guestWithItems = this.selectedEventId
    // this.getTotalListOfGuestWithCollection()
  }

  finalCollectionPrint(event) {
    console.log("ready for print in main page", event);
    this.collectionWithGuest = event
  }

  clickOnPrint(event) {
    console.log("event of click", event)
    // this.headerEvent.emit(event)
    this.loginSerivce.updateMenu()
    if (event)
      this.isPrint = true
    setTimeout(() => {
      window.print()
    }, 10)
  }


  changeMenuWithArraow(event) {
    console.log("event when click on array of slider", event);
    // this.getCurrentMenu(event)
    // if (event.point == 'click') {
    console.log("call menu");

    // this.currenMenuIndex = null
    if (event == 'activity') {
      // 0
      this.currenMenuIndex = event
      // this.queryObj['event'] = this.selectedEventId
      // this.route.navigate(['/myevent'], { queryParams: { activity: this.eventDetails.eventTitle } });
      this.getActivity()
    }
    if (event == 'profile photo') {
      // 1
      this.currenMenuIndex = event
      
      // this.route.navigate(['/myevent'], { queryParams: { profile: this.eventDetails.eventTitle } });
      this.getProfileOfEvent()
    }
    if (event == 'collected') {
      // 2
      this.currenMenuIndex = event
      this.getCollecctionOfEvent()
    }
    if (event == 'link') {
      // 3
      this.currenMenuIndex = event
      this.getEventLink()
    }
    if (event == 'invited guest') {
      // 4
      this.currenMenuIndex = event
      this.getGuestListOfEvent()
    }
    if (event == 'edit event') {
      // 5
      this.currenMenuIndex = event

      let data = '/editEvent/' + this.selectedEventId
      let output = this.loginSerivce.returnLogin(data);
      if (output == true) {
        // this.router.navigate(['/myevent']);

        this.route.navigate(['/editEvent/', this.selectedEventId])
      }


      // this.route.navigate(['edtiEvent/' + this.selectedEventId])
    }
    // }
  }

  changeQuery(){
    this._location.replaceState(
      this.route.createUrlTree(
        [this.locationStrategy.path().split('?')[0]], // Get uri
        { relativeTo: this.activated, queryParams: this.queryObj }).toString()
    );
    // this.route.navigate(['.'], { relativeTo: this.activated, queryParams: this.queryObj });
  }

}
