import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRelativeFilterValues(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetRelativeCommonData`;
    return this.http.post(url, params);
  }

  getFilterValues(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetCommonData`;
    return this.http.post(url, params);
  }

  getSalesData(params: object) {
    const url = `${this.BASE_URL}/sales/GetSalesData`;
    return this.http.post(url, params);
  }

  getGetOrderData(params: object) {
    const url = `${this.BASE_URL}/order/GetOrderData`;
    return this.http.post(url, params);
  }

  saveSales(params) {
    const url = `${this.BASE_URL}/sales/AddUpdateSales`;
    return this.http.post(url, params
    );
  }

  updateSales(params: object) {
    const url = `${this.BASE_URL}/sales/AddUpdateSales`;
    return this.http.post(url, params);
  }

  deleteSales(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }

  getCustomerData(params: object) {
    const url = `${this.BASE_URL}/customer/GetCustomerData`;
    return this.http.post(url, params);
  }

  getGetProductData(params: object) {
    const url = `${this.BASE_URL}/product/GetProductData `;
    return this.http.post(url, params);
  }

  checkAvailableProdQty(params: object) {
    const url = `${this.BASE_URL}/sales/CheckAvailableProdQty `;
    return this.http.post(url, params);
  }


}
