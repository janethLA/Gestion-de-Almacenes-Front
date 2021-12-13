import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-confirm-pedido',
  templateUrl: './dg-confirm-pedido.component.html',
  styleUrls: ['./dg-confirm-pedido.component.css']
})
export class DgConfirmPedidoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DgConfirmPedidoComponent>,
    private RequestService:RequestService,
    private snack:MatSnackBar,
  ) { }

  productsCart=this.data.products
  totalPrice=this.data.total;
  order=this.data.order;
  user=this.data.user;

  ngOnInit(): void {
    this.getDataStorage();
    this.addQuantities();
  }
  getDataStorage(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.order=JSON.parse(localStorage.getItem("order"));
    this.totalPrice=this.order.totalPrice;
    this.productsCart=JSON.parse(localStorage.getItem("productsCart"))
    
  }
  addQuantities(){
    this.order.orderDetails.map(o=>{
      this.productsCart.map(product=>{
        if(product.idProduct==o.idProduct){
          product=Object.assign(product,{units: o.units})
        }
      })
    })
  }
  saveOrder(){
    this.RequestService.post('http://localhost:8080/api/order/createOrder/'+this.user.idUser,this.order).subscribe({
      
      next:(respuesta:any)=>{
       this.snack.open('Pedido creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
       this.dialogRef.close();
       localStorage.removeItem("order")
       localStorage.removeItem("productsCart")
        window.location.reload();
     
     },
     error:()=>{
       this.snack.open('Fallo al registrar el pedido, intente de nuevo','CERRAR',{duration:5000});
       
     } 
   })
  }
}
