import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-price',
  templateUrl: './dg-update-price.component.html',
  styleUrls: ['./dg-update-price.component.css']
})
export class DgUpdatePriceComponent implements OnInit {
  newPrice=new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private RequestService:RequestService,
  ) { }
    price=this.data.price
    idProduct=this.data.idProduct
  ngOnInit(): void {
    this.newPrice.setValue(this.price);
  }
  updatePrice(){
    this.RequestService.put("http://localhost:8080/api/product/updatePrice/"+this.idProduct,{price:this.newPrice.value}).subscribe({
      next:()=>{

      },error:()=>{
        window.location.reload()
      }
    })
  }
}
