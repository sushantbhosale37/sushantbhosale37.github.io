import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { PlatformConfigService, CommonLibService, AuthService } from '../_services';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  config: object;

  constructor(
    private router: Router,
    private platformConfigService: PlatformConfigService,
    public libServ: CommonLibService,
    private authService: AuthService
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const apps = [];
    if (this.authService.isAuthenticated()) {
      return true;
    }
    if (!localStorage.getItem('token')) {      
      localStorage.clear();
      this.router.navigate(['/login']);
      return of(false);
    }
    
    return this.platformConfigService.obsConfig.pipe(
      map(res => {
        if (!this.libServ.isEmptyObj(res)) {
          this.config = res;
          this.config['user']['role']['appGroups'].forEach(appGrp => {
            appGrp['apps'].forEach(app => {
              apps.push(app.route);
            });
          });
          apps.push('/user-profile');
          if (apps.includes('/' + state['url'].split('/')[1])) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        } else {
          this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }),
      catchError(err => {
        localStorage.clear();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }
}
