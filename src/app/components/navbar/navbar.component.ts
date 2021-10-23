import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  constructor(
    public cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.getDataUser();
  }
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    window.location.reload();
    
  }
  getDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
    if(this.user==undefined || this.user==null){
      this.notLogedUser=true;
    }else{
      this.notLogedUser=false;
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
