import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}
  login(user) {
    const url = `${this.BASE_URL}/login`;
    const req = new HttpParams({
      fromObject: user
    });
    return this.http.post(url, req).toPromise();
  }

  initialLogin(user) {
    const id = window.location.pathname.split('/').pop();
    const url = `${this.BASE_URL}/umf/v1/auth/create/${id}`;
    user['re-password'] = user['repassword'];
    delete user['repassword'];
    return this.http.post(url, user);
  }

  getAccessTokenBasedOnRefreshToken(username: string, refreshToken: string) {
    const url = `${this.BASE_URL}/login`;
    const user = {
      UserName: username,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    };
    const req = new HttpParams({
      fromObject: user
    });
    return this.http.post(url, req);
  }

  getAccessToken(): string {    
    return localStorage.getItem('token');
  }

  removeStorageValues() {  
    debugger  
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {    
    return this.getAccessToken() !== null;
  }

  register(user) {
    const url = `${this.BASE_URL}/umf/v1/auth/register`;
    return this.http.post(url, user);
  }

  public setForgotPassword(details) {
    const url = `${this.BASE_URL}/umf/v1/auth/forgot-password`;
    return this.http.post(url, details);
  }

  public setResetPassword(details) {
    const url = `${this.BASE_URL}/umf/v1/auth/reset-password`;
    return this.http.post(url, details);
  }

  public setNewUserPassword(details) {
    const url = `${this.BASE_URL}/umf/v1/auth/set-password`;
    return this.http.put(url, details);
  }

  logout() {
    const url = `${this.BASE_URL}/umf/v1/auth/logout`;
    return this.http.get(url).toPromise();
  }
}
