import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn: false;
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }





  /**
   * 
   * @param {Object} data
   * Check verification code for new register user 
   */
  mailSendForCode(data) {
    console.log(data);
    let body = {
      email: data
    }
    return this.http.put(config.baseApiUrl + "/mailSend", body);
  }

  /**
   * @param {Object} data
   * Check verification code for new register user 
   */
  verificationCode(data) {
    console.log(data);
    return this.http.put(config.baseApiUrl + "/email-verify", data);
  }


  /**
  * @param {Object} details
  * SignUp form form new user  
  */
  signUpOfEmail(details) {
    return this.http.post(config.baseApiUrl + "/signup", details);
  }


  /**
   * @param {Object} userCredentials
   * Login for guest and celebrant  
   */
  login(userCredentials) {
    console.log("helloooooooo", userCredentials);
    const eventToken = JSON.parse(sessionStorage.getItem('newEventId'));
    console.log("login with link ", eventToken);
    if (eventToken) {
      // userCredentials.eventId = eventToken;
      // console.log("userdata", userCredentials);
      return this.http.post<any>(config.baseApiUrl + "/login", userCredentials)
        .pipe(map(user => {
          console.log("login user detaislllllllllll======", user);
          if (user && user.data.accessToken) {
            sessionStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
            this.currentUserSubject.next(user);
          }
          return user;
        }))
    }
    else {
      return this.http.post<any>(config.baseApiUrl + "/login", userCredentials)
        .pipe(map(user => {
          console.log("login user detaislllllllllll======", user);
          if (user && user.data.accessToken) {
            // sessionStorage.setItem('currentUser', JSON.stringify(user.data));
            sessionStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
            this.currentUserSubject.next(user);
          }
          return user;
        }))
    }

  }

  /**
   * Logout from website
   */
  logout() {
    this.currentUserSubject.next(null);
    sessionStorage.clear();
  }
}
