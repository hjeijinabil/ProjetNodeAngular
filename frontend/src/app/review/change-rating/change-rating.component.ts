import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-change-rating',
  templateUrl: './change-rating.component.html',
  styleUrls: ['./change-rating.component.css']
})
export class ChangeRatingComponent implements OnInit {
  @Input("index") index:number =-1;
  @Output("changed") clicked = new EventEmitter();
  
	arr: any[] = [];
	// index:number = -1;

  
	constructor() {
		this.arr = [1, 2, 3, 4, 5];
    
	}
  ngOnInit(): void {
    console.log("index",this.index);
    
  }
  
	onClickItem(index:number) {
		//console.log(index);
		this.index = index;
    this.clicked.emit({ value : this.index});
	}


  get stars() {
    return Array(Math.floor(this.index)).fill(0);
  }

  get emptyStars() {
    if (this.index % 1 !== 0){
      return Array(4-Math.floor(this.index)).fill(0)
    } else {
      return Array(5-Math.floor(this.index)).fill(0)
    }
    
  }
}
