import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import {Socket} from 'ngx-socket-io';
import { map, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:7000'; // your server local path
  private chatUrl = 'http://localhost:3000/api/v1/chat'; // your server local path
  private socket: Socket

  constructor(private httpclient :HttpClient  ) {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  joinRoom(data : any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    console.log("connection pending");
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data : any) => {
        console.log("pending2")
        console.log(data)
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    let storage = [];
    if (localStorage.getItem('chats')) {
        storage = JSON.parse(localStorage.getItem('chats')!);
    }
    return storage;
  }

  setStorage(data : any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

  storeMessageDB(data : any) : Observable<any> {
    return this.httpclient.post<any>(`${this.chatUrl}`,data, this.httpOptions);
  }

  getAllMessagesDB(roomId : any) : Observable<any> {
    return this.httpclient.get<any>(`${this.chatUrl}/${roomId}`, this.httpOptions);
  }

  getContactList() : Observable<any> {
    return this.httpclient.get<any>(this.chatUrl+"/contactList", this.httpOptions);
  }
}
