import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { from } from 'rxjs';
declare var $;

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.css']
})
export class ActivitySliderComponent implements OnInit {

  @Input('activityDetails') detailsFromEventGroup;
  @Output() DeleteMaterial: EventEmitter<any> = new EventEmitter<any>();
  @Output() singleActivity: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventHashTag: EventEmitter<any> = new EventEmitter<any>()
  sub: any
  eventId
  activityDetails: any = []
  allActivities: any
  selectedIndex
  constructor(
    private route: ActivatedRoute,
    public eventService: EventService
  ) { }

  ngOnInit() {
    console.log("created activity list", this.detailsFromEventGroup);
    if (this.detailsFromEventGroup) {
      this.getEventDetails(this.detailsFromEventGroup)
    }
  }
  ngOnChanges() {

  }


  getEventDetails(eventId) {
    this.eventService.getEventDetails(eventId).subscribe((res: any) => {
      console.log("details of activity", res)
      this.eventHashTag.emit(res.data.hashTag)
      this.activityDetails = res.data.activity
      this.allActivities = []
      this.activityDetails.forEach(activity => {
        console.log(" activity ", activity);
        let newAD = {
          activity: activity,
          groups: [
            {
              groupName: 'Family',
              male: [],
              female: []
            },
            {
              groupName: 'Friends',
              male: [],
              female: []
            }
          ]
        }

        this.allActivities.push(newAD)
      });
      console.log(" allActivities 111111 ", this.allActivities)
      setTimeout(() => {
        this.initSlickSlider()
      }, 50)
    }, error => {
      console.log("error while details", error);

    })
  }


  singleActivityDetails(activity, allActivities, index) {
    console.log("first one", index);
    this.singleActivity.emit({ item: activity, allActivities: allActivities, index: index })
    this.selectedIndex = index
  }

  initSlickSlider() {

    // event main slider start
    $('.event-slider').not('.slick-initialized').slick({
      infinite: false,
      slidesToShow: 2.5,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2.5,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        },
      ],

    });
    // event main slider end
    //tooltip js start
    $(".tooltip-class").hover(function () {
      $(this).attr("tooltip-data", $(this).attr("title"));
      $(this).removeAttr("title");
    }, function () {
      $(this).attr("title", $(this).attr("tooltip-data"));
      $(this).removeAttr("tooltip-data");
    });
    //tooltip js end
  }


}
