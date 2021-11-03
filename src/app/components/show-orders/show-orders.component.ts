import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {RequestService} from '../../services/request.service'
import { DgOrdersRejectedComponent } from '../dialogs/dg-orders-rejected/dg-orders-rejected.component';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

  ordersReceived:any
  user:any;
  notRequest:any;
  status:any;
  ordersReceivedCopy:any;
  ordersAssigned:any;
  ordersReject:any;
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDataUser();
    this.loadOrders();
    this.loadOrdersAssigned();
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadOrders(){
    this.RequestService.get('http://localhost:8080/api/order/allOrders')
     .subscribe(r=>{
       console.log(r);
       this.ordersReceived = r;
       this.ordersReceivedCopy=this.ordersReceived
       this.ordersReceived.sort(function (a, b) {
        if (b.idOrder > a.idOrder) {
          return 1;
        }
        if (b.idOrder < a.idOrder) {
          return -1;
        }
        // a must ae equal to b
        return 0;
      });
     })
  }
  filterBy(option){
    this.notRequest=false;
    this.status=option;
    if(this.status=="Todos" || this.status==""){
      this.ordersReceived=this.ordersReceivedCopy
    }else{
      this.ordersReceived=this.ordersReceivedCopy.filter(order => order.status=== this.status);
      if(this.ordersReceived.length==0){
        this.notRequest=true;
      }
    }
  }
  loadOrdersAssigned(){
    this.RequestService.get("http://localhost:8080/api/orderAssigned/allAssignedOrders").subscribe(r=>{
      this.ordersAssigned=r;
      console.log(this.ordersAssigned)
      this.ordersReject=this.ordersAssigned.filter(o=>o.status=="Rechazado")
      this.ordersReject=this.ordersReject.filter(o=>o.reassigned==0)
      
    })
  }
  quantityBadgeRequest():number{
    return this.ordersReject?.length;
  }
  openOrdersRejected(){

    this.dialog.open(DgOrdersRejectedComponent,{
      width: '60%',
      data: {ordersRejected:this.ordersReject}
      });
  }
}
