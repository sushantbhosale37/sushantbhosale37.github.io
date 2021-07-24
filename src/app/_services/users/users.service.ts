import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getUsersList() {
    return this.http.get(`${this.BASE_URL}/umf/v1/users/users`);
  }

  public updateUserStatus(status, userId) {
    return this.http.post(
      `${this.BASE_URL}/users/update-status/${userId}`,
      status
    );
  }

  // public getRollList() {
  //   return this.http.get(`${this.BASE_URL}/roles/all`);
  // }

  public createUser(data) {
    // data[
    //   'redirect_url'
    // ] = `${window.location.protocol}//${window.location.host}/user/create`;
    return this.http.post(`${this.BASE_URL}/umf/v1/users/user`, data);
  }

  public verify(details) {
    const url = `${this.BASE_URL}/umf/v1/auth/token`;
    return this.http.post(url, details);
  }

  public updateUserDetails(user) {
    return this.http.put(`${this.BASE_URL}/umf/v1/common/users/update`, user);
  }

  public updateStatus(req) {
    return this.http.put(
      `${this.BASE_URL}/umf/v1/users/active-inactive`,
      req
    );
  }

  public getImpactedUser(req) {
    const url = `${this.BASE_URL}/umf/v1/users/user/get-impacted-user`;
    return this.http.post(url, req);
  }

  public updateImpactedUser(req) {
    return this.http.post(
      `${this.BASE_URL}/umf/v1/users/user/update-impacted-user`,
      req
    );
  }

  public getSiblingUser(req) {
    return this.http.post(
      `${this.BASE_URL}/umf/v1/users/user/get-children`,
      req
    );
  }

  public updateUserRoleTeam(userDetails) {
    return this.http.put(
      `${this.BASE_URL}/umf/v1/users/update-role-team`,
      userDetails
    );
  }

  public emailAlreadyExist(email) {
    return this.http.post(`${this.BASE_URL}/umf/v1/users/user/emailAlreadyExist`, email);
  }
}
