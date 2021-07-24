import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, NEVER } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderObsService } from '../_services/api-loader/loader-obs.service';

// import KJUR = require('jsrsasign');

import { ToastService } from 'src/app/_services/toast-notification/toast.service';
import { AuthService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  count = 0;
  tokenInfo: any;
  newRefreshToken: any;
  constructor(
    private router: Router,
    private _loadingBar: LoaderObsService,
    private toastService: ToastService,
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('token');

    // Don't show loading for Tables
    if (
      request.body == null ||
      !request.body['isTable'] ||
      typeof request.body['isTable'] === 'undefined'
    ) {
      this._loadingBar.start();
      this.count = this.count + 1;
    }
    
    const defaultHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Authorization, Content-Type'
    };

    if (token && typeof token !== 'undefined' && token !== 'null') {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    request = request.clone({
      setHeaders: defaultHeaders,
    });

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            const url: string = event.url;
            if (
              (url.includes('/login') || url.includes('/sociallogin')) &&
              !url.includes('logout')
            ) {
              console.log('event.body', event.body)
              localStorage.setItem('token', event.body.access_token);
              localStorage.setItem('refreshToken', event.body.refresh_token);
              localStorage.setItem('uId', event.body.UID);
              localStorage.setItem('username', event.body.UserName);
              localStorage.setItem('name', event.body.Name);              
              localStorage.setItem('roles', event.body.Role);
            } else if (url.includes('logout') || url.includes('/token')) {
              if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
              }
            } else {              
            }
            if (
              request.body == null ||
              !request.body['isTable'] ||
              typeof request.body['isTable'] === 'undefined'
            ) {
              this.count = this.count - 1;
            }
            if (this.count === 0) {
              this._loadingBar.complete();
            }
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (
              request.body == null ||
              !request.body['isTable'] ||
              typeof request.body['isTable'] === 'undefined'
            ) {
              this.count = this.count - 1;
            }
            if (this.count === 0) {
              this._loadingBar.complete();
            }
            if (err.status === 401 && err.statusText.toLowerCase() === 'unauthorized') {
              this.authService.getAccessTokenBasedOnRefreshToken(localStorage.getItem('username'), localStorage.getItem('refreshToken')).subscribe(
                data => {
                  this.tokenInfo = data;
                  localStorage.setItem('token', this.tokenInfo.access_token);
                  localStorage.setItem('refreshToken', this.tokenInfo.refresh_token);
                  localStorage.setItem('uId', this.tokenInfo.UID);
                  localStorage.setItem('username', this.tokenInfo.UserName);  
                  localStorage.setItem('name', this.tokenInfo.Name);                   
                  localStorage.setItem('designation', this.tokenInfo.Role);
                  this.newRefreshToken = this.tokenInfo.refresh_token;
                  location.reload();
                }, error => {
                  if(this.newRefreshToken != null || this.newRefreshToken !== undefined){
                    this.newRefreshToken = null;
                  } else{
                    this.authService.removeStorageValues();
                    this.router.navigate(['/login']);
                  }
                }
              )
            } else if (err.status === 403) {
              this.toastService.displayToast({
                severity: 'error',
                summary: 'Unauthorized',
                detail: 'Sorry!!! You are not allowed to access this resource'
              });
            } else {
              this.toastService.displayToast({
                severity: 'error',
                summary: 'Server Error',
                detail: 'Please refresh the page'
              });
            }
          }
        }
      )
    );
  }

  private toJSON(proto): any {
    const jsoned = {};
    const toConvert = proto || this;
    Object.getOwnPropertyNames(toConvert).forEach(prop => {
      const val = toConvert[prop];
      // don't include those
      if (prop === 'toJSON' || prop === 'constructor' || prop === 'blobfile') {
        return;
      }
      if (typeof val === 'function') {
        jsoned[prop] = val.bind(jsoned);
        return;
      }
      jsoned[prop] = val;
    });

    const inherited = Object.getPrototypeOf(toConvert);
    if (inherited !== null) {
      Object.keys(this.toJSON(inherited)).forEach(key => {
        if (!!jsoned[key] || key === 'constructor' || key === 'toJSON') {
          return;
        }
        if (typeof inherited[key] === 'function') {
          jsoned[key] = inherited[key].bind(jsoned);
          return;
        }
        jsoned[key] = inherited[key];
      });
    }
    return jsoned;
  }
}
