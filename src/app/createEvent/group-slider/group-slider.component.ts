import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInItems } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
declare var $;

@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.css']
})
export class GroupSliderComponent implements OnInit {

  @Input('selectedActivity') selectedActivity;
  @Output() firstGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() singleGroup: EventEmitter<any> = new EventEmitter<any>()
  isDisable = false
  // sub: any
  // eventId: any
  // groupOfEvent = [
  //   {
  //     _id: 1,
  //     groupName: 'family'
  //   },
  //   {
  //     _id: 2,
  //     groupName: 'friends'
  //   }

  // ]

  constructor(
    private activatedRouter: ActivatedRoute,
    private eventService: EventService
  ) {
    // this.sub = this.activatedRouter.params.subscribe(params => {
    //   console.log("event id ", params.id)
    //   this.eventId = params.id
    //   console.log("getting event id", this.eventId)
    //   // this.getEventDetails(this.eventId)
    // })
  }

  ngOnInit() {
    console.log("selected activity id in group page", this.selectedActivity);
    this.isDisable= true;
    this.initGroupSlider()
    // if (this.selectedActivity) {
    //   this.sendForm(this.selectedActivity)
    // }
  }
  ngOnChanges() {
    console.log("selected activity second time", this.selectedActivity);
    // if (this.selectedActivity) {
    //   this.sendForm(this.selectedActivity)
    // }
  }

  getEventDetails(eventId) {
    this.eventService.getEventDetails(eventId).subscribe((res: any) => {
      console.log("details of event", res)
    }, error => {
      console.log("error while get details of event", error)
    })
  }

  // sendForm(selectedActivity) {
  //   console.log("activity name", selectedActivity);
  //   let obj = {
  //     activityId: selectedActivity,
  //     groupName: this.groupOfEvent[0].groupName
  //   }
  //   this.isDisable = true
  //   this.initGroupSlider()
  //   this.firstGroup.emit(obj)
  // }


  initGroupSlider() {
    setTimeout(() => {

      // group slider start
      $('.group-slider').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,

      });
      // group slider end
    }, 50)
  }
}
