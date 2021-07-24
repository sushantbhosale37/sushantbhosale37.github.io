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
  getGetCategoryData(params: object) {
    const url = `${this.BASE_URL}/category/GetCategoryData `;
    return this.http.post(url, params);
  }

  saveCategory(params) {
    const url = `${this.BASE_URL}/category/AddUpdateCategory`;
    return this.http.post(url, params
    );
  }

  updateCategory(params: object) {
    const url = `${this.BASE_URL}/category/AddUpdateCategory`;
    return this.http.post(url, params);
  }

  deleteCategory(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }
}
