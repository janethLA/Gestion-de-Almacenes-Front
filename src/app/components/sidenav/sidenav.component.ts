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
  constructor(
    public cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    window.location.reload();
    this.router.navigate(['/home'])
    
   
    
  }
}
