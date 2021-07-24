import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public Title = "Cake Art | CP Soft-Tech";

  private appConfigSubject$ = new ReplaySubject<any>(1);
  appConfig = this.appConfigSubject$.asObservable();

  changeAppConfig(appConfig: object) {
    this.appConfigSubject$.next(Object.assign(this.appConfig, appConfig));
  }
}
