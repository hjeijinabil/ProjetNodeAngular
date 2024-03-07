import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdviceService } from './../Services/advice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  FormInput!: FormGroup;



  constructor(private adviceService :AdviceService , private FB:FormBuilder,private route : Router) {

  }
  ngOnInit(): void {
    this.FormInput = this.FB.group({
      
      topic:['',[Validators.required]],
      question:['',[Validators.required]],
      situation:['',[Validators.required]],
      
    }) 
  }

  addQuestion() {
    console.log(this.FormInput.value);
    this.adviceService.CreateQuestion(this.FormInput.value).subscribe(
      (response: any) => {
        console.log("added",response); 
        this.route.navigate(['questionList']);
           }
    );
  }


}
