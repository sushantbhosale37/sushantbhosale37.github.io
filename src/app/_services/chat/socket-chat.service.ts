import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketChatService {
  private BASE_URL = environment.socketBaseUrl;

  // private socket = io(this.BASE_URL);

  constructor() {}

  // joinRoom(data) {
  //   console.log(data);
  //   this.socket.emit('join', data);
  // }

  // sendMessage(data) {
  //   console.log(data);
  //   this.socket.emit('message', data);
  // }

  // newMessageReceived() {
  //   const observable = new Observable<{ user: String, message: String}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }

  // typing(data) {
  //   this.socket.emit('typing', data);
  // }

  // receivedTyping() {
  //   const observable = new Observable<{ isTyping: boolean}>(observer => {
  //     this.socket.on('typing', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }
}
