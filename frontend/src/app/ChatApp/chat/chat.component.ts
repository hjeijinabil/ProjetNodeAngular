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
  public messageArray: { user: string, message: string }[] = [];
  private storageArray !:any[];

  public showScreen = false;
  public phone!: string;
  public currentUser : any;
  public selectedUser : any;
  public userList :any[] = [];
  

  // public userList = [
  //   {
  //     id: 1,
  //     name: 'The Swag Coder',
  //     phone: '9876598765',
  //     image: 'assets/user/user-1.png',
  //     roomId: {
  //       2: 'room-1',
  //       3: 'room-2',
  //       4: 'room-3'
  //     }
  //   },
  //   {
  //     id: 2,
  //     name: 'Wade Warren',
  //     phone: '9876543210',
  //     image: 'assets/user/user-2.png',
  //     roomId: {
  //       1: 'room-1',
  //       3: 'room-4',
  //       4: 'room-5'
  //     }
  //   },
  //   {
  //     id: 3,
  //     name: 'Albert Flores',
  //     phone: '9988776655',
  //     image: 'assets/user/user-3.png',
  //     roomId: {
  //       1: 'room-2',
  //       2: 'room-4',
  //       4: 'room-6'
  //     }
  //   },
  //   {
  //     id: 4,
  //     name: 'Dianne Russell',
  //     phone: '9876556789',
  //     image: 'assets/user/user-4.png',
  //     roomId: {
  //       1: 'room-3',
  //       2: 'room-5',
  //       3: 'room-6'
  //     }
  //   }
  // ];


  ngOnInit() : void {
    let id: any;
    id= this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id)
    

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
          console.log(response);
          console.log(response.userFinded)
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
      .subscribe((data: { user: string, room: string, message: string }) => {
        setTimeout(() => {
          this.messageArray.push(data);
        }, 500);
      });
  }

  getContactList() {
    this.chatService.getContactList().subscribe(
      (response :any) => {
        console.log(response)
        this.userList = [...this.userList, ...response.users]
        console.log(this.userList)
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
        console.log(response.messages)
        this.messageArray = response.messages
      }
    )

    this.join(this.currentUser.name, this.roomId);
  }

  // selectUserHandler(id: string): void {
  //   this.selectedUser = this.userList.find(user => user.id === id);
  //   this.roomId = this.selectedUser.roomId[this.currentUser.id];
  //   this.messageArray = [];

  //   this.storageArray = this.chatService.getStorage();
  //   const storeIndex = this.storageArray
  //     .findIndex((storage : any) => storage.roomId === this.roomId);

  //   if (storeIndex > -1) {
  //     this.messageArray = this.storageArray[storeIndex].chats;
  //   }

  //   this.join(this.currentUser.name, this.roomId);
  // }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.storeMessageDB({
      receiver: this.selectedUser._id,
      roomId: this.roomId,
      message: this.messageText
    }).subscribe(
      (response :any ) => {
        console.log(response)
        this.messageArray.push(response.message);
      }
    );

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
