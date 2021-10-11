import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-store-content',
  templateUrl: './store-content.component.html',
  styleUrls: ['./store-content.component.css']
})
export class StoreContentComponent implements OnInit {
  pressedCategory:boolean=false;
  pressedProduct:boolean=false;
  idStore:any;
  allCategories:any;
  allWarehouses:any;
  warehouseActual:any;
  constructor(
    private RequestService:RequestService,
    private rutaActiva: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idStore= this.rutaActiva.snapshot.params.id
    this.loadDataStore();
    this.loadCategories();

  }
  loadCategories(){
    this.RequestService.get('http://localhost:8080/api/category/allCategories/'+this.idStore)
    .subscribe(r=>{
      this.allCategories = r;
      console.log(this.allCategories)
    })
  }
  loadDataStore(){
    this.RequestService.get('http://localhost:8080/api/market/allWarehouse/')
    .subscribe(r=>{
      this.allWarehouses = r;
      this.allWarehouses.map(Ware=>{
        if(Ware.idMarket==this.idStore){
          this.warehouseActual=Ware;
        }
      })
      console.log(this.warehouseActual)
    })
  }
  addCategory(){
    this.pressedCategory=true;

  }
  addProduct(){
    this.pressedProduct=true;
  }
}
