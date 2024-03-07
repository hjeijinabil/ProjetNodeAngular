import { Component, OnInit } from '@angular/core';
import { AdviceService } from '../Services/advice.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-consult-question',
  templateUrl: './consult-question.component.html',
  styleUrls: ['./consult-question.component.css']
})
export class ConsultQuestionComponent implements OnInit{
  question !: any;
  idQuestion!:any;
  solution!:any;
  listSolution!:any[];
  adviceInput!: any;

  constructor(private adviceService :AdviceService, 
    private activatedRoute : ActivatedRoute,
    private route:Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idQuestion = params.get('id');
    });

    this.getQuestion();
    this.getQuestionSolutions();
  }

  CreateSolution() {
    this.adviceService.CreateSolution({
      advice : this.adviceInput,
      question : this.idQuestion
    }).subscribe(
      (response: any) => {
         
        this.solution=response.solution;
        console.log("solution",this.solution); 
        this.listSolution.unshift(response.solution);
            
      }
    );
  }

  getQuestion() {
    this.adviceService.getQuestion(this.idQuestion).subscribe(
      (response: any) => {
         
        this.question=response.question;
        console.log("question",this.question);     
      }
    );
  }

  getQuestionSolutions() {
    this.adviceService.getQuestionSolutions(this.idQuestion).subscribe(
      (response: any) => {
         
        this.listSolution=response.solutions;
        console.log("solutions",this.listSolution);     
      }
    );
  }

  isLawyer(){
    let token = sessionStorage.getItem("jwt");
    let role:any;
    let user:any;
    
   if(token){
    user = this.decodeToken(token);
     role = user.role;
   }

    return role=="lawyer";
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  goToAddQuestion() {
    this.route.navigate(['addQuestion']); 
  }

  goToListLawyers() {
    this.route.navigate(['lawyerList']); 
  }

}
