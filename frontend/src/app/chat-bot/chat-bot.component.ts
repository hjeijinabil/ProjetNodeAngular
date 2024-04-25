import { Component, OnInit } from '@angular/core';
import { ChatBotService } from '../Services/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit{
  value:string='';
  isUserMessage: any; 
  // Set a threshold time (example: messages older than 1 hour will be removed)
  private messageThresholdTime = new Date().getTime() - 60 * 60 * 1000;

  // Your existing messages array
  public messages: Array<any> = [];



 
  constructor(private chatService : ChatBotService){

  }

  ngOnInit(): void {
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
      // const maxMessagesToShow = 10;
      // if (this.messages.length > maxMessagesToShow) {
      //   this.messages = this.messages.slice(-maxMessagesToShow);
      // }
    });
  }

sendMessage(){
  this.chatService.getBotAnswer(this.value);
  this.value=''
  this.filterMessagesByTime();
}

private filterMessagesByTime() {
  const currentTime = new Date().getTime();

  // Filter messages based on the time threshold
  this.messages = this.messages.filter(message => {
    return currentTime - new Date(message.time).getTime() <= this.messageThresholdTime;
  });
}
}
