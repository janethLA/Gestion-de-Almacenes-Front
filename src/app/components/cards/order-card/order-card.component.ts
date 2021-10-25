import { Component, Input, OnInit } from '@angular/core';

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
  productsCart:any[]=[];
  image:any;
  constructor() { }

  ngOnInit(): void {
    this.getProducts();
    
    
  }

  getColorSR(status){
    let color:string;
    if (status=='Pendiente') {
      color = '#979797';
    } else if (status=='Autorizado') {
        color = '#1975ff';
      }else if(status=='Cotizando'){
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
}
