import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() idProduct:number;
  @Input() productName:string;
  @Input() description:string;
  @Input() image:any;
  @Input() measurement:string;
  @Input() price:number;
  @Input() expirationDate:any;
  @Input() categoryName:any;
  @Input() warehouseName:any;
  @Input() index:number;
  @Input() disabledQuantity:boolean;
  @Input() units:number;
  @Output() deleteProductEvent=new EventEmitter<any>();
  @Output() sendSubtotalEvent=new EventEmitter<any>();

  unities:any =[
    {value:1,name:"1 ud"},
    {value:2,name:"2 ud"},
    {value:3,name:"3 ud"},
    {value:4,name:"4 ud"},
    {value:5,name:"5 ud"},
    {value:6,name:"6 ud"},
    {value:7,name:"7 ud"},
    {value:8,name:"8 ud"},
    {value:9,name:"9 ud"},
    {value:10,name:"10 ud"},
    ] 

    orderDetail=this.formBuilder.group({
      idProduct:['',],
      units:['',],
      subtotal:['',],
    })
  constructor(
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    if(this.disabledQuantity){
      this.orderDetail.get('units').setValue(this.units)
    }else{
      this.orderDetail.get('units').setValue(1)
    }
    
    this.orderDetail.get('idProduct').setValue(this.idProduct)
    //console.log(this.image)
  }
  deleteItem(){
    console.log(this.idProduct)
    this.deleteProductEvent.emit(this.idProduct)
    
  }
  getSubtotal(price):number{
   var subtotal=0
   subtotal=price*this.orderDetail.get('units').value
   this.orderDetail.get('subtotal').setValue(subtotal)
   this.sendSubtotalEvent.emit(this.orderDetail.value);
    return subtotal
  }

}
