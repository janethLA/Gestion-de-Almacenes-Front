import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css']
})
export class DeliveryPageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  user:any;
  permits:any;
  allOrders:any;
  ordersPending:any;
  ordersAccepted:any;
  ordersReject:any;
  ordersCompleted:any;
  constructor(
    private RequestService:RequestService,
  ) { 
   
  }

  ngOnInit(): void {
    this.loadDataUser();
    this.loadOrdersPending();
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.permits=JSON.parse(localStorage.getItem("permits"))
  }
  loadOrdersPending(){
    this.RequestService.get("http://localhost:8080/api/orderAssigned/allAssignedOrders/"+this.user.idUser).subscribe(
      r=>{
        this.allOrders=r;
        console.log(this.allOrders)
        this.ordersAccepted=this.allOrders.filter(o=>o.status=="Aceptado")
        this.ordersPending=this.allOrders.filter(o=>o.status=="Pendiente")
        this.ordersReject=this.allOrders.filter(o=>o.status=="Rechazado")
        this.ordersCompleted=this.allOrders.filter(o=>o.status=="Finalizado")
        
      }
    )
  }
}
