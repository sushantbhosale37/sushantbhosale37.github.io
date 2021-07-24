import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveQueryService {
  constructor(private http: HttpClient) {}

  private AllSavedQueriesSubject$ = new BehaviorSubject<object>({});
  private SelectedQuerySubject$ = new BehaviorSubject<object>({});
  allQueries = this.AllSavedQueriesSubject$.asObservable();
  selectedQuery = this.SelectedQuerySubject$.asObservable();

  private BASE_URL: string = environment.baseUrl;

  getSavedQueries(param: object) {
    const url = `${this.BASE_URL}/getSavedViews/${param['userId']}/${param['appId']}`;
    this.http.get(url).subscribe(data => {
      this.AllSavedQueriesSubject$.next(data);
    });
  }

  changeSelectedQuery(query: object) {
    this.SelectedQuerySubject$.next(Object.assign(this.selectedQuery, query));
  }

  addSavedQueries(param: object) {
    const url = `${this.BASE_URL}/insertView`;
    this.http.post(url, param).subscribe(data => {
      this.getSavedQueries(param);
    });
  }
}
