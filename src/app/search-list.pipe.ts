import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'searchList'
// })
export class SearchListPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    console.log("items==>", items);
    console.log("searchtext===>", searchText);
    // return null;
    var task: any = [];
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    console.log("Search pipe items = ", items);
    task = items.filter(it => {
      console.log("single object in search pipe", it)

      // if(it.assignTo.name){

      if (it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)) {
        return it;
        // }
      }
    });
    // for(var i=0;i<items.length;i++){
    // }
    return task;
  }


  transform1(items: any[], searchText: string): any[] {
    console.log("items==>", items);
    console.log("searchtext===>", searchText);
    var developer: any = [];
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    console.log("Search pipe items = ", items, searchText);
    developer = items.filter(it => {
      console.log("result in search", it)
      // if (it.name) {

      if (it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)) {
        console.log("it ==>", it.name);

        return it;
      }
      // }
    });
    return developer;
  }

}
