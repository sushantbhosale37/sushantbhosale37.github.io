import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCardData() {
    const url = `${this.BASE_URL}/commonMaster/GetMasterData`;
    return this.http.post(url, {});
  }

}
