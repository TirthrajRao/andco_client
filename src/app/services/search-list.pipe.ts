import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'searchList'
})
export class SearchListPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }



  transform1(items: any[], searchText: string): any[] {
    console.log("items==>", items);
    console.log("searchtext===>", searchText);
    var developer: any = [];
    if (!items) return [];
    if (!searchText) return items[0];
    searchText = searchText.toLowerCase();

    console.log("Search pipe items = ", items, searchText);
    developer = items[0].filter(it => {
      console.log("result in search", it)
      // if (it.name) {

      if (it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)) {
        console.log("it ==>", it);

        return it;
      }
      // }
    });
    return developer;
  }

}
