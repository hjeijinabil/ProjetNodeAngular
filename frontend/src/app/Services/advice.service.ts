import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  questionUrl:string  = "http://localhost:3000/api/v1/questions";
  solutionUrl:string  = "http://localhost:3000/api/v1/solutions";
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  getAllQuestions(): Observable<any[]> {
  
    return this.httpclient.get<any[]>(`${this.questionUrl}`,this.httpOptions);
  }

  getQuestion(idQuestion :any): Observable<any[]> {
  
    return this.httpclient.get<any>(`${this.questionUrl}/${idQuestion}`);
  }

  CreateQuestion(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.questionUrl}`,obj, this.httpOptions);
  }

  getQuestionSolutions(idQuestion :any): Observable<any[]> {
  
    return this.httpclient.get<any>(`${this.solutionUrl}/${idQuestion}`);
  }

  CreateSolution(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.solutionUrl}`,obj, this.httpOptions);
  }

  constructor(private httpclient: HttpClient) { }
}
