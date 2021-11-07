import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service'

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  ordersReceived:any
  user:any;
  constructor(
    private RequestService:RequestService,
  ) { }

  ngOnInit(): void {
    this.loadDataUser();
    this.loadOrders();
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadOrders(){
    this.RequestService.get('http://localhost:8080/api/order/ordersByUser/'+this.user.idUser)
     .subscribe(r=>{
       console.log(r);
       this.ordersReceived = r;
     })
  }

}
