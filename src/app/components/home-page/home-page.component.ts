import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { DgNewUserComponent } from '../dialogs/dg-new-user/dg-new-user.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

 
  orderDetails:any[]=[];
  public productsReceived:any
  warehousesReceived:any;
  searchInput = new FormControl();
  public nameProduct:string;
  public latitudeUser:any;
  public longitudeUser:any;
  public onMap=false;
  formDataSearch = new FormData();
  marker: google.maps.Marker;
  productsCart:any[]=[];
  hidden = true;
  public positionItem:number;
  showPedido:boolean=false;
  total:number=0;
  loadMarketSelected=false;
  product:any;
  options: any;
  filteredOptions: Observable<string[]>;
  areasReceived:any;
  categorySelected:any;
  copyProductsReceived:any;
  activateSearch:any;
  warehouseSelected:any;

  orderForm = this.formBuilder.group({
    quantityProducts: ['',],
    totalPrice:['',],
    orderDetails: [this.orderDetails,],
  });
  
  constructor(
    private RequestService:RequestService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadDataProduct();
    this.geolocation();
    this.getAllSectors();
  }
  geolocation(){
    console.log(navigator.geolocation)
    if(!navigator.geolocation){
      console.log("location is not supported")
      this.searchInput.setValue("");
    }else{
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitudeUser=position.coords.latitude;
        this.longitudeUser=position.coords.longitude;
        console.log(this.latitudeUser)
        
      })
    }
     
  }
  loadDataProduct(){
    this.RequestService.get('http://localhost:8080/api/product/allProducts/')
    .subscribe(r=>{
      console.log(r);
      this.productsReceived = r;
      console.log(this.productsReceived)
    })
  }
  getProducts(){
    
    this.nameProduct=this.searchInput.value
    const formD = new FormData();
       formD.append("longitude",this.longitudeUser)
      formD.append("latitude", this.latitudeUser);
      formD.append("productName",this.nameProduct)
      console.log("formData",formD.get("productName"));
      this.formDataSearch=formD;
    //console.log(this.nameProduct,this.latitudeUser,this.longitudeUser)
    if(this.nameProduct!=null|| this.nameProduct!=""){
      console.log(this.formDataSearch.get("latitude"))
      console.log(this.formDataSearch.get("longitude"))
      this.RequestService.get2('http://localhost:8080/api/market/productSearch/',this.formDataSearch).subscribe(r=>{
      this.onMap=true;
     // this.warehousesReceived=r;
      this.loadMap();
      //this.sortBusiness();
      //if(this.Companies.length==0){
        //this.notCompanies=true;
      //} 
      }) 
    
    }
  }
 
  
  loadMap(){
    
    let loader=new Loader({
      apiKey:'AIzaSyAlZsuin6kTiBDLiELbZhUpgAeZ6UiYgWo'
    })
    loader.load().then(() => {
      const infoWindow = new google.maps.InfoWindow();
      const map=new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.latitudeUser, lng: this.longitudeUser},
        zoom: 12,
      });
      this.marker = new google.maps.Marker({
        map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: { lat: this.latitudeUser, lng: this.longitudeUser },
      });
      this.warehousesReceived.map((w)=>{
        this.marker = new google.maps.Marker({
          map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: { lat: w.latitude, lng: w.longitude },
          title: ` ${w.warehouseName}`,
          label: `${w.idMarket}`,
        });
        this.marker.addListener("click", () => {
          this.viewAllOfMarkets(w);
          infoWindow.close();
          infoWindow.setContent(this.marker.getTitle());
          infoWindow.open(this.marker.getMap(), this.marker);
        });
      })
      
    });
  }
  addProduct(newProduct:any){
    this.productsCart?.push(newProduct);
    this.hidden=false;
    
  }
  deleteProduct(idItem:any){
    this.productsCart?.splice(
      this.findProduct(idItem),1
    )
      
  }
  findProduct(idItem:number):number{
    this.productsCart.map((item)=>{
      if(item.idProduct==idItem){
        //console.log(this.productsCart.indexOf(item))
        return this.productsCart.indexOf(item)
      }
    })
    return
  }
  quantityBadgeRequest():number{
    return this.productsCart.length;
  }
  toggleBadgeVisibility() {
      this.hidden = !this.hidden;
      this.showPedido=true;
    
  }
  receiveSubtotal(orderDetail){
    if(this.orderDetails.length==0){
      this.orderDetails.push(orderDetail)
    }else{
      this.orderDetails.map((order)=>{
      
        if(order.idProduct==orderDetail.idProduct){
          var index=this.orderDetails.findIndex((item)=>{
            return item.idProduct===orderDetail.idProduct
          })
            
          this.orderDetails.splice(index,1)
          this.orderDetails.push(orderDetail)
        }else{
          this.orderDetails.push(orderDetail)
        }
      })
    }
    
  }
  getTotalPrice():number{
    this.total=0;
    this.orderDetails.map((order)=>{
      this.total+=order.subtotal
    })
    return this.total;
  }
  openDialogConfirm() {
    this.dialog.open(DgNewUserComponent,{
    width: '70%',
    data: { nro:"this.nro" }
    });
  }

  viewAllOfMarkets(warehouse){
    this.loadMarketSelected=true;
    this.RequestService.get('http://localhost:8080/api/category/allCategories/'+warehouse.idMarket).subscribe(r=>{
     this.areasReceived=r;
     this.warehouseSelected=warehouse;
     console.log(this.areasReceived)
     var allProducts=[]
     this.areasReceived.map(area=>{
       area.product.map(product=>{
         allProducts.push(product)
         
       })
     })
     this.productsReceived=allProducts;
     console.log(this.productsReceived)
     this.copyProductsReceived=this.productsReceived;
      }) 
  }
  
  changeSearch(option){
    if(option=="ubicacion"){
      this.geolocation();
      this.getMarkets();
      this.activateSearch=false;
      this.loadMarketSelected=false
    }else{
      //this.searchInput.markAsTouched();
      this.loadMarketSelected=false;
      this.activateSearch=true;
      this.searchInput.markAsPending()
    }
  }
  getMarkets(){
    
    var coords = {};
      coords={latitude:this.latitudeUser,longitude:this.longitudeUser}
      //console.log(coords)
      this.RequestService.post('http://localhost:8080/api/market/warehouseSearch/',coords).subscribe(r=>{
        this.warehousesReceived=r;
        console.log(r)
      this.onMap=true;
     
      this.loadMap();
      //this.sortBusiness();
      //if(this.Companies.length==0){
        //this.notCompanies=true;
      //} 
      }) 
    
    
  }
  getMarketsByZone(){
    if(this.searchInput.value!=""){
      this.RequestService.get('http://localhost:8080/api/market/warehouseSearch/'+this.searchInput.value).subscribe(r=>{
        
        this.onMap=true;
       this.warehousesReceived=r;
       console.log(this.warehousesReceived)
        this.loadMap();
        
        }) 
    }
    
  }
  viewProducts(category:any){
    
    this.categorySelected=category
    var allProducts=[]
     this.categorySelected.product.map(product=>{
       
         allProducts.push(product)
         
     })
     this.productsReceived=allProducts;
  
}
  addAllCategory(){
    this.categorySelected={categoryName:"Todos los productos"}
   this.productsReceived=this.copyProductsReceived;
  }
  getAllSectors(){
    this.RequestService.get('http://localhost:8080/api/sector/allSector').subscribe(r=>{
      this.options=r;
      this.filteredOptions = this.searchInput.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );
    })
  }
  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.sectorName.toLowerCase().includes(filterValue));
  }
}
