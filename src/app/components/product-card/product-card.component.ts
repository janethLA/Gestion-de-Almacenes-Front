import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() id:number;
  @Input() productName:string;
  @Input() description:string;
  @Input() image:any;
  @Input() measurement:string;
  @Input() price:number;
  @Input() expirationDate:any;
  @Input() categoryName:any;
  @Input() warehouseName:any;



  constructor() { }

  ngOnInit(): void {
    this.image="data:image/jpg;base64,"+this.image;
    
  }
  


dataURItoBlob(dataURI) {
   const byteString = window.atob(dataURI);
   const arrayBuffer = new ArrayBuffer(byteString.length);
   const int8Array = new Uint8Array(arrayBuffer);
   for (let i = 0; i < byteString.length; i++) {
     int8Array[i] = byteString.charCodeAt(i);
   }
   const blob = new Blob([int8Array], { type: 'image/png' });    
   return blob;
}

}
