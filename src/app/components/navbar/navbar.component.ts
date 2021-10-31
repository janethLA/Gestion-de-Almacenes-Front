import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  inputSideNav!: MatSidenav; 
  user:any;
  notLogedUser:boolean=false;
  permits:any;
  disabledButton:boolean=false;
  constructor(
    public cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getDataUser();
    this.verifyUser()
  }
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    window.location.reload();
    this.router.navigate(['/home'])
    
   
    
  }
  getDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.permits=JSON.parse(localStorage.getItem("permits"))
    if(this.user==undefined || this.user==null||this.permits[0]?.authority=="ROLE_FINAL_USER"){
      this.notLogedUser=true;
      
    }else{
      this.notLogedUser=false;
      this.disabledButton=true;
     
    }
  }
  verifyUser():any{
    if(this.notLogedUser){
      return this.inputSideNav.close();
      
    }else{
      return this.inputSideNav.toggle()
    }
    
  }
}
