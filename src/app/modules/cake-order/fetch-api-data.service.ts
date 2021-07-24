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

  getFilterValues(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetCommonData`;
    return this.http.post(url, params);
  }

  getCustomerData(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetCommonData`;
    return this.http.post(url, params);
  }

  getGetOrderData(params: object) {
    const url = `${this.BASE_URL}/order/GetOrderData`;
    return this.http.post(url, params);
  }

  saveInsertionOrder(params) {
    const url = `${this.BASE_URL}/order/AddUpdateOrder`;
    return this.http.post(url, params
    );
  }

  updateInsertionOrder(params: object) {
    const url = `${this.BASE_URL}/order/AddUpdateOrder`;
    return this.http.post(url, params);
  }

  updateDeliveryStatus(params: object) {
    const url = `${this.BASE_URL}/order/UpdateOrderStatus `;
    return this.http.post(url, params);
  }

  deleteCakeOrder(params: object) {
    const url = `${this.BASE_URL}/order/DeleteOrderData`;
    return this.http.post(url, params);
  }


  getGetCakeProductData(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetRelativeCommonData`;
    return this.http.post(url, params);
  }
}
