import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input("headerEvent") clickOnPrint

  constructor() { }



  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes in header", changes)
  }

  ngOnInit() {

  }

}
