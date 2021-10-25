import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service'

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

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
    this.RequestService.get('http://localhost:8080/api/order/allOrders')
     .subscribe(r=>{
       console.log(r);
       this.ordersReceived = r;
     })
  }
}
