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
  sub: any
  eventId
  activityDetails: any = []
  allActivities: any
  constructor(
    private route: ActivatedRoute,
    public eventService: EventService
  ) {
    // this.sub = this.route.params.subscribe(params => {
    //   this.eventId = params.id
    //   console.log("event details ", this.eventId)
    //   // this.getEventDetails(this.eventId)
    // })
  }

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
      this.activityDetails = res.data.activity
      this.allActivities = []

      this.activityDetails.forEach(activity => {
         console.log(" activity ", activity);
         let newAD = {
           activity: activity,
           groups: [
             {
               name: 'Family',
               male: [{
                 itemName: 'Vivek',
                 itemPrice: 123456
               }],
               female: [{
                itemName: 'DC',
                itemPrice: 123456
              }]
             },
             {
              name: 'Friends',
              male: [{
                itemName: 'Mohit',
                itemPrice: 123456
              }],
              female: [{
                itemName: 'Yash',
                itemPrice: 123456
              }]
            }
           ]
         }

         this.allActivities.push(newAD)
      });

      console.log(" allActivities 111111 ",this.allActivities)

      this.initSlickSlider()

      // this.activities = res.data
      // setTimeout(() => {
      //   if (res.data) {
      //     this.activities.push(res.data.activity)
      //     console.log("name of activities", this.activities)
      //   }
      // }, 50)
      // this.detailsFromEventGroup = res.data.activity
    }, error => {
      console.log("error while details", error);

    })
  }



  initSlickSlider() {

    // event main slider start
    setTimeout(() => {
      $('.event-slider').not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,

      });
    }, 50)
    // event main slider end
  }
}
