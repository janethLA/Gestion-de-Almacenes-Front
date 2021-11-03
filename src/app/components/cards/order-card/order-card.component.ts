import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { DgAssignDeliveryComponent } from '../../dialogs/dg-assign-delivery/dg-assign-delivery.component';
import { DgFillEmergencyComponent } from '../../dialogs/dg-fill-emergency/dg-fill-emergency.component';

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
  @Input() buttons:boolean;
  @Input() idOrderAssigned:any;
  @Input() complete:boolean;
  @Input() completed:boolean;
  productsCart:any[]=[];
  image:any;
  orderCompleted:boolean;
  constructor(
    private dialog:MatDialog,
    private RequestService:RequestService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    
    
  }

  getColorSR(status){
    let color:string;
    if (status=='Pendiente') {
      color = '#979797';
    } else if (status=='Aceptado') {
        color = '#1975ff';
      }else if(status=='En curso'){
        color= '#ffc400';
      }else if(status=='Rechazado'){
        color= '#ff4848';
      }else if(status=='Finalizado'){
        color = '#28a745'
      }
    return color;
  }
  getProducts(){
    this.orderDetail.map(order=>{
      var prod=Object.assign(order.product,{subtotal:order.subtotal, units:order.units})
    
      this.productsCart.push(prod)
    })
    //console.log(this.productsCart)
  }
  openAssign(){
    this.dialog.open(DgAssignDeliveryComponent,{
      width: '45%',
      data: {idOrder:this.idOrder}
      });
  }
  acceptOrder(){
    this.RequestService.put("http://localhost:8080/api/orderAssigned/assignedOrderAccepted/"+this.idOrderAssigned,"").subscribe({
      next:()=>{
        console.log("aceptado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  rejectOrder(){
    this.RequestService.put("http://localhost:8080/api/orderAssigned/assignedOrderRejected/"+this.idOrderAssigned,"").subscribe({
      next:()=>{
        console.log("rechazado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  completeOrder(){
    this.RequestService.put("http://localhost:8080/api/orderAssigned/orderCompleted/"+this.idOrderAssigned,"").subscribe({
      next:()=>{
        console.log("rechazado con exito")
      },error:()=>{
        this.complete=false
        this.orderCompleted=true;
        window.location.reload()
      }
    })
  }
  addEmergency(){
    this.dialog.open(DgFillEmergencyComponent,{
      width: '50%',
      data: {idOrderAssigned:this.idOrderAssigned}
      });
  }
}
