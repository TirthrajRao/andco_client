import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInItems } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
declare var $;

@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.css', './../event-group/event-group.component.css'],
})
export class GroupSliderComponent implements OnInit {

  @Input('selectedActivity') selectedActivity;
  @Output() firstGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() singleGroup: EventEmitter<any> = new EventEmitter<any>()
  isDisable = false
  groupName
  $slideContainter;
  $slider;
  constructor(
    private activatedRouter: ActivatedRoute,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    console.log("selected activity id in group page", this.selectedActivity);
    if (this.selectedActivity) {
      this.isDisable = true;
      // this.initGroupSlider()
    }
  }
  ngOnChanges() {
    console.log("selected activity second time", this.selectedActivity);
    if (this.selectedActivity) {
      console.log("when click on another activity")
      // this.isDisable = true
      this.$slideContainter = $('.group-slider');
      this.$slideContainter.slick('unslick');
      
      setTimeout(() => {  
        this.initGroupSlider()
      }, 50)
    }
    // if (this.selectedActivity) {
    //   this.sendForm(this.selectedActivity)
    // }
  }


  sendData(item) {
    console.log(" item ", item)
    this.singleGroup.emit(item)
  }



  initGroupSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.group-slider')
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 4,
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
      })
    }, 50)
  }


  addGroup(data) {
    console.log("is it call or not=======", data);

    let newGroup = {
      groupName: data,
      male: [],
      female: []
    }
    this.selectedActivity.groups.push(newGroup)
    this.groupName = ''
    console.log("new group added", this.selectedActivity);
    this.$slideContainter = $('.group-slider');
    this.$slideContainter.slick('unslick');
    setTimeout(() => {
      this.$slider = this.$slideContainter.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 4,
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
      })
    }, 50)
  }
}
