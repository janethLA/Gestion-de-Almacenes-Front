import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {RequestService} from '../../services/request.service';
import { DgForgetPasswordComponent } from '../dialogs/dg-forget-password/dg-forget-password.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public idUser:any;
public user:any={};
public userName:any;
public errorLogin:boolean;

  loginForm = this.formBuilder.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]],
  });
 
  constructor(
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog,
  ) { }
  hide=true;
  ngOnInit(): void {
    /* localStorage.clear()
    this.cookieService.deleteAll(); */
  }
  
  onLogin(login,formDirective: FormGroupDirective){
    this.errorLogin=false;
    //console.log(login)
    this.RequestService.post('http://localhost:8080/api/auth/authenticate',login)
    .subscribe( {
      next:(respuesta:any)=>{
        formDirective.resetForm();
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 60);
        this.cookieService.set('token',respuesta.jwt,dateNow)
        this.cookieService.set('identifier',respuesta.identifier,dateNow)
        if(respuesta.id!=undefined){
          this.idUser=respuesta.id 
        }else{
          this.idUser=respuesta.idFinalUser;
        }
        
  
        this.userName=respuesta.userName;
        this.user={idUser:this.idUser,userName:this.userName,}
        this.saveDataUser(respuesta.roles);
        //this.sendRoute(respuesta.identifier)
        
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
       // window.location.reload()
        
       },
      error:()=>{
        formDirective.resetForm();
        this.errorLogin=true;
      }
    });
      
  }
  sendRoute(identifier: any){
    if(identifier==3){
      this.router.navigate(['/','home-raf'])
    }else if(identifier==2){
      this.router.navigate(['/','home-rug'])
    }else if(identifier==1){
      this.router.navigate(['/','home-admin'])
    }
  }
  saveDataUser(roles:any){
    
    localStorage.setItem("user",JSON.stringify(this.user));
    //localStorage.setItem("permisos",JSON.stringify(roles=[{authority:"ROLE_CREAR_PEDIDO"},{authority:"ROLE_VER_PEDIDO"}]))
    localStorage.setItem("permits",JSON.stringify(roles));
    localStorage.setItem('logged',JSON.stringify({logged:true}))
  }
  openForgetPassword(){
      this.dialog.open(DgForgetPasswordComponent,{
        width: '60%',
        data: { }
        });
    
  }
}
