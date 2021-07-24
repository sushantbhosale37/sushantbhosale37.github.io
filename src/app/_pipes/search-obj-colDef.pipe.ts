import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'searchObjColDef'
})
export class SearchObjColDefPipe implements PipeTransform {
  transform(items: any[], field: [], value: string): any[] {
    let v = [];
    if (!items) {
      return [];
    }

    if (value !== '') {
      items.forEach(x => {
        let isAvailable = true;
        field.forEach(element => {
          let fieldName = element['field'];
          if (x['data'][fieldName] !== null && isAvailable) {
            if (element['format'] == "number") {
              if (x['data'][fieldName].includes(value)) {
                v.push(x);
                isAvailable = false;
              }
            } else if (element['format'] == "$" || element['format'] == "percentage") {
              if (x['data'][fieldName].toFixed(2).includes(value)) {
                v.push(x);
                isAvailable = false;
              }
            } else if (element['format'] == 'date') {
              let formatConfig = element['formatConfig']
              if (moment(x['data'][fieldName], 'YYYYMMDD').format(formatConfig).includes(value)) {
                v.push(x);
                isAvailable = false;
              }
            } else {
              if (x['data'][fieldName].toLowerCase().includes(value.toLowerCase())) {
                isAvailable = false;
                v.push(x);
              }
            }
          }

        });
      })
      return v;
    } else {
      return items;
    }
  }
}

// Example
// <input #txtSearch placeholder="first name" />
// <tr *ngFor="let item of mylst | searchObjColDef: 'fname' : txtSearch.value">
//   <td>
//       {{item.fname}}
//   </td>
//   <td>
//       {{item.lname}}
//   </td>
// </tr>
