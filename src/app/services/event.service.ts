import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config'

@Injectable({
  providedIn: 'root'
})
export class EventService {

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



  /**
   * @param {Object} data
   * Add new activity in event 
   */
  addActivities(data) {
    // console.log("activity data", data);
    return this.http.post(config.baseApiUrl + "/activity", data.activity);
  }

  /**
   * @param eventId 
   * Get Single Evene Details
   */
  getEventDetails(eventId) {
    return this.http.get(config.baseApiUrl + "/event/" + eventId)
  }

  addGroup(groupDetails, eventId) {
    // console.log("details of group array", eventId);
    let body = {
      eventId: eventId
    }
    return this.http.post(config.baseApiUrl + "/group", groupDetails, { params: body })
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
    const eventId = {
      eventId: id
    }
    return this.http.post(config.baseApiUrl + "/event/join-event", eventId)
  }

}
