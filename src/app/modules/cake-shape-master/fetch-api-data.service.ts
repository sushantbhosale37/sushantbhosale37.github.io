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
  getGetCakeShapeData(params: object) {
    const url = `${this.BASE_URL}/cakeShape/GetCakeShapeData `;
    return this.http.post(url, params);
  }

  saveCakeShape(params) {
    const url = `${this.BASE_URL}/cakeShape/AddUpdateCakeShape`;
    return this.http.post(url, params
    );
  }

  updateCakeShape(params: object) {
    const url = `${this.BASE_URL}/cakeShape/AddUpdateCakeShape`;
    return this.http.post(url, params);
  }

  deleteCakeShape(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }
}
