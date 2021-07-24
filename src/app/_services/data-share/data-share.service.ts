import { Injectable } from '@angular/core';

@Injectable()
export class DataShareService {
  private dataArray: any = {};
  constructor() {
    this.dataArray = {};
  }

  setData(key, value) {
    this.dataArray[key] = value;
  }
  getData(key) {
    return this.dataArray[key];
  }
  removeData(key) {
    delete this.dataArray[key];
  }
}
