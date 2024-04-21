import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserUrl:string  = " http://localhost:3000/users"
  MeUrl:string  = " http://localhost:3000/api/v1/me"


  constructor(private httpclient: HttpClient) { }
 
  signup(obj: any): Observable<{ msg: any }> {
    // const formData = new FormData();

    // Append image if it exists
    // if (img) {
    //   formData.append('img', img);
    // }

    // // Append other properties
    // formData.append('fullName', obj.fullName);
    // formData.append('userName', obj.userName);
    // formData.append('phoneNumber', obj.phoneNumber);
    // formData.append('email', obj.email);
    // formData.append('password', obj.password);
    // formData.append('gender', obj.gender);

    // Display FormData contents in the console for debugging
    // this.logFormData(formData);
    // console.log('Image File:', img);

    // Set headers to 'multipart/form-data'
    // const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' });

    // function generateBoundary(): string {
    //   return '---------------------------' + Date.now().toString(16);
    // }
    
    // const boundary = generateBoundary();
    
    // const headers = new HttpHeaders({
    //   'Content-Type': `multipart/form-data; boundary=${boundary}`
    // });

    // Send POST request
    return this.httpclient.post<{ msg: any }>(`${this.UserUrl}/signup`, obj );
  }
  // private logFormData(formData: FormData): void {
  //   console.group('FormData Contents');
  //   formData.forEach((value, key) => {
  //     console.log(`${key}:`, value);
  //   });
  //   console.groupEnd();
  // }
  
  
  
login(obj:any): Observable<{ msg: string, token: Token}> {
  return this.httpclient.post<{ msg: string, token:Token }>(`${this.UserUrl}/login`, obj);
}

socialAuth(token:any): Observable<{ msg: string, token: Token}> {
  return this.httpclient.post<{ msg: string, token:Token }>(`${this.UserUrl}/socialAuth/${token}`, {token});
}
deleteUser(): Observable<{msg:any}> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  return this.httpclient.delete<{msg:any}>(`${this.UserUrl}/delete`, httpOptions);
}

getUserBydId(id:any):Observable<{userFinded:any}>{
  
  return this.httpclient.get<{userFinded:any}>(`${this.UserUrl}/getUserById/${id}`);
}
updateProfile(obj:any):Observable<{msg:any}>{
  return this.httpclient.put<{msg:any}>(
    `${this.UserUrl}/updateUser`,obj )
}
getCurrentUser():Observable<{user:any}>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };
  
  return this.httpclient.get<{user:any}>(`${this.MeUrl}`, httpOptions);
}
UploadFile(id:any, img:File){
//  const formData = new FormData();

//     if (img) {
//       formData.append('img', img);
//     }
//     formData.append('id',id);
    return this.httpclient.put(`${this.UserUrl}/uploadFile/${id}`,img)
}
 }
