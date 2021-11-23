import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ProductFormComponent } from '../product-form/product-form.component';

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
  categorySelected:any={categoryName:"Todos los productos"}
  productsReceived:any[]=[];
  copyProductsReceived:any;
  user:any;
  permits:any;
    edit:Boolean;
  constructor(
    private RequestService:RequestService,
    private rutaActiva: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.idStore= this.rutaActiva.snapshot.params.id
    this.loadDataUser();
    this.loadDataStore();
    this.loadCategories();
    //this.loadDataProduct();

  }
 
  
  loadDataProduct(){
    this.RequestService.get('http://localhost:8080/api/product/allProducts/')
    .subscribe(r=>{
      console.log(r);
      //this.productsReceived = r;
      this.copyProductsReceived=this.productsReceived;
    })
  }
  loadCategories(){
    this.RequestService.get('http://localhost:8080/api/category/allCategories/'+this.idStore)
    .subscribe(r=>{
      this.allCategories = r;
      this.allCategories.map(category=>{
          category.product.map(product=>{
            this.productsReceived.push(product)
          })
       
      })
      console.log(this.allCategories)
      console.log(this.productsReceived)
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
  viewProducts(category:any){
    
      this.categorySelected=category
      this.productsReceived=this.categorySelected.product
    
    
    console.log(this.categorySelected)
    
  }
  addAllCategory(){
    this.categorySelected={categoryName:"Todos los productos"}
    this.productsReceived=this.copyProductsReceived;
  }
  addNewCategory(){
    
      this.dialog.open(CategoryFormComponent,{
        data:{
          idStore:this.idStore
        }
      })
    
  }
  addNewProduct(){
    
    this.dialog.open(ProductFormComponent,{
      data:{
        idStore:this.idStore,
        allCategories:this.allCategories,
      }
    })
  
}
loadDataUser(){
  this.user=JSON.parse(localStorage.getItem("user"))
  this.permits=JSON.parse(localStorage.getItem("permits"))
  this.loadPermits()
 
}
loadPermits(){
  console.log(this.permits)
  this.permits?.map(p=>{
    if(p.authority=="ROLE_ACTUALIZAR_IMAGEN" ){
      this.edit=true;
    }if(p.authority=="ROLE_ACTUALIZAR_PRECIOS"){
      this.edit=true;
    } 
    if(p.authority=="ROLE_ADMINISTRAR_ALMACENES"){
      this.edit=false;
    }
  })
}

}
