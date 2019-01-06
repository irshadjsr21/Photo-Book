import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mugs',
  templateUrl: './mugs.component.html',
  styleUrls: ['./mugs.component.scss']
})
export class MugsComponent implements OnInit {
    
  isSelected:any = 1; 
  isSelected1:any = 1; 
  constructor() { }

  ngOnInit() {
  }

  onSelectionChange(type){
    this.isSelected = type;
  }
  onSelectionChange1(type){
    this.isSelected1 = type;
  }
}
