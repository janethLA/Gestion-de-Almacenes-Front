import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DgConfirmPedidoComponent } from '../dg-confirm-pedido/dg-confirm-pedido.component';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { DgRestartPasswordComponent } from '../dg-restart-password/dg-restart-password.component';

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
    private snack:MatSnackBar,
    private cookieService: CookieService,
  ) { }
  user=this.data.user;
  errors:any;
  intents=3;
  close:boolean=false;
  idUser:any;
  userName:any
  identifier=this.data.identifier
  ngOnInit(): void {
   console.log(this.data)
  }
  verifyCode(code){
    if(code.value==this.data.code){
      this.dialogRef.close()
      this.restartFinalUser();
      
      //this.loginFinalUSer();
     // this.openDialogConfirmPedido();
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
  verifyEmailCode(code){
    if(code.value==this.data.code){
      this.dialogRef.close()
      this.openRestartPassword();
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
      error:(r)=>{
        this.sendMessage();
        this.loginFinalUSer();
        
        //this.snack.open('Fallo al registrar el usuario','CERRAR',{duration:5000});
        
      } 
    })
  }
  sendMessage(){
    var message={message:"*Credenciales Sistema de Almacenes*, tu username es:"+this.user.userName+", contraseña: "+this.user.password,number:"591"+this.data.telephone}
    console.log(message)
    this.RequestService.post("http://localhost:9000/send",message).subscribe(r=>{
      console.log(r)
    })
  }
 
  openDialogConfirmPedido(){
    this.dialog.open(DgConfirmPedidoComponent,{
      width: '60%',
      data: { }
      });
  }
  openRestartPassword(){
    this.dialog.open(DgRestartPasswordComponent,{
      width: '60%',
      data: { idFinalUser:this.data.idFinalUser,identifier:this.identifier,telephone:this.data.telephone}
      });
  }
  loginFinalUSer(){
    var login={username:this.user.userName,password:this.user.password}
    console.log(login)
    this.RequestService.post('http://localhost:8080/api/auth/authenticate',login)
    .subscribe( {
      next:(respuesta:any)=>{
        console.log(respuesta)
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 60);
        this.cookieService.set('token',respuesta.jwt,dateNow)
        this.cookieService.set('identifier',respuesta.identifier,dateNow)
        this.idUser=respuesta.idFinalUser;
        this.userName=respuesta.finalUserName;
        this.user={idUser:this.idUser,userName:this.userName,nick:respuesta.userName}
        this.saveDataUser(respuesta.roles);
        window.location.reload();
        
       },
      error:()=>{
        console.log("error del login final user")
      }
        
    });
  }
  
  saveDataUser(roles:any){
    localStorage.setItem("user",JSON.stringify(this.user));
    localStorage.setItem("permits",JSON.stringify(roles));
  }
  restartEmail(code){
    if(code.value==this.data.code){
      var send={idFinalUser:this.data.idFinalUser,code:this.data.code,telephone:this.data.telephone}
      console.log(send)
      this.RequestService.put("http://localhost:8080/api/finalUser/updateTelephone",send).subscribe({
      next:()=>{
        this.dialogRef.close()
        window.location.reload()
      },error:()=>{
        //console.log("error al actualizar")
        this.dialogRef.close()
        window.location.reload()
      }  
      
      })
    }else{
      if(this.intents>0){
        this.intents--;
        this.errors="Codigo ingresado incorrecto tiene"+this.intents+ " intentos"
        this.code.reset();
      }else{
       this.dialogRef.close()
       window.location.reload()
      }
      
    }
  }
}
