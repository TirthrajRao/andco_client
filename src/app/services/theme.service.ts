import { Injectable } from '@angular/core';

export const luxury = {
  'primary-color': 'red',
  'secnd-color': 'black',
  'background-color': '#1f2935',
  'text-color': '#fff'
};






@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  toggleDark() {
    this.setTheme(luxury);
  }

  // toggleLight() {
  //   this.setTheme(lightTheme);
  // }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

}
