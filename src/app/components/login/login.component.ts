import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {RequestService} from '../../services/request.service';

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
    private router: Router
  ) { }
  hide=true;
  ngOnInit(): void {
    localStorage.clear()
    this.cookieService.deleteAll();
  }
  
  onLogin(login,formDirective: FormGroupDirective){
    this.errorLogin=false;
    //console.log(login)
    this.RequestService.post('http://localhost:8080/api/auth/authenticate',login)
    .subscribe( {
      next:(respuesta:any)=>{
        console.log(respuesta)
        formDirective.resetForm();
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 60);
        this.cookieService.set('token',respuesta.jwt,dateNow)
        this.cookieService.set('identifier',respuesta.identifier,dateNow)
        this.idUser=respuesta.id;
        this.userName=respuesta.userName;
        this.user={idUser:this.idUser,userName:this.userName,spendingUnit:respuesta.spendingUnit,faculty:respuesta.faculty}
        this.saveDataUser(respuesta.roles);
        //this.sendRoute(respuesta.identifier)
        this.router.navigate(['/home'])
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
  }
}
