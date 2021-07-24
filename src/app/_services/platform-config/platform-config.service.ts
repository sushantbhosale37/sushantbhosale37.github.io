import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class PlatformConfigService implements OnDestroy {

  private platformConfigInfoData = new ReplaySubject<any>(1);
  public obsConfig = this.platformConfigInfoData.asObservable();
  private BASE_URL: string = environment.baseUrl;
  private platConfigObs: Subscription;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getPlatformConfigInfoData(data) {
    const platformConfigPromise = new Promise((resolve, reject) => {
      if (localStorage.getItem('token')) {
        this.platformConfigInfoData.next(data);
        resolve(data);
        console.log('platformConfigInfoData.next(data)');
      } else {
        reject('no token');
      }
    });
    return platformConfigPromise;
  }

  public setPlatformConfigInfoData(updatePlatformConfig) {
    const url = `${this.BASE_URL}/umf/v1/common/users/update`;
    return this.http.put(url, updatePlatformConfig);
  }

  public getUserDetails(req) {
    const url = `${this.BASE_URL}/account/GetUserData`;
    return this.http.post(url, req).toPromise();
  }

  public resetPlatformConfig() {
    this.platformConfigInfoData.next({});
  }

  public setPlatformConfig(data) {
    this.platformConfigInfoData.next(data);
  }

  ngOnDestroy(): void {
    if (this.platConfigObs && !this.platConfigObs.closed) {
      this.platConfigObs.unsubscribe();
    }
  }
}
