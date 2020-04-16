import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
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
  @Input('updateActivity') newActivityArray
  @Output() firstGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() singleGroup: EventEmitter<any> = new EventEmitter<any>()
  isDisable = false
  isButton
  groupName
  editGroupName
  $slideContainter;
  $slider;
  selectedIndex: any;
  changeName
  notChangeGroupName
  displayActivity: any
  constructor(
    private activatedRouter: ActivatedRoute,
    private eventService: EventService,
    private _change: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // console.log("selected activity id in group page", this.selectedActivity);
    if (this.selectedActivity) {
      this.displayActivity = this.selectedActivity
      this.isDisable = true;
      //   // this.initGroupSlider()
    }

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("when new male object added", changes);
    if (changes.selectedActivity && changes.selectedActivity.currentValue) {
      // this.isDisable = true
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
    console.log("what is the value of display activity", this.displayActivity);

    if (changes.newActivityArray && changes.newActivityArray.currentValue) {
      this.displayActivity = []
      this.displayActivity = changes.newActivityArray.currentValue
      console.log("check this", this.displayActivity);
      this.$slideContainter = $('.group-slider');
      this.$slideContainter.slick('unslick');
      // this.selectedActivity.groups
      setTimeout(() => {
        this.initGroupSlider()
      }, 50)
    }
  }


  sendData(item, index) {
    console.log("what is in main array", this.displayActivity);

    console.log(" item ", item, index)
    this.selectedIndex = index
    this.singleGroup.emit({ item: item, groupIndex: index })
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


  addNewGroup() {
    $('#addGroupItemModal').modal("show")
  }

  addNewGroupIn(event) {
    let newName = event.target.value
    if (newName != "") {
      this.isButton = true
    } else {
      this.isButton = false
    }

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
    this.$slideContainter = $('.group-slider');
    this.$slideContainter.slick('unslick');
    setTimeout(() => {
      this.initGroupSlider()
    }, 50)
  }


  openEditModel(group, index) {
    console.log("details of group", group);
    $('#editDeleteModal').modal("show")
    this.selectedIndex = index
    this.editGroupName = group
    this.notChangeGroupName = this.editGroupName.groupName
    this.isButton = true
  }

  closeModel() {
    // console.log("name of group shold not be none", this.changeName);
    let message = document.getElementById('message');
    if (this.editGroupName.groupName == "") {
      console.log("when model close");
      message.innerHTML = "Group name is not be empty";
    } else {
      message.innerHTML = ""
      if (this.changeName != undefined) {
        console.log("it is working good");
        this.editGroupName.groupName = this.notChangeGroupName
        $('#editDeleteModal').modal("hide")
      } else {
        $('#editDeleteModal').modal("hide")
      }
    }

  }


  editGroup(event) {
    // console.log("evnt value", event);
    this.changeName = event.target.value
    let message = document.getElementById('message');
    if (this.changeName == "") {
      this.isButton = false
      message.innerHTML = "Group name is not be empty";
    } else {
      message.innerHTML = ""
      this.isButton = true
    }

  }

  editGroupNameOf() {
    console.log("total list of activity", this.editGroupName);
    // this.singleGroup.emit(this.editGroupName)
    $('#editDeleteModal').modal("hide")
  }
  deleteGroup() {
    // console.log("selected group ", this.editGroupName);

    if (this.editGroupName._id) {
      console.log("call this", this.editGroupName);
      this.eventService.removeGroup(this.editGroupName).subscribe((response) => {
        console.log("group remove completed", response);
        let index = this.selectedActivity.groups.findIndex(x => x.groupName === this.editGroupName.groupName);
        console.log("index of element which is remove", index);
        this.selectedActivity.groups.splice(index, 1);
        this.$slideContainter = $('.group-slider');
        this.$slideContainter.slick('unslick');
        setTimeout(() => {
          this.initGroupSlider()
        }, 50)
        console.log("after remove group", this.selectedActivity);
        this.singleGroup.emit({ item: this.selectedActivity.groups[0], groupIndex: 0 })
        this.selectedIndex = 0

      }, error => {
        console.log("error while remove group", error);
      })
    } else {
      let index = this.selectedActivity.groups.findIndex(x => x.groupName === this.editGroupName.groupName);
      console.log("index of element which is remove", index);
      this.selectedActivity.groups.splice(index, 1);
      this.$slideContainter = $('.group-slider');
      this.$slideContainter.slick('unslick');
      setTimeout(() => {
        this.initGroupSlider()
      }, 50)
      this.singleGroup.emit({ item: this.selectedActivity.groups[0], groupIndex: 0 })
      this.selectedIndex = 0
    }
  }
}
