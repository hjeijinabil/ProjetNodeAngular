import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class Message {
    
  constructor(public type: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor() { }
  conversation = new Subject<Message[]>();
  messageMap:any={
    "hi":"hello",
    "how are you":" I am fine",
    "default":" I cant't understand"
  }
  getBotAnswer(msg:any){
    const userMessage = new Message('user', msg);
      this.conversation.next([userMessage])
      const botMessage = new Message('bot', this.getBotMessage(msg));
      setTimeout(()=>{
        this.conversation.next([botMessage]);
      },1500)
    
  }
  getBotMessage(question:string){
    let ansewer = this.messageMap[question]
    return ansewer || this.messageMap['default']
  }
}
