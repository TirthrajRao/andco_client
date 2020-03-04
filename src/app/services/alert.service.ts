import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // const Swal = require('sweetalert2')
  //  colors = [
  //    ""
  //  ]
  constructor() { }

  /**
   * @param {String} message
   * Alert for all success response 
   */
  getSuccess(message) {
    // console.log(message);
    Swal.fire({
      imageUrl: '../../assets/images/andco_logo.png',
      imageWidth: 350,
      title: message,
      showConfirmButton: false,
      timer: 4000,
      icon: 'success',
      focusConfirm: true,
    })
  }


  /**
   * @param {String} message
   * Alert for all error response 
   */
  getError(message) {
    // console.log(message);
    Swal.fire({
      imageUrl: '../../assets/images/andco_logo.png',
      imageWidth: 350,
      title: message,
      showConfirmButton: false,
      timer: 4000,
      icon: 'error',
      focusConfirm: true,
    })
  }
}