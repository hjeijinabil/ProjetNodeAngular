import { Component, OnInit } from '@angular/core';
import { AdviceService } from '../Services/advice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit{

  listQuestions !:any[]
  constructor(private adviceService :AdviceService, private route : Router) {

  }
  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.adviceService.getAllQuestions().subscribe(
      (response: any) => {
         
        this.listQuestions=response.questions;
        console.log("questions",this.listQuestions);     
      }
    );
  }

  goToAddQuestion() {
    this.route.navigate(['addQuestion']); 
  }

  goToListLawyers() {
    this.route.navigate(['lawyerList']); 
  }

  consultQuestion(id:any) {
    this.route.navigate([`Question/${id}`]); 
  }

}
