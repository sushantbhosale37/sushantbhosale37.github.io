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
  getGetMeasurementData(params: object) {
    const url = `${this.BASE_URL}/measurement/GetMeasurementData `;
    return this.http.post(url, params);
  }

  saveMeasurement(params) {
    const url = `${this.BASE_URL}/measurement/AddUpdateMeasurement`;
    return this.http.post(url, params
    );
  }

  updateMeasurement(params: object) {
    const url = `${this.BASE_URL}/measurement/AddUpdateMeasurement`;
    return this.http.post(url, params);
  }

  deleteMeasurement(params: object) {
    const url = `${this.BASE_URL}/commonMaster/DeleteDataOnFlag`;
    return this.http.post(url, params);
  }
}
