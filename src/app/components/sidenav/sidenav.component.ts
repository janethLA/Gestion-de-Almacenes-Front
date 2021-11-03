import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  open=false;
  user:any;
  permits:any;
  ROLE_ADMINISTRAR_USUARIOS:boolean;
  ROLE_ADMINISTRAR_ALMACENES:boolean;
  ROLE_ADMINISTRAR_CLIENTES:boolean;
  ROLE_ADMINISTRAR_PEDIDOS:boolean;
  ROLE_ADMINISTRAR_ENVIOS:boolean;
  ROLE_VER_REPORTES:boolean;
  ROLE_VER_PRECIOS:boolean;
  ROLE_ACTUALIZAR_PRECIOS:boolean;
  ROLE_VER_PEDIDOS:boolean;
  ROLE_FINAL_USER:boolean;
  constructor(
    public cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadDataUser();
  }
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    window.location.reload();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
    loadDataUser(){
      this.user=JSON.parse(localStorage.getItem("user"))
      this.permits=JSON.parse(localStorage.getItem("permits"))
      this.loadPermits()
     
    }
    loadPermits(){
      this.permits?.map(p=>{
        if(p.authority=="ROLE_ADMINISTRAR_USUARIOS"){
          this.ROLE_ADMINISTRAR_USUARIOS=true;
        }
        if(p.authority=="ROLE_ADMINISTRAR_ALMACENES"){
          this.ROLE_ADMINISTRAR_ALMACENES=true;
        }
        if(p.authority=="ROLE_ADMINISTRAR_CLIENTES"){
          this.ROLE_ADMINISTRAR_CLIENTES=true;
        }
        if(p.authority=="ROLE_ADMINISTRAR_PEDIDOS"){
          this.ROLE_ADMINISTRAR_PEDIDOS=true;
        }
        if(p.authority=="ROLE_ADMINISTRAR_ENVIOS"){
          this.ROLE_ADMINISTRAR_ENVIOS=true;
        }
        if(p.authority=="ROLE_VER_REPORTES"){
          this.ROLE_VER_REPORTES=true;
        }
        if(p.authority=="ROLE_VER_PRECIOS"){
          this.ROLE_VER_PRECIOS=true;
        }
        if(p.authority=="ROLE_VER_PEDIDOS"){
          this.ROLE_VER_PEDIDOS=true;
        }
        
      })
    }
  
}
