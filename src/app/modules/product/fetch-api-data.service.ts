import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFilterValues(params: object) {
    const url = `${this.BASE_URL}/commonMaster/GetCommonData`;
    return this.http.post(url, params);
  }
  getGetProductData(params: object) {
    const url = `${this.BASE_URL}/product/GetProductData `;
    return this.http.post(url, params);
  }

  saveProduct(params) {
    const url = `${this.BASE_URL}/product/AddUpdateProduct`;
    return this.http.post(url, params
    );
  }

  updateProduct(params: object) {
    const url = `${this.BASE_URL}/product/AddUpdateProduct`;
    return this.http.post(url, params);
  }

  deleteProduct(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }
}
