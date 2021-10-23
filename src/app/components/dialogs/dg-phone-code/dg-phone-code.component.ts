import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DgConfirmPedidoComponent } from '../dg-confirm-pedido/dg-confirm-pedido.component';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dg-phone-code',
  templateUrl: './dg-phone-code.component.html',
  styleUrls: ['./dg-phone-code.component.css']
})
export class DgPhoneCodeComponent implements OnInit {
  
  code=new FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DgPhoneCodeComponent>,
    private dialog:MatDialog,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }
  user=this.data.idFinalUser;
  errors:any;
  intents=3;
  close:boolean=false;
  ngOnInit(): void {
    
  }
  verifyCode(code){
    if(code.value==this.data.code){
      this.dialogRef.close()
      this.restartFinalUser();
      this.openDialogConfirmPedido();
      console.log("logeado")
    }else{
      if(this.intents>0){
        this.intents--;
        this.errors="Codigo ingresado incorrecto tiene"+this.intents+ " intentos"
        this.code.reset();
      }else{
       this.dialogRef.close()
       window.location.reload()
        console.log("no entra")
      }
      
    }
  }
  getMessageErrors():String{
    return this.errors;
  }
  restartFinalUser(){
     var user={idFinalUser:this.data.idFinalUser, code:this.data.code}
    this.RequestService.put('http://localhost:8080/api/finalUser/codeVerification',user).subscribe({
       next:(respuesta:any)=>{
        console.log(respuesta)
        //this.snack.open('Usuario creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        
       //window.location.reload();
      
      },
      error:()=>{
        //this.snack.open('Fallo al registrar el usuario','CERRAR',{duration:5000});
        
      } 
    })
  }
  openDialogConfirmPedido(){
    this.dialog.open(DgConfirmPedidoComponent,{
      width: '60%',
      data: { }
      });
  }

}
