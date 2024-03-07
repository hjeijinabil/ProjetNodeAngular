import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewUrl:string  = "http://localhost:3000/api/v1/reviews";
  commentUrl:string  = "http://localhost:3000/api/v1/comments";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  AddReview(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.reviewUrl}`,obj, this.httpOptions);
  }

  AddComment(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.commentUrl}`,obj, this.httpOptions);
  }

  getLawyerComments(lawyerId : string): Observable<{msg:any}> {
  
    return this.httpclient.get<{msg:any}>(`${this.commentUrl}/lawyer/${lawyerId}`, this.httpOptions);
  }

  addRating(rating:number,lawyerId :string) {
    const obj  = {
      rating:rating,
      lawyer:lawyerId
    }
    return this.httpclient.post<{msg:any}>(`${this.reviewUrl}`,obj, this.httpOptions);
  }

  getUserRating(lawyerId :string) {
    
    return this.httpclient.get<{msg:any}>(`${this.reviewUrl}/${lawyerId}`, this.httpOptions);
  }

  

  constructor(private httpclient: HttpClient) { }
}
