import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderObsService {
  private requestStatus$ = new BehaviorSubject(0);
  public displayLoader = this.requestStatus$
    .asObservable()
    .pipe(map(s => s > 0));

  private requestStatus1$ = new BehaviorSubject(0);
  public displayLoad = this.requestStatus1$
    .asObservable()
    .pipe(map(s => s > 0));

  start() {
    this.requestStatus$.next(1);
  }

  complete() {
    this.requestStatus$.next(0);
  }

  startFilter() {
    this.requestStatus1$.next(1);
  }

  completeFilter() {
    this.requestStatus1$.next(0);
  }
}
