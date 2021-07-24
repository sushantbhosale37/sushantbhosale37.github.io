import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SocketChatService,
  PlatformConfigService,
  CommonLibService
} from 'src/app/_services/index';
import { Subscription } from 'rxjs';
// import * as Stomp from 'stompjs';
import { Stomp } from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import * as moment from 'moment';
// import { DynamicDialogConfig } from 'primeng/api';
import { CommentJson } from 'src/app/_interfaces/commentJson';
import { CommentService } from '../comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ym-bell-icon',
  templateUrl: './bell-icon.component.html',
  styleUrls: ['./bell-icon.component.scss']
})
export class BellIconComponent implements OnInit, OnDestroy {

  @Input() commentData: any[];
  @Input() chatcount = 0;
  @Input() commentJson: CommentJson = <CommentJson>{};
  @Output() clickOnComment = new EventEmitter<object>();

  private BASE_URL: string = environment.socketBaseUrl;
  private serverUrl = this.BASE_URL + '/api/umf/v1/auth/socket';
  private platConfigObs: Subscription;
  private config: Object;
  public message: String;
  // public commentData: String = '';
  // public commentsData: any[];
  // public messageArray: any[];
  public isTyping = false;
  private stompClient;


  // chatlist: any[];


  constructor(
    public route: ActivatedRoute,
    public platformConfigService: PlatformConfigService,
    public libServ: CommonLibService,
    public webSocketService: SocketChatService,
    // public chatSetting: DynamicDialogConfig,
    private commentservice: CommentService,
  ) {


    // this.commentJson = this.chatSetting['data']['data']['commentJson'];
    // this.messageArray = this.chatSetting['data']['data']['commentData'];

    this.initializeWebSocketConnection();
  }

  ngOnInit() {
    console.log('commentData', this.commentData);

    // this.messageArray = [];
    // console.log('data', this.messageArray, this.commentJson);

  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(that.commentJson['receiver'], message => {
        console.log('my msg in bell', message.body);
        const comment = JSON.parse(message.body);
        if (comment['user_id'] !== that.commentJson['user_id']) {
          that.playAudio();
          comment['is_read'] = 'N';
          that.commentData.unshift(comment);
          that.chatcount = that.chatcount + 1;
        }

        // $('.scrollcommentdata').append(`<div>${message.body}</div>`);
      });
    });
  }
  playAudio() {
    const audio = new Audio();
    audio.src = '../../../../../assets/sound/inflicted.mp3';
    audio.load();
    audio.play();
  }


  nowfrom(eventHappenTime) {

    const upDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })); // London current time
    const currentDate = new Date(); // My current time
    const timeDifference = this.diff_minutes(currentDate, upDate);
    const date = new Date(eventHappenTime);
    date.setMinutes(date.getMinutes() + timeDifference);
    return moment(date).fromNow();
  }


  diff_minutes(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  getChatdetails(comment) {
    // const chatinfo = {
    //   commentJson: comment,
    //   commentData: this.commentData
    // }
    this.clickOnComment.emit(comment);
  }
  ngOnDestroy(): void {
    if (this.platConfigObs && !this.platConfigObs.closed) {
      this.platConfigObs.unsubscribe();
    }
    console.log('this.stompClient', this.stompClient);
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
    }
  }
}
