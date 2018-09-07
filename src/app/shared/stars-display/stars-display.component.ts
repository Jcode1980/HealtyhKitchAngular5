import { Component, Input ,OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-display',
  templateUrl: './stars-display.component.html',
  styleUrls: ['./stars-display.component.scss']
})
export class StarsDisplayComponent implements OnInit {
  @Input() numberOfStars: number;
  starsArray :Array<String> = [];

  constructor() { }

  ngOnInit() {
    this.createStarsArray();
  }

  createStarsArray():void{
    let fullStars = Math.floor( this.numberOfStars );
    let i:number = 0; 
     
    while(i < fullStars) { 
      this.starsArray.push("fa-star")
      i++; 
    } 
    
    console.log("numbers of stars is " + this.numberOfStars + " i: " + i);
    if(this.numberOfStars > i){
      this.starsArray.push("fa-star-half")
    }

  }
  
}
