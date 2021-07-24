import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchObj'
})
export class SearchObjPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (value !== '') {
      return items.filter(it =>
        it[field].toLowerCase().includes(value.toLowerCase())
      );
    } else {
      return items;
    }
  }
}

// Example
// <input #txtSearch placeholder="first name" />
// <tr *ngFor="let item of mylst | searchObj: 'fname' : txtSearch.value">
//   <td>
//       {{item.fname}}
//   </td>
//   <td>
//       {{item.lname}}
//   </td>
// </tr>
