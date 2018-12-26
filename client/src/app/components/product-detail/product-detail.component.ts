import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  imageSrc: string;
  url;
  previewImg: boolean = true;
  uploadedImg: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }


  readURL(event: any): void {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
      this.uploadedImg = true;
      this.previewImg = false;
    }
  }

  remImg() {
    this.uploadedImg = false;
    this.previewImg = true;
  }

  resize(direction) {
    const delta = 100 * direction;
    console.log(delta);
    const element = document.getElementById('img');
    const positionInfo = element.getBoundingClientRect();

    element.style.width = positionInfo.width + delta + 'px';
    element.style.height = positionInfo.height + delta + 'px';
  }
}
