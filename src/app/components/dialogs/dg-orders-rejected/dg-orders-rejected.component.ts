import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-orders-rejected',
  templateUrl: './dg-orders-rejected.component.html',
  styleUrls: ['./dg-orders-rejected.component.css']
})
export class DgOrdersRejectedComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private RequestService:RequestService
  ) { }
    ordersReject:any=this.data.ordersRejected
  ngOnInit(): void {
    
    this.loadOrdersReject();
  }
  loadOrdersReject(){

  }
  reassignOrder(order){
    this.RequestService.put("http://localhost:8080/api/order/reassignOrder/"+order.idOrder,"").subscribe({
      next:()=>{
        
      },error:()=>{
        window.location.reload()
      }
    })
  }

}
