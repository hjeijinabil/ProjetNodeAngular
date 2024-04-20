import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user:any;
  role:any;
  fullName:any;
  userName:any;
  constructor(){

  }
  ngOnInit(): void {
      
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  isConnected(){
    let token = sessionStorage.getItem("jwt");
    
   if(token){
     this.user = this.decodeToken(token);
     this.role = this.user.role;
     this.userName = this.user.userName;
  
     this.fullName = this.user.fullName;
  
   }
   
  
    return !!token;
  }

}
