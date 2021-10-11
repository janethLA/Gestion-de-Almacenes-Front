import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
productsReceived:any
  constructor(
    private RequestService:RequestService
  ) { }

  ngOnInit(): void {
    this.loadDataProduct();
  }

  loadDataProduct(){
    this.RequestService.get('http://localhost:8080/api/product/allProducts/')
    .subscribe(r=>{
      console.log(r);
      this.productsReceived = r;
    })
  }
}
