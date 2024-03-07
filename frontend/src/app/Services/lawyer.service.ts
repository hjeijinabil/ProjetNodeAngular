import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {

  lawyerUrl:string  = "http://localhost:3000/api/v1/lawyers";
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  getAllLawyers(): Observable<any[]> {
  
    return this.httpclient.get<any[]>(`${this.lawyerUrl}`);
  }

  getLawyer(idLawyer :number): Observable<any[]> {
  
    return this.httpclient.get<any>(`${this.lawyerUrl}/${idLawyer}`);
  }

  constructor(private httpclient: HttpClient) { }
}
