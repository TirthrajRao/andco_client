import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';
import { config } from '../../config';
import { ThemeService } from '../../services/theme.service';
import { Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-guest-main',
  templateUrl: './guest-main.component.html',
  styleUrls: ['./guest-main.component.css']
})
export class GuestMainComponent implements OnInit {
  private sub: any
  private hashtag: any
  todayDate = new Date()
  eventDetails
  isJoin
  isDisable = false
  isDonation = false
  activityDisplay = false
  itemsDisplay = false
  isAddress = false
  index = 0
  path = config.baseMediaUrl;
  totalActivityList = []
  totalItemList = []
  removeItem
  selectedAccount
  eventTheme
  thankYouDetails
  paymentDeadlineDate
  isClosed
  cartLength
  closedEvent
  checkQuery = false
  themeList = ['assets/images/guest.png',
    'assets/images/floral.png',
    'assets/images/wood.png',
    'assets/images/marble.png',
    'assets/images/origami.png',
    'assets/images/classic.png',
    'assets/images/lines.png',
    'assets/images/luxury.png',
    'assets/images/instrument.png']
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public alertService: AlertService,
    public themeService: ThemeService
  ) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log("params id for guest", params);
      this.hashtag = params.hashTag
    })
    console.log("event hashtag", this.hashtag)
    this.guestEventWithOutLogin(this.hashtag)
    // sessionStorage.setItem('guestHashTag', JSON.stringify(this.hashtag))
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("response of query", params);
      if (params['activities']) {
        this.checkQuery = false
        // this.displayActivity(0)
      } else if (params['total']) {
        console.log("call or not");
        this.checkQuery = true
        let total = JSON.parse(localStorage.getItem('allCartList'))
        let data = []
        data['index'] = 1
        data['allItems'] = total
        this.totalItem(data)
      } else if (params['donation']) {
        this.checkQuery = true
        this.index = 2
        this.isDisable = true
        // this.menuIndex(2)
      } else if (params['address']) {
        this.checkQuery = true
        this.index = 3
        this.isDisable = true
      }
      else if (params['payment']) {
        this.checkQuery = true
        this.index = 4
        this.isDisable = true
        this.route.navigate(['/', this.hashtag], { queryParams: { payment: 'payment' } });
      } else if (params['cart']) {
        this.checkQuery = true
        this.index = 7
        this.isDisable = true
        this.route.navigate(['/', this.hashtag], { queryParams: { cart: 'cartItems' } });

      }
      //  else {
      //   this.guestEventWithOutLogin(this.hashtag)
      // }

    })
  }



  getBackGround() {
    // if (this.eventDetails.eventTheme) {
    return `url(` + this.eventTheme + `)`;
    // }

  }

  guestEventWithOutLogin(eventhashTag) {
    this.eventService.getGuestEventDetails(eventhashTag).subscribe((response: any) => {
      console.log("details of event with link", response)
      this.eventDetails = response.data
      console.log("payment check date", this.eventDetails);
      localStorage.setItem('eventId', this.eventDetails._id)
      this.eventTheme = this.eventDetails.eventTheme
      this.closedEvent = this.eventDetails.isClosed
      this.isClosed = this.eventDetails.isClosed
      // this.isDisable = true
      // this.index = 0
      // let day : number = 4;
      if (this.checkQuery == false) {
        this.displayActivity(0)
      }

      switch (this.eventTheme) {
        case 'assets/images/floral.png':
          this.themeService.toggleFloral()
          break;
        case 'assets/images/wood.png':
          this.themeService.toggleWood()
          break;
        case 'assets/images/marble.png':
          this.themeService.toggleMarble()
          break;
        case 'assets/images/origami.png':
          this.themeService.toggleOrigami()
          break;
        case 'assets/images/classic.png':
          this.themeService.toggleClassic()
          break;
        case 'assets/images/lines.png':
          this.themeService.toggleLines()
          break;
        case 'assets/images/luxury.png':
          this.themeService.toggleLuxury()
          break;
        case 'assets/images/instrument.png':
          this.themeService.toggleInstruments()
          break;
        default:
          this.themeService.toggleDefault()
          break;
      }
      this.isJoin = this.eventDetails.isJoined
    }, error => {
      console.log("error while get link details", error)
    })
  }

  joinEvent(eventId) {
    console.log("event id", eventId);
    this.eventService.joinEvent(eventId).subscribe((response: any) => {
      console.log("response of join event", response);
      this.isJoin = true
      this.alertService.getSuccess(response.message)
    }, error => {
      console.log("erorr while join event", error)
    })
  }
  displayActivity(event) {
    console.log("when click on activity", this.eventDetails);
    this.isDisable = true
    this.index = event
    // if (this.eventDetails) {
    this.totalActivityList = this.eventDetails.activity
    this.isClosed = this.eventDetails.isClosed
    // }
    this.route.navigate(['/', this.hashtag], { queryParams: { activities: 'activities' } });

  }
  totalItem(event) {
    console.log("total item display in main", this.eventDetails);
    this.index = event.index
    this.totalItemList = event
    this.isDisable = true
    this.route.navigate(['/', this.hashtag], { queryParams: { total: 'total' } });

  }

  removeItemOfArray(event) {
    console.log("event of add more", event);
    this.index = event.index
    this.removeItem = event.removeItem
    this.route.navigate(['/', this.hashtag], { queryParams: { activities: 'activities' } });
    console.log("event when item remove", this.removeItem);
  }

  donationAdd(event) {
    console.log("add donation", event);
    this.cartLength = event.total
    this.index = event.index
    if (event.index == 0) {
      this.route.navigate(['/', this.hashtag], { queryParams: { activities: 'activities' } });
    } else if (event.index == 2) {
      this.route.navigate(['/', this.hashtag], { queryParams: { donation: 'donation' } });
    }
  }
  displayItems(event) {
    this.index = event
    this.route.navigate(['/', this.hashtag], { queryParams: { total: 'total' } });
  }
  displayCart(event) {
    console.log("index of event", event)
    this.index = event
    this.route.navigate(['/', this.hashtag], { queryParams: { cart: 'cartItems' } });
  }
  selectPayment(event) {
    console.log("when click by address", event)
    this.index = event
    if (event == 2) {
      this.route.navigate(['/', this.hashtag], { queryParams: { donation: 'donation' } });
    } else if (event == 4) {
      this.route.navigate(['/', this.hashtag], { queryParams: { payment: 'payment' } });
    }
  }
  selectedAccountType(event) {
    this.index = event.index
    this.selectedAccount = ({ type: event.type, total: event.finalTotal, donation: event.donation })
  }

  displayAccount(event) {
    this.index = event
  }

  addMoreItems(event) {
    this.index = event.index
  }

  displayDonation(event) {
    this.index = event
  }
  addressDisplay(event) {
    this.index = event
    this.route.navigate(['/', this.hashtag], { queryParams: { address: 'address' } });
  }


  thankYouMessage(event) {
    this.index = event.index
    this.thankYouDetails = event.message
    this.route.navigate(['/', this.hashtag], { queryParams: { thankYou: 'thankYou' } });
  }

  menuIndex(event) {
    console.log("what is in event when click on menu", event)
    this.index = event
    if (event == 0) {
      this.route.navigate(['/', this.hashtag], { queryParams: { activities: 'activities' } });
    } else if (event == 1) {
      this.route.navigate(['/', this.hashtag], { queryParams: { total: 'total' } });
    } else if (event == 2) {
      this.route.navigate(['/', this.hashtag], { queryParams: { donation: 'donation' } });
    }
  }
  displayAddress(event) {
    this.index = event
    this.route.navigate(['/', this.hashtag], { queryParams: { address: 'address' } });

  }
}
