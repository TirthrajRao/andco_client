import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
  selectedIndex: any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private eventService: EventService,
    private _change: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // console.log("selected activity id in group page", this.selectedActivity);
    if (this.selectedActivity) {
      this.isDisable = true;
      // this.initGroupSlider()
    }

  }
  ngOnChanges() {
    // console.log("selected activity second time", this.selectedActivity.groups);
    if (this.selectedActivity) {
      this._change.detectChanges()
      this.selectedIndex = 0
      // console.log("when click on another activity", this.selectedIndex)
      this.$slideContainter = $('.group-slider');
      this.$slideContainter.slick('unslick');
      // this.selectedActivity.groups
      setTimeout(() => {
        this.initGroupSlider()
      }, 50)
    }
  }


  sendData(item, index) {
    console.log(" item ", item, index)
    this.selectedIndex = index
    this.singleGroup.emit(item)
  }

  removeGroup(index) {
    // console.log("index of group", this.selectedIndex)
    this.selectedActivity.groups.splice(index, 1);
    // console.log("this.selectedActivity.groups========", this.selectedActivity.groups)
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
              slidesToShow: 3.5,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],
      })
    }, 50)
    this.singleGroup.emit(this.selectedActivity.groups[0])
    this.selectedIndex = 0
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
              slidesToShow: 3.5,
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
              slidesToShow: 2.5,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.5,
            }
          },
        ],
      })
    }, 50)
  }


  addGroup(data) {
    // console.log("is it call or not=======", data);

    let newGroup = {
      groupName: data,
      male: [],
      female: []
    }
    this.selectedActivity.groups.push(newGroup)
    this.groupName = ''
    // console.log("new group added", this.selectedActivity);
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
              slidesToShow: 1.5,
            }
          },
        ],
      })
    }, 50)
  }
}
