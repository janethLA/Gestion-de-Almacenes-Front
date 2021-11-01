import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-assign-delivery',
  templateUrl: './dg-assign-delivery.component.html',
  styleUrls: ['./dg-assign-delivery.component.css']
})
export class DgAssignDeliveryComponent implements OnInit {
  allDeliveries:any;
  noDeliverySelected:boolean=true;
  deliverySelected:any;
  constructor(
    private RequestService:RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snack:MatSnackBar,
    private dialogRef: MatDialogRef<DgAssignDeliveryComponent>,
  ) { }

  ngOnInit(): void {
    this.loadDeliveries();
    /* this.allDeliveries=[
      {idUser:1,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
      {idUser:2,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
      {idUser:3,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
    ] */
  }
  loadDeliveries(){
    this.RequestService.get('http://localhost:8080/api/order/allDeliveries')
    .subscribe(r=>{
      this.allDeliveries=r
      console.log(this.allDeliveries)
    })
  }
  getDelivery(options: MatListOption[]) {
    this.deliverySelected=options.map(o=> o.value);
    console.log(this.deliverySelected)
    if(options!=[]){
      this.noDeliverySelected=false;
    }
}
assignDelivery(){
  var assign={idUser:this.deliverySelected[0].idUser,idOrder:this.data.idOrder}
  this.RequestService.post('http://localhost:8080/api/orderAssigned/assignOrder',assign)
  .subscribe(r=>{
    console.log(r)
    window.location.reload()
  }
    
    
  )
}
}
