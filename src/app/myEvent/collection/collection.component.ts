import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @Input('totalCollection') totalCollection

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes in collectiion", changes.totalCollection.currentValue);
    if (changes.totalCollection.currentValue) {
      
    }

  }
}
