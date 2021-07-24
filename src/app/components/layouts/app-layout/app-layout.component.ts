import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { PlatformConfigService, CommonLibService } from 'src/app/_services';
import { AppConfigService } from 'src/app/_services/app-config/app-config.service';
import { filter } from 'rxjs/operators';
import { SaveQueryService } from 'src/app/_services/save-query/save-query.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ym-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnDestroy, OnInit {
  private platConfigObs: Subscription = null;
  platformConfig: object = null;

  // crumbs$: Observable<MenuItem[]>;
  sidenavWidth: number;

  constructor(
    private router: Router,
    private platformConfigService: PlatformConfigService,
    private libServ: CommonLibService,
    private appConfigService: AppConfigService,
    private saveQueryService: SaveQueryService
  ) {
    /* ----------------------------- Load AppConfig ----------------------------- */
    // router.events
    //   .pipe(filter(e => e instanceof NavigationEnd))
    //   .subscribe(val => {
    //     if (localStorage.getItem('uId')) {
    //       let reqUser = {
    //         uId: localStorage.getItem('uId')
    //       }
    //       this.platformConfigService.getUserDetails(reqUser).then(userData => {
    //         if (userData != undefined) {
    //           this.platformConfigService.getPlatformConfigInfoData(userData[0]).then(data => {
    //             // this.router.navigate(['/']);
    //           });
    //         } else {
    //           this.router.navigate(['/login']);
    //         }
    //       });
    //     } else {
    //       this.router.navigate(['/login']);
    //     }
    //   });

  }

  ngOnInit() {

    if (localStorage.getItem('uId')) {
      let reqUser = {
        id: localStorage.getItem('uId')
      }
      this.platformConfigService.getUserDetails(reqUser).then(userData => {
        if (userData != undefined) {
          this.platformConfigService.getPlatformConfigInfoData(userData[0]).then(data => {
            // this.router.navigate(['/']);
          });
        } else {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  getPlatformConfigData() {
    const platformConfigPromise = new Promise((resolve, reject) => {
      if (this.platConfigObs === null || this.platConfigObs.closed) {
        this.platConfigObs = this.platformConfigService.obsConfig.subscribe(
          res => {
            if (!this.libServ.isEmptyObj(res)) {
              this.platformConfig = this.libServ.deepCopy(res);
              resolve(this.platformConfig);
            }
          }
        );
      } else {
        if (!this.libServ.isEmptyObj(this.platformConfig)) {
          resolve(this.platformConfig);
        }
      }
    });
    return platformConfigPromise;
  }

  ngOnDestroy(): void {
    if (this.platConfigObs && !this.platConfigObs.closed) {
      this.platConfigObs.unsubscribe();
    }
  }
}
