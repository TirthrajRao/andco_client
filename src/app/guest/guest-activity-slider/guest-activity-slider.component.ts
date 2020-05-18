import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
// import { single } from 'rxjs/operators';
import { DescriptionComponent } from './../description/description.component';
import { MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-guest-activity-slider',
  templateUrl: './guest-activity-slider.component.html',
  styleUrls: ['./guest-activity-slider.component.css']
})
export class GuestActivitySliderComponent implements OnInit {
  @Input('totalActivityList') listOfActivity
  @Input('removeItemOf') removeItem
  @Input('isClosed') isClosed
  @Output() totalItemList: EventEmitter<any> = new EventEmitter<any>()
  isClose
  private sub: any
  private eventHashtag: any
  displayActivity = []
  displayGroup = []
  itemList = []
  selectedGender
  $slider
  $sliderContainer
  gender = ["male", "female"]
  selectedwallet
  groupIndex = 0
  activityIndex = 0
  itemQuenty = 0
  displayTotal
  allCartList = [
  ]
  cartTotalItems: any = [];
  removeItemArray: any = []
  isTotal
  isLoad = false
  discriptionName
  discriptionItem
  previousQuantity: any
  previousQuantityFemale
  maleQuantity = []
  femaleQuantity = []
  constructor(
    public eventService: EventService,
    public router: Router,
    public activated: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let allReadyAdded = JSON.parse(localStorage.getItem('maleQuantity'))
    console.log("maleQuantity ======== allReadyAdded", allReadyAdded);
    if (allReadyAdded && allReadyAdded.length) {
      this.maleQuantity = allReadyAdded
    }
    let allReadyAddedFemale = JSON.parse(localStorage.getItem('maleQuantity'))
    console.log("maleQuantity ======== allReadyAdded", allReadyAdded);
    if (allReadyAddedFemale && allReadyAddedFemale.length) {
      this.femaleQuantity = allReadyAddedFemale
    }


    this.sub = this.activated.params.subscribe(params => {
      this.eventHashtag = params.hashTag
      // console.log("hashtag is important", this.eventHashtag);
    })
    this.initActivitySlider()
    // this.getSelectedItems()
    // this.displayAllData()

    // window.addEventListener('beforeunload', function (e) {
    //   console.log("a jyare page load thay tyare", e)
    //   // Cancel the event
    //   // if (localStorage.getItem('isTimerRunning') != "null") {
    //   fromReload('reload');
    //   e.stopPropagation();
    //   // Chrome requires returnValue to be set
    //   e.returnValue = '';

    //   // }
    // });
    // var fromReload = (option) => {
    //   console.log("When came from one page to another page", option)
    //   this.func(option);
    // }

  }


  func(option) {
    console.log("ama su ave che", option);
    this.addTocart()
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("paynent is close", this.isClosed);
    this.isClose = changes.isClosed.currentValue
    if (this.isClose == true) {
      this.isTotal = false
    } else {
      this.isTotal = true
    }
    // this.getSelectedItems()
    console.log("changes of my event", changes);
    if (changes.listOfActivity && changes.listOfActivity.currentValue) {
      this.sub = this.activated.params.subscribe(params => {
        this.eventHashtag = params.hashTag
      })
      this.displayActivity = changes.listOfActivity.currentValue
      console.log("what is the value", this.displayActivity);

      this.initActivitySlider()
      this.getSelectedItems()
      // this.displayAllData()
    }
    if (changes.removeItem && changes.removeItem.currentValue) {
      this.removeItemArray = changes.removeItem.currentValue
      console.log("what is in remove array", this.removeItemArray);

      this.getSelectedItems()
      // this.displayAllData()
    }

  }

  getSelectedItems() {

    let getListFromLocal = JSON.parse(localStorage.getItem('allCartList'))

    console.log("what is the value of all cart", getListFromLocal);
    if (getListFromLocal == null) {
      this.allCartList = []
      this.cartTotalItems = this.allCartList
      this.displayAllData()
    } else {
      this.allCartList = getListFromLocal
      this.cartTotalItems = getListFromLocal
      this.displayAllData()
    }

    // this.cartTotalItems = JSON.parse(localStorage.getItem('allCartList'))
    // this.allCartList = JSON.parse(localStorage.getItem('allCartList'))


    // this.isLoad = true
    // this.eventService.getCartItems(this.eventHashtag).subscribe((response: any) => {
    //   if (response.data.cartList) {
    //     this.cartTotalItems = response.data.cartList
    //     this.allCartList = response.data.cartList
    //   }
    //   console.log("response of cart items", this.allCartList)
    //   this.displayAllData()
    //   this.isLoad = false
    // }, error => {
    //   console.log("error while get cart details", error)
    // })
  }

  removeItems() {
    console.log("ama su ave che", this.allCartList);
    var array3 = this.allCartList.filter(function (obj) { return this.removeItem.indexOf(obj) == -1; });
    console.log("item id of daata", array3);

  }


  initActivitySlider() {
    setTimeout(() => {
      this.$sliderContainer = $('.guest-activity-slider')
      this.$slider = this.$sliderContainer.not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        prevArrow: '<button type="button" class="prevarrow"><div class="arrow-left"></div></button>',
        nextArrow: '<button type="button" class="nextarrow"><div class="arrow-right"></div></button>'
      })
      this.$slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        console.log("event on before", currentSlide, nextSlide);
        this.nextSlide(nextSlide)
      })
    }, 50)
  }



  displayAllData() {
    // console.log("what is in activity", this.displayActivity);

    this.displayGroup = this.displayActivity[this.activityIndex].group
    // console.log("when dispplay group", this.displayGroup);
    this.selectedwallet = 0
    this.selectedGender = 'male'
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
    console.log("quntity with rank", this.cartTotalItems);
    this.itemList.forEach((singleItem) => {
      console.log("single list", singleItem);

      if (this.cartTotalItems && this.cartTotalItems.length > 0) {
        this.cartTotalItems.forEach((singleCartItem) => {
          // console.log("call or not", singleCartItem);
          if (singleItem._id == singleCartItem.itemId) {
            // console.log("call or not");
            singleItem['quantity'] = singleCartItem.quantity
          } else {
            this.removeItemArray.forEach((removeItem) => {
              console.log("what is in remove item", removeItem)
              if (singleItem._id == removeItem) {
                singleItem['quantity'] = 0
              }
            })
          }
          // else {
          //   singleItem['quantity'] = 0
          // }
        })
      } else {
        console.log("check this else part", singleItem);
        singleItem['quantity'] = 0
      }
      if (singleItem.quantity == singleItem.quantity) {
        // console.log("call this condition or not", typeof this.previousQuantity, singleItem.quantity);
        this.previousQuantity = singleItem.quantity
        console.log("after assign the value", this.previousQuantity);
      } else {
        this.previousQuantity = undefined
      }
    })
    console.log("final male items", this.previousQuantity);

    setTimeout(() => {
      $('input:radio[id="0"]').attr('checked', true);
    }, 20)
  }

  nextSlide(slider) {
    // console.log("==========", this.groupIndex);
    this.groupIndex = 0
    this.activityIndex = slider
    this.displayAllData()
  }


  changeTab(item) {
    // this.previousQuantity = undefined
    console.log("change tab item", this.displayGroup);
    this.selectedwallet = 1
    this.selectedGender = item
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
    // console.log("list of female array", this.cartTotalItems);
    this.itemList.forEach((singleItem) => {
      console.log("what is in single item", singleItem);

      if (this.cartTotalItems && this.cartTotalItems.length > 0) {
        this.cartTotalItems.forEach((singleCartItem) => {
          console.log("single cart items display ", singleCartItem)
          if (singleItem._id == singleCartItem.itemId) {
            console.log("call or not", singleCartItem);
            singleItem['quantity'] = singleCartItem.quantity
            // console.log("single item of itemlist", singleItem);
          } else {
            this.removeItemArray.forEach((removeItem) => {
              console.log("what is in remove item", removeItem)
              if (singleItem._id == removeItem) {
                singleItem['quantity'] = 0
              }
            })
          }
        })
      } else {
        console.log("check this else part", singleItem);
        singleItem['quantity'] = 0
      }
      if (this.selectedGender == 'male') {
        if (singleItem.quantity == singleItem.quantity) {
          // console.log("call this condition or not", typeof this.previousQuantity, singleItem.quantity);
          this.previousQuantity = singleItem.quantity
          console.log("after assign the value", this.previousQuantity);
        } else {
          this.previousQuantity = undefined
        }
      }
      if (this.selectedGender == 'female') {
        if (singleItem.quantity == singleItem.quantity) {
          // console.log("call this condition or not", typeof this.previousQuantity, singleItem.quantity);
          this.previousQuantityFemale = singleItem.quantity
          console.log("after assign the value", this.previousQuantityFemale);
        } else {
          this.previousQuantityFemale = undefined
        }
      }
    })
    console.log("final item list", this.itemList);

  }

  changeGroup(event) {
    // console.log("index of group", event.target.value);

    // this.previousQuantity = undefined
    this.groupIndex = event.target.value
    this.selectedGender = 'male'
    this.selectedwallet = 0
    this.itemList = _.filter(this.displayGroup[this.groupIndex].item, { 'itemGender': this.selectedGender });
    this.itemList.forEach((singleItem) => {
      // console.log("values of items ", typeof singleItem, singleItem['quantity'])

      if (this.cartTotalItems && this.cartTotalItems.length > 0) {
        this.cartTotalItems.forEach((singleCartItem) => {
          // console.log("call or not", singleCartItem);
          if (singleItem._id == singleCartItem.itemId) {
            // console.log("first of comdition");
            singleItem['quantity'] = singleCartItem.quantity
          } else {
            this.removeItemArray.forEach((removeItem) => {
              if (singleItem._id == removeItem) {
                singleItem['quantity'] = 0
              }
            })
          }
        })
      } else {
        console.log("final else part", singleItem);
        singleItem['quantity'] = 0
      }
      if (singleItem.quantity == singleItem.quantity) {
        console.log("call this condition or not", typeof this.previousQuantity, singleItem.quantity);
        this.previousQuantity = singleItem.quantity
        console.log("after assign the value", this.previousQuantity);
      } else {
        this.previousQuantity = undefined
      }
    })
    console.log("item list of male", this.itemList);

  }

  maleTotal(event, item, index) {
    console.log("what is in item", event.target.value);

    if (event.target.value != 0) {
      if (this.maleQuantity && this.maleQuantity.length) {
        console.log("whats it the total item", this.maleQuantity);
        let newIndex = this.maleQuantity.filter(x => x.itemId === item._id)
        console.log("8888888888888-- This Is fucking good--------", newIndex);
        if (newIndex && newIndex.length) {
          this.maleQuantity.forEach((singleItem) => {
            if (singleItem.itemId === item._id) {
              console.log("call this or not =============", singleItem);
              // console.log("single item of male", singleItem);
              if (singleItem.quantity > event.target.value) {
                console.log("this is first one");
                this.toastr.error('removed', '', {
                  timeOut: 1000,
                  positionClass: 'toast-bottom-center'
                })
                singleItem['quantity'] = event.target.value
              }
              if (singleItem.quantity < event.target.value) {
                console.log("this is last one");
                this.toastr.success('added', '', {
                  timeOut: 1000,
                  positionClass: 'toast-bottom-center'
                })
                singleItem['quantity'] = event.target.value
              }
            }
          })
        } else {
          // if (singleItem.itemId != item._id) {
          console.log("this is so  much important============");
          let newObject = {
            itemId: item._id,
            quantity: event.target.value
          }
          this.toastr.success('added', '', {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          })
          this.maleQuantity.push(newObject)
          // }
        }
      } else {
        console.log("this is important");
        let newObject = {
          itemId: item._id,
          quantity: event.target.value
        }
        this.toastr.success('added', '', {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        })
        this.maleQuantity.push(newObject)
      }
      console.log("this is final data", this.maleQuantity);
      this.itemList[index]['quantity'] = event.target.value
      console.log("kaik thay che ama bs", item);


      let obj = {
        activityName: this.displayActivity[this.activityIndex].activityName,
        // itemGender: item.itemGender,
        // itemName: item.itemName,
        // itemPrice: item.itemPrice,
        quantity: item.quantity,
        itemId: item._id,
        groupName: this.displayGroup[0].groupName
      }
      var tempIndex = _.findIndex(this.allCartList, function (o) { return o.itemId == item._id })
      if (tempIndex > -1) {
        this.allCartList[tempIndex].quantity = event.target.value
      }
      else {
        this.allCartList.push(obj)
      }
      this.previousQuantity = event.target.value
      console.log("object of acitivity name", this.allCartList);
    } else {
      let index1 = this.allCartList.findIndex(x => x.itemId === item._id);
      this.allCartList.splice(index1, 1);

      let removeIndex = this.maleQuantity.findIndex(x => x.itemId == item._id)
      console.log("this is to be removed from array", removeIndex);
      this.maleQuantity.splice(removeIndex, 1)
      console.log("this is fial array with remove", this.maleQuantity);


      this.toastr.error('Item removed from cart', '', {
        timeOut: 1000,
        positionClass: 'toast-bottom-center'
      })
    }
    console.log("final list of cart", this.allCartList);

  }


  femaleTotal(event, item, index) {

    // console.log("kaik thay che ama bs", event.target.value, item);
    if (event.target.value != 0) {

      if (this.femaleQuantity && this.femaleQuantity.length) {
        console.log("whats it the total item", this.femaleQuantity);
        let newIndex = this.femaleQuantity.filter(x => x.itemId === item._id)
        console.log("8888888888888-- This Is fucking good--------", newIndex);
        if (newIndex && newIndex.length) {
          this.femaleQuantity.forEach((singleItem) => {
            if (singleItem.itemId === item._id) {
              // console.log("single item of male", singleItem);
              if (singleItem.quantity > event.target.value) {
                console.log("this is first one");
                this.toastr.error('removed', '', {
                  timeOut: 1000,
                  positionClass: 'toast-bottom-center'
                })
                singleItem['quantity'] = event.target.value
              }
              if (singleItem.quantity < event.target.value) {
                console.log("this is last one");
                this.toastr.success('added', '', {
                  timeOut: 1000,
                  positionClass: 'toast-bottom-center'
                })
                singleItem['quantity'] = event.target.value
              }
            }
          })
        } else {
          // if (singleItem.itemId != item._id) {
          console.log("this is so  much important============");
          let newObject = {
            itemId: item._id,
            quantity: event.target.value
          }
          this.toastr.success('added', '', {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          })
          this.femaleQuantity.push(newObject)
          // }
        }
      } else {
        console.log("this is important");
        let newObject = {
          itemId: item._id,
          quantity: event.target.value
        }
        this.toastr.success('added', '', {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        })
        this.femaleQuantity.push(newObject)
      }
      console.log("what is the finale value for female", this.femaleQuantity);
      this.itemList[index]['quantity'] = event.target.value
      let obj = {
        activityName: this.displayActivity[this.activityIndex].activityName,
        // itemGender: item.itemGender,
        // itemName: item.itemName,
        // itemPrice: item.itemPrice,
        quantity: item.quantity,
        itemId: item._id,
        groupName: this.displayGroup[0].groupName
      }
      var tempIndex = _.findIndex(this.allCartList, function (o) { return o.itemId == item._id })
      if (tempIndex > -1) {
        this.allCartList[tempIndex].quantity = event.target.value
      }
      else {
        this.allCartList.push(obj)
      }
      this.previousQuantityFemale = event.target.value
    } else {
      let index1 = this.allCartList.findIndex(x => x.itemId === item._id);
      this.allCartList.splice(index1, 1);
      let removeIndex = this.femaleQuantity.findIndex(x => x.itemId == item._id)
      console.log("this is to be removed from array", removeIndex);
      this.femaleQuantity.splice(removeIndex, 1)

      this.toastr.error('Item removed from cart', '', {
        timeOut: 1000,
        positionClass: 'toast-bottom-center'
      })
    }
    console.log("final list of cart", this.allCartList);

    // console.log("object of acitivity name", this.allCartList);
  }

  addTocart() {
    // this.isLoad = true
    console.log("list of all item ", this.allCartList)
    if (this.allCartList.length == 0) {
      console.log("call this");
      this.allCartList = this.cartTotalItems
    }
    localStorage.setItem('allCartList', JSON.stringify(this.allCartList))
    localStorage.setItem('maleQuantity', JSON.stringify(this.maleQuantity))
    localStorage.setItem('femaleQuantity', JSON.stringify(this.femaleQuantity))
    // let body = {
    //   eventHashtag: this.eventHashtag
    // }

    this.totalItemList.emit({ allItems: this.allCartList, index: 1 })


    // this.allCartList[0]['eventHashtag'] = this.eventHashtag
    // this.eventService.addToCart(this.allCartList).subscribe((response: any) => {
    //   console.log("resonse of cart details", response)
    //   this.allCartList = response.data.data.cartList
    //   this.totalItemList.emit({ allItems: response.data.data.cartList, index: 1 })
    //   this.isLoad = false
    // }, error => {
    //   console.log("error while add cart items", error);
    // })
  }
  openModel(item) {
    console.log("call this", item)
    let data = {
      itemName: item.itemName,
      description: item.description
    }
    var addBank = this.openDialog(DescriptionComponent, data).subscribe((response) => {
      console.log("what is in response", response);
    })
  }

  openDialog(someComponent, data = {}): Observable<any> {
    console.log("OPENDIALOG", "DATA = ", data);
    const dialogRef = this.dialog.open(someComponent, { data });
    return dialogRef.afterClosed();
  }

  displayCart() {
    this.totalItemList.emit({ allItems: this.allCartList, index: 1 })
  }
}
