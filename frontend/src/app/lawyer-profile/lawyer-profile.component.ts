import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../Services/review.service';
import { LawyerService } from '../Services/lawyer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  styleUrls: ['./lawyer-profile.component.css']
})
export class LawyerProfileComponent  {
  idLawyer: any;
  selectedRating: number = -1;
  lawyer : any;
  goToRating : boolean = false;

  // Method to handle the rating change event
  handleRatingChange(event: any) {
    // Access the value property from the emitted event
    this.selectedRating = event.value;
    console.log('Selected Rating:', this.selectedRating);
    this.addRating(this.selectedRating);
  }

  constructor(private lawyerService : LawyerService,private reviewService: ReviewService ,private route : Router,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.idLawyer = params.get('id');
    });

    this.getLawyer();
    this.getUserRating();
    

  }

  getLawyer() {
    this.lawyerService.getLawyer(this.idLawyer).subscribe(
      (response: any) => {
        console.log("lawyer",response)
        this.lawyer = response.lawyer;
      }
    )
  }

  addRating(rating : number) {
    this.reviewService.addRating(rating,this.idLawyer).subscribe(
      (response: any) => {
        console.log("rating",response)
        this.selectedRating = response.review.rating;
        
      }
    )
  }

  getUserRating() {
    this.reviewService.getUserRating(this.idLawyer).subscribe(
      (response: any) => {
        console.log("rating",response)
        this.selectedRating = response.review.rating;
        this.goToRating=true;
      },(error:any) => {
        console.log(error);
        this.goToRating=true;
      }
      
    )
  }
  



}
