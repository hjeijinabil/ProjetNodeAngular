import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { UserService } from '../Services/user.service';
import { REQUEST_HEADER_FIELDS_TOO_LARGE } from 'http-status-codes';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  imagePreview: any;
  jwt:string="";
  user:any;
  obj:any={};
  constructor( private route:Router, private userservice : UserService){

  }
  
ngOnInit(): void {
  console.log(this.obj);
  
    let jwt = sessionStorage.getItem("jwt");
    if(jwt){
      let usr:any  = this.decodeToken(jwt);
     this.user =usr;
     console.log(this.user.id,"tttt");
     
    }else{
      console.log("error");
      
    }
    let idUser = this.user.id;
    this.userservice.UploadFile(this.obj, idUser).subscribe(
      (data)=>{
        
      }
    )



}
decodeToken(token: string) {
  return jwt_decode(token);
}
deleteUser() {
  this.userservice.deleteUser().subscribe(
    (response) => {
      console.log('User deleted successfully.', response.msg);
      sessionStorage.removeItem("jwt");

      this.route.navigate([''])
      // Optionally, update your UI or perform additional actions after deletion.
    }
    
  );
}
editProfile(id:any){
  this.route.navigate([`updateProfile/${id}`]);
}
onImageSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];

    // Assuming this.FormInput is an instance of FormGroup
    this.obj.patchValue({ img: file });
    this.obj.updateValueAndValidity();

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Assuming this.imagePreview is a property to store the image preview
      this.imagePreview = reader.result as string;
    };
  } else {
    console.error('No file selected'); // Handle the case where no file is selected
  }
}
}
