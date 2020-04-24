import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
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
  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.getTotalEvent()

    this.initEventSlider();
  }


  initEventSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.myEvent-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
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
    this.eventService.getLoginUserEvent().subscribe((response: any) => {
      console.log("total event of login user", response);
      this.listOfEvent = response.data
    }, error => {
      console.log("error while get event", error);

    })
  }

  getCollection(event, index) {
    this.selectedIndex = index
    console.log("event id", event._id);
    this.eventService.getEventCollection(event._id).subscribe((response: any) => {
      console.log("response of collection", response);
      this.isDisplay = true
      this.totalOfEvent = response.data.eventTotal
      this.totalCollection = response.data
      this.selectedActiveTab = 0
      this.indexOfPage = 0
    }, error => {
      console.log("error while get collections", error);

    })
  }

  selectedTab(i) {
    this.selectedActiveTab = i
  }
}
