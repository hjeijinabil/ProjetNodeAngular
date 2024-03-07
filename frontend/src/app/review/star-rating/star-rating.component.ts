import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number =0;
  
  get stars() {
    console.log(this.rating);
    return Array(Math.floor(this.rating)).fill(0);
  }

  get emptyStars() {
    if (this.rating % 1 !== 0){
      return Array(4-Math.floor(this.rating)).fill(0)
    } else {
      return Array(5-Math.floor(this.rating)).fill(0)
    }
    
  }

  rate() {
    
  }
}
