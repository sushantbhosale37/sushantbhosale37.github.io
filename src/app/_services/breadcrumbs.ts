import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/primeng';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {
  private crumbs: ReplaySubject<MenuItem[]>;
  crumbs$: Observable<MenuItem[]>;

  constructor() {
    this.crumbs = new ReplaySubject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    this.crumbs.next(
      (items || []).map(item =>
        Object.assign({}, item, {
          routerLinkActiveOptions: { exact: true }
        })
      )
    );
  }
}
