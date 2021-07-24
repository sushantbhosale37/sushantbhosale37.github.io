import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchStr'
})
export class SearchStringPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.toLowerCase().includes(searchText);
    });
  }
}

// Example
// <input #txtSearch placeholder="first name" />
// <ul>
//   <li *ngFor="let c of characters | filter : txtSearch.value">
//     {{c}}
//   </li>
// </ul>
