import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-shipping-cost',
  templateUrl: './dg-shipping-cost.component.html',
  styleUrls: ['./dg-shipping-cost.component.css']
})
export class DgShippingCostComponent implements OnInit {

  shippingCost=new FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DgShippingCostComponent>,
    private RequestService:RequestService,
    private snack:MatSnackBar,){

    } 

  ngOnInit(): void {
  }
  assignDelivery(){
    var assign={idUser:this.data.idUser,idOrder:this.data.idOrder,shippingCost:this.shippingCost.value}
    this.RequestService.post('http://localhost:8080/api/orderAssigned/assignOrder',assign)
    .subscribe({
      next:()=>{
  
      },error:()=>{
        window.location.reload()
      }
    })
    }
    getMessageErrors(){
      return "error"
    }
}
