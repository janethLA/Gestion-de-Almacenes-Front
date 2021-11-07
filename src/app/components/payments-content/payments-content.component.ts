import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { DgCreatePaymentComponent } from '../dialogs/dg-create-payment/dg-create-payment.component';

@Component({
  selector: 'app-payments-content',
  templateUrl: './payments-content.component.html',
  styleUrls: ['./payments-content.component.css']
})
export class PaymentsContentComponent implements OnInit {
  allPayments:any;
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPayments();
  }
  loadPayments(){
    this.RequestService.get("http://localhost:8080/api/payment/allPayments").subscribe(r=>{
      console.log(r)
      this.allPayments=r;
    })
  }
  createPayment(){

    this.dialog.open(DgCreatePaymentComponent,{
      width: '60%',
      data: {}
      });
  }
}
