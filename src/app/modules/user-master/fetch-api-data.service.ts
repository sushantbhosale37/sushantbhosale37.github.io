import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTableData(params: object, activeView: boolean) {
    let url = `${this.BASE_URL}/frankly/v1/campaign-progress-report/getData`;
    if (!('isTable' in params)) {
      params = Object.assign(params, { isTable: true });
    }
    if (typeof activeView !== 'undefined') {
      url = `${url}${activeView ? '?status=active' : '?status=inactive'}`;
    }
    return this.http.post(url, params);
  }

  getRelativeFilterValues(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetRelativeCommonData`;
    return this.http.post(url, params);
  }

  getFilterValues(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetCommonData`;
    return this.http.post(url, params);
  }

  getUserData(params: object) {
    debugger;
    const url = `${this.BASE_URL}/account/GetUserData`;
    return this.http.post(url, params);
  }

  getGetOrderData(params: object) {
    const url = `${this.BASE_URL}/order/GetOrderData`;
    return this.http.post(url, params);
  }

  saveUser(params) {
    const url = `${this.BASE_URL}/account/AddUpdateUser`;
    return this.http.post(url, params
    );
  }

  updateUser(params: object) {
    const url = `${this.BASE_URL}/account/AddUpdateUser`;
    return this.http.post(url, params);
  }

  deleteUser(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }


  getCommentsCounts() {
    const url = `${this.BASE_URL}/frankly/v1/campaign-progress-report/getCommentsCountData`;
    return this.http.get(url);
  }

  getLastUpdatedData(appId) {
    const url = `${this.BASE_URL}/frankly/v1/common/getLastUpdatedData/${appId}`;
    return this.http.get(url);
  }
}
