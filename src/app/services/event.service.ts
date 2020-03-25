import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config'
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  platForm = JSON.parse(sessionStorage.getItem('platForm'))

  constructor(
    private http: HttpClient
  ) { }



  /**
   * @param {Object} body 
   * @param {Object} files 
   * @param {Object} themeFiles
   * Create new event
   */
  addEvent(body, files: any) {
    // console.log("event detailsssssss", body);
    // console.log("filessssss name ", files);
    let formdata = new FormData();
    formdata.append('eventTitle', body.eventTitle);
    formdata.append('eventType', body.eventType);
    formdata.append('hashTag', body.hashTag);
    formdata.append('background', body.background)
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("profile", files[i]);
      }
    }
    return this.http.post(config.baseApiUrl + "/event", formdata);
  }


  updateEvent(eventId, body, files: any) {

    let formdata = new FormData();
    formdata.append('eventTitle', body.eventTitle);
    formdata.append('eventType', body.eventType);
    formdata.append('hashTag', body.hashTag);
    formdata.append('background', body.background)
    formdata.append('eventId', eventId)
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("profile", files[i]);
      }
    }
    return this.http.put(config.baseApiUrl + "/event", formdata);
  }



  /**
   * @param {Object} data
   * Add new activity in event 
   */
  addActivities(data) {
    // console.log("activity data", data);
    return this.http.post(config.baseApiUrl + "/activity", data.activity);
  }


  updateActivites(data) {
    console.log("data of update ", data);
    return this.http.put(config.baseApiUrl + "/activity/", data)
  }

  removeActivity(data) {
    return this.http.post(config.baseApiUrl + "/activity-delete", data)
  }

  /**
   * @param eventId 
   * Get Single Evene Details
   */
  getEventDetails(eventId) {
    return this.http.get(config.baseApiUrl + "/event/" + eventId)
  }

  getActivityDetails(eventId) {
    return this.http.get(config.baseApiUrl + "/event/activity/" + eventId)
  }

  addGroup(groupDetails, eventId) {
    // console.log("details of group array", eventId);
    let body = {
      eventId: eventId
    }
    return this.http.post(config.baseApiUrl + "/group", groupDetails, { params: body })
  }

  setPriceOfEvent(data, eventId) {
    data['eventId'] = eventId
    return this.http.post(config.baseApiUrl + "/event/set-price", data)
  }


  updateEetPriceOfEvent(data, eventId) {
    data['eventId'] = eventId
    return this.http.put(config.baseApiUrl + "/event/set-price", data)
  }


  getLoginUserEvent() {
    return this.http.get(config.baseApiUrl + "/event/myevent-list")
  }

  getSingleEventDetails(eventId) {
    return this.http.get(config.baseApiUrl + "/event/" + eventId)
  }


  changeProfilePhoto(files: any, eventId) {
    console.log("event id of photo", files, eventId);
    let formdata = new FormData
    formdata.append("eventId", eventId)
    formdata.append("profile", files);
    return this.http.post(config.baseApiUrl + '/event/changeProfile', formdata)
  }

  getGuestEventDetails(hashTag) {
    return this.http.get(config.baseApiUrl + "/event/guestEvent/" + hashTag)
  }

  joinEvent(id) {
    // const eventId = {
    //   eventId: id,
    //   platForm: this.platForm
    // }
    console.log("eventDetails", id);

    return this.http.post(config.baseApiUrl + "/event/join-event", id)
  }


  enterAddress(data) {
    return this.http.post(config.baseApiUrl + "/address", data)
  }

  getAddressDetails() {
    return this.http.get(config.baseApiUrl + "/address")
  }


  addToCart(data) {
    console.log("final data", data);
    return this.http.post(config.baseApiUrl + "/cart", data)
  }


  getCartItems(hashTag) {
    return this.http.get(config.baseApiUrl + "/event/cart-list/" + hashTag)
  }

  removeCartItem(itemId) {
    return this.http.delete(config.baseApiUrl + "/cart?itemId=" + itemId)
  }

  addDonation(cartDetails) {
    return this.http.post(config.baseApiUrl + "/event/add-donation", cartDetails)
  }

  getDonationAmount(hashTag) {
    return this.http.get(config.baseApiUrl + "/event/getDonation/" + hashTag)
  }

  getTotalOfCart(hashTag) {
    return this.http.get(config.baseApiUrl + "/event/getTotalOfCart/" + hashTag)
  }

  addAccountDetails(data, flag, cartList) {
    data['flag'] = flag
    data['cartItems'] = cartList
    console.log("flage value", data);
    // let newFlage = JSON.stringify(flag)
    return this.http.post(config.baseApiUrl + "/guestAccount", data)
  }

  getAccountDetails(accountType) {
    let body = {
      type: accountType
    }
    return this.http.get(config.baseApiUrl + "/guestAccount", { params: body })
  }


  getAfterEventMessage(eventId) {
    return this.http.get(config.baseApiUrl + "/event/afterEventMessage/" + eventId)
  }

  getGuestList(eventId) {
    let body = {
      eventId: eventId
    }
    return this.http.get(config.baseApiUrl + "/guest-list/", { params: body })
  }


  getEventCollection(eventId) {
    return this.http.get(config.baseApiUrl + "/event-collection?eventId=" + eventId)
  }

  getItemsOfGuest(eventId) {
    return this.http.get(config.baseApiUrl + "/guest?eventId=" + eventId)
  }


  getPriceOfEvent(eventId) {
    return this.http.get(config.baseApiUrl + "/event/set-price/" + eventId)
  }

  updateGroup(data) {
    return this.http.put(config.baseApiUrl + "/group/", data)
  }
  removeItem(itemId, groupId) {
    let body = {
      itemId: itemId,
      groupId: groupId
    }
    return this.http.put(config.baseApiUrl + "/group/delete-item", body)
  }

  addInviationMessage(message) {
    return this.http.post(config.baseApiUrl + "/event/invitation", message)
  }
  setReminderMessage(value, eventId) {
    value['eventId'] = eventId
    return this.http.post(config.baseApiUrl + "/event/setReminder", value)
  }
}
