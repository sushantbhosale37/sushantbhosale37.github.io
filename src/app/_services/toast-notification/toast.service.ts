import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public showToastToggle$ = new BehaviorSubject({});

  displayToast(obj: object) {
    this.showToastToggle$.next(obj);
  }
}
