import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {CropperComponent} from 'angular-cropperjs';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { ResponseContentType, RequestContentType, ResponseType } from '../../service/enum';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  formData1: FormData = new FormData();
  isLogin:any = true;
  imageSrc:any = '';
  imageGallary = [];
  url;
  previewImg: boolean = true;
  uploadedImg: boolean = false;
  imageUrl: any;
  copyimageUrl: any;
  isEditImage:any = false;
  isSave:any = false;
  objectName:any = '';
  cropperRes: string;
  showCropper: boolean;
  isEditDesignName:any = false;

  isSelectImage:any = false;
  selectedTheme1ImageId:any = -1;
  isCategory:any =1;
  isSelectTheme:any = 1;
  theme:any = {
    dad:{
      src1:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/My%20Daddy%20Strongest.jpg",
      src2:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/My%20First%20Hero.jpg",
      src3:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Happy%20Father%27s%20Day.jpg",
      src4:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Best%20Dad%20in%20the%20World.jpg",
    },
    cla:{
      src1:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Wrap%20around%20-%20single%20picture.jpg",
      src2:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Square%20two%20pictures.jpg",
      src3:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/3-in-1%20Portrait.jpg",
      src4:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Three-%20in-One%20Collage.jpg",
    },
    mom:{
      src1:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Best%20Mom%20Ever.jpg"
    },
    buddy:{
      src1:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Best%20Work%20Buddy.jpg"
    },
    cops:{
      src1:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Mr%20Mrs.jpg"
    },
    bir:{
      src1:"https://dkesn94daljtk.cloudfront.net/canvera/assets/configuration/images/mug/thumbnails/themes/Older%20and%20Wiser.jpg"
    }
  }
  cropperConfig: object = {
    movable: true,
    scalable: true,
    zoomable: true,
    viewMode: 2,
    checkCrossOrigin: true
  };
  
  constructor(private router: Router,private httpService: ApiServiceService) {
  }
  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token && token != null) {
        this.isLogin = true;
        this.getGallary();
    }else{
      this.isLogin = false;
      localStorage.setItem('isReturnDesignTool',"1");
      this.router.navigate(['signin']);
    }
  }
  getGallary(){
    let params = {};
    this.httpService.get('api/gallary',params).subscribe(res => {
      if (res) {
        this.imageGallary = res.result;
      }
    },error=>{})
  }
  uploadImage(){
    let params = {};
    if (this.formData1.has('image'))
      params['image'] = this.formData1.get('image');
    this.httpService.post('api/gallary',params,ResponseContentType.Json, RequestContentType.FORM_DATA).subscribe(res => {
      if (res) {
            this.formData1 = new FormData();
            this.getGallary();
      }
    },error=>{})
  }
  onFileSelected(event) {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.objectName = event.target.files[0].name;
      that.showCropper = false;
      this.formData1.append('image', event.target.files[0]);   
      reader.onload = (eventCurr: ProgressEvent) => {
        that.imageUrl = (<FileReader>eventCurr.target).result;
        that.copyimageUrl = (<FileReader>eventCurr.target).result;
        this.uploadedImg = true;
        this.imageSrc = (<FileReader>eventCurr.target).result;
        this.uploadImage();
        setTimeout(function () {
          that.refreshCrop(that.imageUrl);
        }, 2000);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  remImg() {
    this.uploadedImg = false;
    this.previewImg = true;
  }
  resize(direction) {
    const delta = 100 * direction;
    const element = document.getElementById('img');
    const positionInfo = element.getBoundingClientRect();
    element.style.width = positionInfo.width + delta + 'px';
    element.style.height = positionInfo.height + delta + 'px';
  }
  selectImage(id){
    this.isSelectImage = true;
    this.selectedTheme1ImageId = id;
    this.uploadedImg = true;
    this.previewImg = false;
  }
  selectThame(type){
    this.isSelectTheme = type;
  }
  selectCategory(type){
    this.isCategory = type;
  }
  //###############################EditImageFunction############################
  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  togglebutScalex:any = 1;
  togglebutScaley:any = 1;
  isCrop:any = true;
  refreshCrop(img) {
    this.imageUrl = img;
    this.showCropper = true;
  }
  cropClick(){
    if(this.isCrop){
      this.clear();
      this.isCrop = false; 
    }else{
      this.isCrop = true; 
      this.showCropper = false;
      setTimeout(()=>{
        this.showCropper = true;
      },10);
    }
  }
  applyCrop(){
    this.imageUrl = this.cropperRes;
    this.showCropper = false;
      setTimeout(()=>{
        this.showCropper = true;
    },10);
  }
  resetImageCrop(){
    this.imageUrl = this.copyimageUrl;
    this.showCropper = false;
      setTimeout(()=>{
        this.showCropper = true;
    },10);
  }
  saveCropImages(){
    if(this.isEditImage){
      this.imageSrc = this.cropperRes;
      this.isEditImage = false;
    }else{
      this.isSave = true;
    }
  }
  cropendImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  readyImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  rotate(turn) {
    turn = turn === 'left' ? -45 : 45;
    this.angularCropper.cropper.rotate(turn);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  destroy() {
    this.angularCropper.cropper.destroy();
  }
  zoomManual() {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  zoom(status) {
    status = status === 'positive' ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(status);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  move(offsetX, offsetY) {
    this.angularCropper.cropper.move(offsetX, offsetY);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  scale(offset) {
    if (offset === 'x') {
      if(this.togglebutScalex == 1){
        this.togglebutScalex = 0;
        this.angularCropper.cropper.scaleX(-1);
      }else{
        this.togglebutScalex = 1;
        this.angularCropper.cropper.scaleX(1);
      }
    } else {
      if(this.togglebutScaley == 1){
        this.togglebutScaley = 0;
        this.angularCropper.cropper.scaleY(-1);
      }else{
        this.togglebutScaley = 1;
        this.angularCropper.cropper.scaleY(1);
      }
    }
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  clear() {
    this.angularCropper.cropper.clear();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  disable() {
    this.angularCropper.cropper.disable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  enable() {
    this.angularCropper.cropper.enable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  reset() {
    this.angularCropper.cropper.reset();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  editDesignName(){
    this.isEditDesignName = !this.isEditDesignName;
  }
  //########################CanvasFunction############################
  @ViewChild('canvas1') canvasId1: ElementRef;
  @ViewChild('canvas2') canvasId2: ElementRef;
  @ViewChild('canvas3') canvasId3: ElementRef;
  @ViewChild('group') group: ElementRef;
  @ViewChild('groupDiv1') groupDiv1: ElementRef;
  @ViewChild('groupDiv2') groupDiv2: ElementRef;
  @ViewChild('groupDiv3') groupDiv3: ElementRef;
  canStep = 1;
  canvas1() {
    var canvas = this.canvasId1.nativeElement;
    var ctx = canvas.getContext("2d");
    var productImg = new Image();
    var pfo = this.imageSrc;
    productImg.onload = function() {
      var iw = productImg.width;
      var ih = productImg.height;
      canvas.width = iw;
      canvas.height = ih;
      ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height,
        0, 0, iw, ih);
      loadUpperIMage()
    };
    productImg.src = "http://res.cloudinary.com/pussyhunter/image/upload/c_scale,f_auto,h_350/left_handle_cup_i7ztfs.jpg"
  
    function loadUpperIMage() {
      var img = new Image();
      if(pfo){
        img.src = pfo;
      }else{
        img.src = "https://media1.giphy.com/media/j3uyvaaslUxNe/200_s.gif";
      }   
      
      img.onload = function() {
  
        var iw = img.width;
        var ih = img.height;
  
        var xOffset = 102, //left padding
          yOffset = 110; //top padding
  
        //alert(ih)
        var a = 75.0; //image width
        var b = 10; //round ness
  
        var scaleFactor = iw / (4 * a);
  
        // draw vertical slices
        for (var X = 0; X < iw; X += 1) {
          var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation
          ctx.drawImage(img, X * scaleFactor, 0, iw / 9, ih, X + xOffset, y + yOffset, 1, 174);
        }
      };
    }
  
  }
  canvas2() {
    var canvas = this.canvasId2.nativeElement;
    var ctx = canvas.getContext("2d");
  
    var productImg = new Image();
    productImg.onload = function() {
      var iw = productImg.width;
      var ih = productImg.height;
      console.log("height");
  
      canvas.width = iw;
      canvas.height = ih;
  
      ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height,
        0, 0, iw, ih);
      loadUpperIMage()
    };
  
  
    productImg.src = "http://res.cloudinary.com/pussyhunter/image/upload/h_350/canter_handle_cup_xyxhdd.jpg"
  
    function loadUpperIMage() {
      var img = new Image();
  
      img.src = "https://fbcd.co/images/products/a765994bd870df31004c94e932e563b3_resize.jpg"
  
      img.onload = function() {
  
        var iw = img.width;
        var ih = img.height;
  
        // alert(iw)
  
        var xOffset = 101, //left padding
          yOffset = 110; //top padding
  
        var a = 75.0; //image width
        var b = 10; //round ness
  
        var scaleFactor = iw / (4 * a);
  
        // draw vertical slices
        for (var X = 0; X < iw; X += 1) {
          var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation
          ctx.drawImage(img, X * scaleFactor, 0, iw / 3, ih, X + xOffset, y + yOffset, 1, 174);
  
        }
      };
    }
  }
  canvas3() {
    var canvas = this.canvasId3.nativeElement;
    var ctx = canvas.getContext("2d");
    var pfo = this.imageSrc;
    var productImg = new Image();
    productImg.onload = function() {
      var iw = productImg.width;
      var ih = productImg.height;
  
      canvas.width = iw;
      canvas.height = ih;
  
      ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height,
        0, 0, iw, ih);
      loadUpperIMage()
    };
  
    productImg.src = "http://res.cloudinary.com/pussyhunter/image/upload/h_350/right_handle_cup_dsdhr7.jpg"
  
  
    function loadUpperIMage() {
      var img = new Image();
  
      if(pfo){
        img.src = pfo;
      }else{
        img.src = "https://media1.giphy.com/media/j3uyvaaslUxNe/200_s.gif";
      }  
  
      img.onload = function() {
  
        var iw = img.width;
        var ih = img.height;
  
        //alert(iw)
  
        var xOffset = 102, //left padding
          yOffset = 110; //top padding
  
        var a = 75.0; //image width
        var b = 10; //round ness
  
        var scaleFactor = iw / (3 * a);
  
        // draw vertical slices
        for (var X = 0; X < iw; X += 1) {
          var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation
          ctx.drawImage(img, X * scaleFactor, 0, iw / 1.5, ih, X + xOffset, y + yOffset, 1, 174);
        }
      };
    }
  }
  clickpreview(){
    setTimeout(() => {
      this.canvas1()
    }, 100);
    setTimeout(() => {
      this.canvas2()
    }, 200);
    setTimeout(() => {
      this.canvas3();
      this.updateItems();
    }, 300);
  }
  updateItems(){ 
    if(this.canStep == 1){
      this.groupDiv1.nativeElement.classList.add('current');
      this.groupDiv2.nativeElement.classList.remove('current');
      this.groupDiv3.nativeElement.classList.remove('current'); 
    }else if(this.canStep == 2){
      this.groupDiv1.nativeElement.classList.remove('current');
      this.groupDiv2.nativeElement.classList.add('current');
      this.groupDiv3.nativeElement.classList.remove('current'); 
    }else if(this.canStep == 3){
      this.groupDiv1.nativeElement.classList.remove('current');
      this.groupDiv2.nativeElement.classList.remove('current');
      this.groupDiv3.nativeElement.classList.add('current'); 
    }
  }
  nextClick(){
    if(this.canStep < 3){
       this.canStep = this.canStep + 1;
       this.updateItems();
    }else if(this.canStep == 3){
      this.canStep = 1;
       this.updateItems();
    }
  }
  preClick(){
    if(this.canStep > 1){
      this.canStep = this.canStep - 1;
      this.updateItems();
    }else if(this.canStep == 1){
      this.canStep = 3;
       this.updateItems();
    }
  }
}
