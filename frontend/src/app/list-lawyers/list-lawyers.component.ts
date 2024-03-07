import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../Services/review.service';
import { Router } from '@angular/router';
import { LawyerService } from '../Services/lawyer.service';

@Component({
  selector: 'app-list-lawyers',
  templateUrl: './list-lawyers.component.html',
  styleUrls: ['./list-lawyers.component.css']
})
export class ListLawyersComponent implements OnInit{
  listLawyers !:any[];
  constructor(private lawyerService : LawyerService, private route : Router) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("here")
    this.lawyerService.getAllLawyers().subscribe(
      (response: any) => {

        this.listLawyers=response.lawyers;
        console.log(this.listLawyers)
      }
    )
  }

  viewProfile(id:any){
    this.route.navigate([`lawyerProfile/${id}`]);
  }
}
