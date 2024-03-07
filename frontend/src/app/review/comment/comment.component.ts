import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment:string ="";
  idLawyer: any;
  listComment !: any[];
  constructor(private reviewService : ReviewService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.idLawyer = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.paramMap.subscribe(params => {
      this.idLawyer = params.get('id');
    });
    console.log("here id", this.idLawyer);
    this.getLawyerComments();
    // this.FormInput = this.FB.group({
    //   fullName:['',[Validators.required,Validators.minLength(3)]],
    // })
  }



  addComment() {
    console.log(this.comment)
    this.reviewService.AddComment({
      comment : this.comment,
      lawyer : this.idLawyer,
    }).subscribe(
      (response: any) => {
        console.log("added",response)
        // this.getLawyerComments();
        this.listComment.unshift(response.comment);
      }
    );
  }

  getLawyerComments() {
    this.reviewService.getLawyerComments(this.idLawyer).subscribe(
      (response: any) => {
        console.log("comments",response)
        this.listComment = response.comments;
      }
    )
  }

}
