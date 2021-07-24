import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
  constructor(private http: HttpClient) {}

  public getFilterDataList(filterUrl, params) {
    for (const key in params) {
      if (
        typeof params[key] !== 'undefined' &&
        key !== 'time_key1' &&
        key !== 'time_key2'
      ) {
        params[key] = params[key].join();
      }
    }
    return this.http.post(filterUrl, params);
  }
}
