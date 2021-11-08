import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dg-view-payment',
  templateUrl: './dg-view-payment.component.html',
  styleUrls: ['./dg-view-payment.component.css']
})
export class DgViewPaymentComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
    payment=this.data
  ngOnInit(): void {
    console.log(this.payment)
  }

}
