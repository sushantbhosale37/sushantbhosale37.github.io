import { Component, OnInit, OnDestroy, EventEmitter, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
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
import { DynamicDialogConfig } from 'primeng/api';
import { CommentJson } from 'src/app/_interfaces/commentJson';
import { CommentService } from '../comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ym-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  private BASE_URL: string = environment.socketBaseUrl;
  private serverUrl = this.BASE_URL + '/api/umf/v1/auth/socket';
  private platConfigObs: Subscription;
  private config: Object;
  public username: String;
  public email: String;
  public chatroom;
  public message: String;
  public commentData: String = '';
  public commentsData: any[];
  public messageArray: any[];
  public isTyping = false;
  private stompClient;
  commentJson: CommentJson = <CommentJson>{};

  onAdd = new EventEmitter();

  constructor(
    public route: ActivatedRoute,
    public platformConfigService: PlatformConfigService,
    public libServ: CommonLibService,
    public webSocketService: SocketChatService,
    public chatSetting: DynamicDialogConfig,
    private commentservice: CommentService,
  ) {


    this.commentJson = this.chatSetting['data']['data']['commentJson'];
    this.messageArray = this.chatSetting['data']['data']['commentData'];

    this.initializeWebSocketConnection();
  }

  ngOnInit() {

    // this.messageArray = [];
    console.log('data', this.messageArray, this.commentJson);
    const UnreadCommentIdList = this.messageArray.filter(o => o.is_read == 'N' && o.user_id != this.commentJson['user_id']).map(x => x.comment_id);

    if (UnreadCommentIdList.length > 0) {
      const req = {
        user_id: this.commentJson['user_id'],
        UnreadCommentIdList: UnreadCommentIdList

      };
      this.commentservice
        .updateUnreadComments(req)
        .subscribe(data => {

          this.onAdd.emit();

        });
    }
    this.scrollToBottom();
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '../../../../../assets/sound/inflicted.mp3';
    audio.load();
    audio.play();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(that.commentJson['receiver'], message => {

        const comment = JSON.parse(message.body);
        console.log('my msg', typeof message.body, typeof comment['config']);
        if (that.libServ.isEqual(comment['config'], that.commentJson['config'])) {
          if (comment['user_id'] !== that.commentJson['user_id']) {
            that.playAudio();
          }
          comment['is_read'] = 'N';
          that.messageArray.push(comment);
          const req = {
            user_id: that.commentJson['user_id'],
            UnreadCommentIdList: [comment['comment_id']]

          };
          that.commentservice
            .updateUnreadComments(req)
            .subscribe(data => {
            });
        }
        // this.commentsData.push({msg: message.body});
        // $('.scrollcommentdata').append(`<div>${message.body}</div>`);
      });
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage(message) {

    console.log('length', message);
    if (message.length != 0) {
      this.commentJson['comment'] = message;
      console.log('send message', this.commentJson.toString());
      this.commentJson['inserted_at'] = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
      this.stompClient.send(this.commentJson['receiver'] + '/send/message', {}, JSON.stringify(this.commentJson));
      // this.messageArray.push(this.commentJson);
      this.commentData = '';
    }
  }

  checkNewLine(event) {
    if (event.keyCode === 13) {
      if (event.shiftKey) {
        event.stopPropagation();
      } else {
        event.stopPropagation();
        event.preventDefault();
        this.sendMessage(this.commentData);

      }
    }
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


  ngOnDestroy(): void {
    if (this.platConfigObs && !this.platConfigObs.closed) {
      this.platConfigObs.unsubscribe();
    }
    // if (this.stompClient) {
    //   this.stompClient.disconnect();
    // }
  }
}
