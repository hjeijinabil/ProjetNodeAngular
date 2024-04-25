import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public roomId!: string;
  public messageText!: string;
  public messageArray: { receiver: string,sender : string, message: string, _id :string, roomId:string }[] = [];
  private storageArray !:any[];

  

  public showScreen = false;
  public phone!: string;
  public currentUser : any;
  public selectedUser : any;
  public userList :any[] = [];
  



  ngOnInit() : void {
    let id: any;
    id= this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(id)
    

    // this.activatedRoute.params.subscribe(params => {
    //   if (params && params['id']) {
    //     this.selectedUser.id = params['id'];
    //   console.log(params['id']);
    //   this.userService.getUserBydId(params['id']).subscribe(
    //     (response :any) => {
    //       console.log(response);
    //       console.log(response.userFinded)
    //       this.userList.push(response.userFinded)
    //     }
    //   )
    //   } else {
    //     console.error('ID parameter not found');
    //   }
      
    // });
    if (id) {
      this.userService.getUserBydId(id).subscribe(
        (response :any) => {
          // console.log(response);
          // console.log(response.userFinded)
          this.userList.push(response.userFinded)
        }
      )
    }

    
    
    this.getCurruentUser();
    this.showScreen = true;
    this.getMessage();
    this.getContactList();


        
  }

  getCurruentUser() {
    this.userService.getCurrentUser().subscribe(
      (response : any) => {
        console.log(response)
        this.currentUser = response.user;

      }
    )
  }

  getMessage() {
    this.chatService.getMessage()
      .subscribe((data) => {
        setTimeout(() => {

          console.log("message from getMessage",data);
          console.log(this.currentUser._id)
          console.log(data.message.sender)
          console.log(data.message.receiver)
          if (data.message.receiver === this.currentUser._id)
          this.messageArray.push(data.message);
        }, 500);
      });
  }

  getContactList() {
    this.chatService.getContactList().subscribe(
      (response :any) => {
        // console.log(response)
        this.userList = [...this.userList, ...response.users]
        // console.log(this.userList)
      }
    )
  }

  login(phone: any): void {
  //   this.phone = phone;
  //   this.currentUser = this.userList.find(user => user.phone === this.phone);
  //   this.userList = this.userList.filter((user) => user.phone !== this.phone);
  //   console.log(this.currentUser)
  //   console.log(this.phone)
  //     if (this.currentUser) {
        
  //       this.showScreen = true;  
  //       console.log(this.showScreen)    
  //     }
  }

  

  selectUserHandler(id: any): void {
    this.selectedUser = this.userList.find(user => user._id === id);
    if (this.currentUser.role == 'lawyer')
      this.roomId = this.selectedUser._id + '' +this.currentUser._id
    else 
      this.roomId = this.currentUser._id + '' +  this.selectedUser._id

    this.messageArray = [];

    this.chatService.getAllMessagesDB(this.roomId).subscribe(
      (response :any) => {
        // console.log(response.messages)
        this.messageArray = response.messages
      }
    )

    this.join(this.currentUser.name, this.roomId);
  }


  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.storeMessageDB({
      receiver: this.selectedUser._id,
      roomId: this.roomId,
      message: this.messageText,
      
      
    }).subscribe(
      (response :any ) => {
        // console.log("message from sendmessage",response)
        this.messageArray.push(response.message);
      }
    );

    this.chatService.sendMessage({
      receiver: this.selectedUser._id,
      room: this.roomId,
      message: this.messageText,
      sender : this.currentUser._id
    });

    // this.storageArray = this.chatService.getStorage();
    // console.log(this.storageArray)
    // const storeIndex = this.storageArray
    //   .findIndex((storage : any) => storage.roomId === this.roomId);

    // if (storeIndex > -1) {
    //   this.storageArray[storeIndex].chats.push({
    //     user: this.currentUser.name,
    //     message: this.messageText
    //   });
    // } else {
    //   const updateStorage = {
    //     roomId: this.roomId,
        
    //       user: this.currentUser.name,
    //       message: this.messageText
        
    //   };

    //   this.storageArray.push(updateStorage);
    // }

    // this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

  constructor(private chatService : ChatService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute
  ) {}

  

}
