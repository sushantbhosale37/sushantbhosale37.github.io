import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAppCommentData(req) {

    return this.http.post(`${this.BASE_URL}/umf/v1/common/comment/get-app-comments`, req);
  }

  public getAppBellCommentData(req) {
    if (!('isTable' in req)) {
      req = Object.assign(req, { isTable: true });
    }
    return this.http.post(`${this.BASE_URL}/umf/v1/common/comment/get-app-bell-comments`, req);
  }

  public updateUnreadComments(req) {
    if (!('isTable' in req)) {
      req = Object.assign(req, { isTable: true });
    }
    return this.http.post(`${this.BASE_URL}/umf/v1/common/comment/update-unread-comments`, req);
  }
}
