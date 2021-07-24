import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonLibService {
  constructor() { }

  chunk = (array: any[], size: number) => {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  }

  dynamicColors = (n: number) => {
    const arr: string[] = [];

    const colors = [
      '#3366CC',
      '#7fdbff',
      '#ef9a9a',
      '#FFD700',
      '#0099C6',
      '#DD4477',
      '#66AA00',
      '#B82E2E',
      '#316395',
      '#994499',
      '#E67300',
      '#8B0707',
      '#329262',
      '#5574A6',
      '#109618',
      '#FFB6C1',
      '#FFA07A',
      '#990099',
      '#800000',
      '#191970',
      '#DB7093',
      '#FF6347',
      '#FFA500',
      '#DC3912',
      '#b388ff',
      '#006064',
      '#18ffff',
      '#00bfa5',
      '#1b5e20',
      '#cddc39',
      '#827717',
      '#64dd17',
      '#ffcc80',
      '#4e342e',
      '#3B3EAC',
      '#bcaaa4',
      '#795548',
      '#880e4f',
      '#ea80fc',
      '#b27765',
      '#a5d6a7',
      '#ffe69b',
      '#b7deb8',
      '#7d6d99',
      '#fff59d',
      '#6633CC',
      '#FF4500',
      '#a1a66d',
      '#f2aeae',
      '#c5e1a5',
      '#ffab40',
      '#8d6e63',
      '#ffccbc',
      '#f8bbd0',
      '#e1bee7',
      '#b2dfdb',
      '#aed581',
      '#FF9900',
      '#22AA99',
      '#AAAA11'
    ];

    let j = 0;
    for (let i = 0; i < n; i++) {
      arr.push(colors[j++]);
      if (j === colors.length) {
        j = 0;
      }
    }
    // for (let i = 0; i < n; i++) {
    //   const r = Math.floor(Math.random() * 255);
    //   const g = Math.floor(Math.random() * 255);
    //   const b = Math.floor(Math.random() * 255);
    //   arr.push('rgb(' + r + ',' + g + ',' + b + ')');
    // }
    return arr;
  }

  isEmptyObj = (obj: object) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  sortToAscending(data: any, column: any) {
    let nameA: any;
    let nameB: any;
    data.sort((a: any, b: any) => {
      if (column === '' || column === null || typeof column === 'undefined') {
        nameA = a.toUpperCase(); // ignore upper and lowercase
        nameB = b.toUpperCase(); // ignore upper and lowercase
      } else {
        nameA = a[column].toUpperCase(); // ignore upper and lowercase
        nameB = b[column].toUpperCase(); // ignore upper and lowercase
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  canvasToImage(backgroundColor: string, c) {
    const context = c.getContext('2d');

    const canvas = context.canvas;
    // cache height and width
    const w = canvas.width;
    const h = canvas.height;

    let data;

    // get the current ImageData for the canvas.
    data = context.getImageData(0, 0, w, h);

    // store the current globalCompositeOperation
    const compositeOperation = context.globalCompositeOperation;

    // set to draw behind current content
    context.globalCompositeOperation = 'destination-over';

    // set background color
    context.fillStyle = backgroundColor;

    // draw background / rect on entire canvas
    context.fillRect(0, 0, w, h);

    // get the image data from the canvas
    const imageData = canvas.toDataURL('image/jpeg');

    // clear the canvas
    context.clearRect(0, 0, w, h);

    // restore it with original / cached ImageData
    context.putImageData(data, 0, 0);

    // reset the globalCompositeOperation to what it was
    context.globalCompositeOperation = compositeOperation;

    // return the Base64 encoded data url string
    return imageData.replace('image/jpeg', 'image/octet-stream');
  }

  deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.deepCopy(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }

  isEqual(value, other) {
    // Get the value type
    const type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) {
      return false;
    }

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
      return false;
    }

    // Compare the length of the length of the two items
    const valueLen =
      type === '[object Array]' ? value.length : Object.keys(value).length;
    const otherLen =
      type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
      return false;
    }

    // Compare two items
    const compare = (item1, item2) => {
      // Get the object type
      const itemType = Object.prototype.toString.call(item1);

      // If an object or array, compare recursively
      if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!this.isEqual(item1, item2)) {
          return false;
        }
      } else {
        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) {
          return false;
        }

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
          if (item1.toString() !== item2.toString()) {
            return false;
          }
        } else {
          if (item1 !== item2) {
            return false;
          }
        }
      }
    };

    // Compare properties
    if (type === '[object Array]') {
      for (let i = 0; i < valueLen; i++) {
        if (compare(value[i], other[i]) === false) {
          return false;
        }
      }
    } else {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          if (compare(value[key], other[key]) === false) {
            return false;
          }
        }
      }
    }

    // If nothing failed, return true
    return true;
  }
}
