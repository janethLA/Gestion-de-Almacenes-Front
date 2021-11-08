import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DgUpdateImageComponent } from '../dialogs/dg-update-image/dg-update-image.component';
import { DgUpdatePriceComponent } from '../dialogs/dg-update-price/dg-update-price.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() idProduct:number;
  @Input() productName:string;
  @Input() description:string;
  @Input() image:any;
  @Input() measurement:string;
  @Input() price:number;
  @Input() expirationDate:any;
  @Input() categoryName:any;
  @Input() warehouseName:any;
  @Input() edit:boolean;
  @Output() addProductEvent=new EventEmitter<any>();
  product:any;
  makeDecisions=true;
  editMonto=false;
  newPrice=new FormControl();
  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.image="data:image/jpg;base64,"+this.image;
    this.newPrice.setValue('price')
    
  }
  
makeProduct(){
  this.product={idProduct:this.idProduct,productName:this.productName,description:this.description,
  image:this.image,measurement:this.measurement,price:this.price,expirationDate: this.expirationDate,categoryName:this.categoryName,warehouseName:this.warehouseName}
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
addCart(){
  this.makeProduct();
  this.addProductEvent.emit(this.product)
  
}
editPrice(price){
  this.dialog.open(DgUpdatePriceComponent,{
    width: '40%',
    data: { price:price,idProduct:this.idProduct}
    });
}
editImage(image){
  this.dialog.open(DgUpdateImageComponent,{
    width: '40%',
    data: { image: image,idProduct:this.idProduct}
    });
}
}
