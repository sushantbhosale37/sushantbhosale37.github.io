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

  getPurchaseData(params: object) {
    const url = `${this.BASE_URL}/purchase/GetPurchaseData`;
    return this.http.post(url, params);
  }

  getGetOrderData(params: object) {
    const url = `${this.BASE_URL}/order/GetOrderData`;
    return this.http.post(url, params);
  }

  savePurchase(params) {
    const url = `${this.BASE_URL}/purchase/AddUpdatePurchase`;
    return this.http.post(url, params
    );
  }

  updatePurchase(params: object) {
    const url = `${this.BASE_URL}/purchase/AddUpdatePurchase`;
    return this.http.post(url, params);
  }

  deletePurchase(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }

  getSupplierData(params: object) {
    const url = `${this.BASE_URL}/supplier/GetSupplierData`;
    return this.http.post(url, params);
  }

  getGetProductData(params: object) {
    const url = `${this.BASE_URL}/product/GetProductData `;
    return this.http.post(url, params);
  }
}
