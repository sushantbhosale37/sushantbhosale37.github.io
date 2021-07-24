import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlatformConfigService } from '../platform-config/platform-config.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImpersonateService implements OnDestroy {
  private BASE_URL = environment.baseUrl;

  private platConfigObs: Subscription;

  private impersonateFlag$ = new BehaviorSubject(0);
  public impersonated = this.impersonateFlag$
    .asObservable()
    .pipe(map(i => i > 0));

  constructor(
    private http: HttpClient,
    private router: Router,
    private platformConfigService: PlatformConfigService
  ) { }

  startImpersonate(user) {
    // const url = `${this.BASE_URL}/umf/v1/users/impersonate-user-in`;
    // this.http.post(url, user).subscribe(data => {
    //   this.impersonateFlag$.next(1);
    //   this.platformConfigService.getPlatformConfigInfoData().then(success => {
    //     this.router.navigate(['/']);
    //   }, error => {
    //     console.log('error');
    //   });
    // }, error => {
    //   console.log('error ', error);
    // });
  }

  stopImpersonate() {
    // const url = `${this.BASE_URL}/umf/v1/common/impersonate-user-out`;
    // this.http.get(url).subscribe(data => {
    //   this.impersonateFlag$.next(0);
    //   this.platformConfigService.getPlatformConfigInfoData().then(success => {
    //     this.router.navigate(['/users']);
    //   }, error => {
    //     console.log('error');
    //   });
    // });
  }

  ngOnDestroy(): void {
    if (this.platConfigObs && !this.platConfigObs.closed) {
      this.platConfigObs.unsubscribe();
    }
    if (this.impersonateFlag$ && !this.impersonateFlag$.closed) {
      this.impersonateFlag$.unsubscribe();
    }
  }
}
