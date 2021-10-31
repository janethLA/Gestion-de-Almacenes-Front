import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DgAssignDeliveryComponent } from '../../dialogs/dg-assign-delivery/dg-assign-delivery.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() idOrder:number;
  @Input() orderDate:any;
  @Input() orderDetail:any;
  @Input() quantityProducts:number;
  @Input() status:string;
  @Input() totalPrice:number;
  @Input() disabled:boolean;
  @Input() warehouseName:string;
  @Input() userName:string;
  @Input() telephone:number;
  @Input() email:string;
  productsCart:any[]=[];
  image:any;
  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts();
    
    
  }

  getColorSR(status){
    let color:string;
    if (status=='Pendiente') {
      color = '#979797';
    } else if (status=='Autorizado') {
        color = '#1975ff';
      }else if(status=='En curso'){
        color= '#ffc400';
      }else if(status=='Rechazado'){
        color= '#ff4848';
      }else if(status=='Aprobado'){
        color = '#28a745'
      }
    return color;
  }
  getProducts(){
    this.orderDetail.map(order=>{
      var prod=Object.assign(order.product,{subtotal:order.subtotal, units:order.units})
    
      this.productsCart.push(prod)
    })
    console.log(this.productsCart)
  }
  openAssign(){
    this.dialog.open(DgAssignDeliveryComponent,{
      width: '60%',
      data: {idOrder:this.idOrder}
      });
  }
}
