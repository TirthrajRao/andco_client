import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  key = "andCo@testing";
  bankDetails = "abc";
  isUserLoggedIn: false;
  private subject = new Subject<any>();
  private newMenu = new Subject<any>();
  private openBank = new Subject<any>();
  private openBankNew = new BehaviorSubject<any>(this.bankDetails)
  sharedBankDetails = this.openBankNew.asObservable();
  @Output() faceBookLogin = new EventEmitter();
  @Output() printData = new EventEmitter();

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


  nextBankDetails(data) {
    console.log("in login service=========", data);
    this.openBankNew.next(data)
  }


  /**
   * 
   * @param {Object} data
   * Check verification code for new register user 
   */
  mailSendForCode(data) {
    // console.log(data);
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
    // console.log(data);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
    data['verificationNewCode'] = encrypted
    return this.http.put(config.baseApiUrl + "/email-verify", data);
  }


  /**
  * @param {Object} details
  * SignUp form form new user  
  */
  signUpOfEmail(details) {
    // console.log("details of new user", details)
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(details.password), this.key).toString();
    details['password'] = encrypted
    return this.http.post(config.baseApiUrl + "/signup", details);
  }


  /**
   * @param {Object} userCredentials
   * Login for guest and celebrant  
   */
  login(userCredentials) {
    // console.log("helloooooooo", userCredentials);
    // const eventToken = JSON.parse(sessionStorage.getItem('guestHashTag'));
    // console.log("login with link ", eventToken);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(userCredentials.password), this.key).toString();
    userCredentials['password'] = encrypted
    // if (eventToken) {
    //   return this.http.post<any>(config.baseApiUrl + "/login", userCredentials)
    //     .pipe(map(user => {
    //       console.log("login user detaislllllllllll for link======", user);
    //       sessionStorage.setItem('isMenu', JSON.stringify(0));
    //       if (user && user.data.accessToken) {
    //         sessionStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
    //         this.currentUserSubject.next(user);
    //       }
    //       return user;
    //     }))
    // }
    // else {
    return this.http.post<any>(config.baseApiUrl + "/login", userCredentials)
      .pipe(map(user => {
        console.log("login user detaislllllllllll======", user);
        sessionStorage.setItem('isMenu', JSON.stringify(0));

        let token = user.data.accessToken
        if (user && user.data.accessToken) {
          sessionStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
          this.currentUserSubject.next(user);
        }
        return user;
      }))
    // }

  }


  /**
   * @param {String} id_token
   * Login with google  
   */
  googleLogin(id_token) {
    const body = {
      id_token: id_token
    }
    // console.log(body);
    return this.http.post<any>(config.baseApiUrl + "/login/google", body)
      .pipe(map(googleUser => {
        console.log("google login user accesstoken", googleUser);
        if (googleUser && googleUser.data.accessToken) {
          sessionStorage.setItem('currentUser', JSON.stringify(googleUser.data.accessToken));
          sessionStorage.setItem('userRole', JSON.stringify(googleUser.data.UserRole));
          this.currentUserSubject.next(googleUser);
        }
        return googleUser;
      }))
  }

  /**
   * @param {String} accessToken
   * Login with Facebook 
   */
  facebookLogin(accessToken) {
    // console.log("facebook id", accessToken);
    const body = {
      sFaceBookSecretId: accessToken
    }
    return this.http.post<any>(config.baseApiUrl + "/login/facebook", body)
      .pipe(map(facebookUser => {
        // console.log("facebook user jwt token", facebookUser);
        if (facebookUser && facebookUser.data.accessToken) {
          sessionStorage.setItem('currentUser', JSON.stringify(facebookUser.data.accessToken));
          sessionStorage.setItem('userRole', JSON.stringify(facebookUser.data.UserRole));
          this.currentUserSubject.next(facebookUser);

        }
        return facebookUser;
      }))
  }

  /**
   * Logout from website
   */
  logout() {
    this.currentUserSubject.next(null);
    sessionStorage.clear();
    localStorage.clear()
  }


  /**
   * @param {Object} data
   * Send link of forgot password on email  
   */
  forgotPassword(data) {
    // console.log("forgot password email", data);
    return this.http.post(config.baseApiUrl + "/forgotpassword", data);
  }



  /**
   * @param {Object} data 
   * @param {String} id
   * Create new password if forgot  
   */
  forgotPasswordWithLink(data, id) {


    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data.newPassword), this.key).toString();
    data['newPassword'] = encrypted
    return this.http.post(config.baseApiUrl + "/reset-password/" + id, data)
  }


  returnLogin(val) {
    console.log("value0", val);
    this.subject.next({ id: val });
    return true;
  }
  getObservableResponse() {
    return this.subject.asObservable();
  }
  returnMenu(value) {
    this.newMenu.next({ menu: value })
    sessionStorage.setItem('isMenu', JSON.stringify(1));
    return true;
  }

  getNewMenu() {
    return this.newMenu.asObservable();
  }

  openBankModel(data) {
    console.log("in service");
    this.openBank.next({ data: data })
    return true
  }

  getBankAccount() {
    return this.openBank.asObservable()
  }

  addBankAccount(data) {
    data['flag'] = false
    return this.http.post(config.baseApiUrl + "/account", data)
  }
  addCardAccount(data) {
    data['flag'] = true
    return this.http.post(config.baseApiUrl + "/account", data)
  }


  getBankDetails() {
    return this.http.get(config.baseApiUrl + "/accountList")
  }
  updateMenu() {
    this.printData.emit('click')
  }


  getTimeZone(location) {
    console.log("what is in location", location);

    // https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY
    return this.http.get('https://maps.googleapis.com/maps/api/timezone/json?location=22.2855168,70.77560319999999&timestamp=1588513048296&key=AIzaSyDICNuRAiR00lCvchscgIM9C6ip62nkbx4')
  }



}
// AIzaSyDICNuRAiR00lCvchscgIM9C6ip62nkbx4