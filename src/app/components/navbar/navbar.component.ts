import { BreakpointObserver } from '@angular/cdk/layout';
import { not } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
    private router:Router,
    private observer:BreakpointObserver
  ) { }

  ngOnInit(): void {
    
      this.getDataUser();
    
    
    
  }
  ngAfterViewInit(){
    this.verifyUser()
  }
  
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    
    
    
   
    
  }
  getDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.permits=JSON.parse(localStorage.getItem("permits"))
    if(this.user==undefined || this.user==null){
      this.notLogedUser=true;
      
    }else{
      if(this.permits[0]?.authority=="ROLE_FINAL_USER"){
        this.notLogedUser=false;
      }else{
        this.notLogedUser=false;
        this.disabledButton=true;
      }
     
    }
  }
  verifyUser():any{
    if(this.notLogedUser || this.permits[0]?.authority=="ROLE_FINAL_USER"){
      this.inputSideNav.close();
      
    }else{
      this.observer.observe(['(max-width:800px)']).subscribe(res=>{
        if(res.matches){
          /* this.inputSideNav.mode='over';
          this.inputSideNav.close(); */
        }else{
          this.inputSideNav.mode='side';
          this.inputSideNav.toggle();  
        }
    })
  }
    
  }
}
