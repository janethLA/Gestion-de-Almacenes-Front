import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { DgConfirmPedidoComponent } from '../dialogs/dg-confirm-pedido/dg-confirm-pedido.component';
import { DgNewUserComponent } from '../dialogs/dg-new-user/dg-new-user.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

 user:any;
 order:any;
 cart:any;
 notLogedUser:boolean;
  orderDetails:any[]=[];
  public productsReceived:any
  warehousesReceived:any;
  searchInput = new FormControl();
  searchInputProduct = new FormControl();
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
    totalPrice:[this.getTotalPrice(),],
    orderDetails: [this.orderDetails,],
  });
  
  constructor(
    private RequestService:RequestService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadChanges();
    this.loadDataProduct();
    this.geolocation();
    this.getAllSectors();
    this.getDataUser();
    this.verifyOrdersPending();
    this.loadDataWarehouse();
  }
  loadChanges() {
    this.route.queryParams
      .subscribe((params: any) => {
        console.log(params)
        params == true?this.loadNav():"";
    });
  }
  loadNav(){
    window.location.reload()
  }
  loadDataWarehouse(){
    this.RequestService.get('http://localhost:8080/api/market/allWarehouse/')
    .subscribe(r=>{
      console.log(r);
      this.warehousesReceived = r;
      this.loadMap()
    })
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
      var infoWindow = new google.maps.InfoWindow();
      var map=new google.maps.Map(document.getElementById("map"), {
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
        const marker = new google.maps.Marker({
          map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: { lat: w.latitude, lng: w.longitude },
          title: ` ${w.warehouseName}`,
          label: `${w.idMarket}`,
        });
        var image="data:image/jpg;base64,"+w.warehouseImage
        var contentItem="<div style='width:150px'><img src='"+ image+"'style='width:100%'></div><div style=' padding: 10px;'><b>"+w.warehouseName+"</b></div>";
        
        marker.addListener("mouseover", () => {
          this.viewAllOfMarkets(w);
          infoWindow.close();
          infoWindow.setContent(contentItem);
          infoWindow.open(marker.getMap(), marker);
        });
      })
      
    });
  }
  addProduct(newProduct:any){
    console.log(newProduct)
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
    //console.log(orderDetail)
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
    this.orderForm.get('quantityProducts').setValue(this.orderDetails.length)
    this.orderForm.get('totalPrice').setValue(this.total)
    
  }
  getTotalPrice():number{
    this.total=0;
    this.orderDetails.map((order)=>{
      this.total+=order.subtotal
    })
    return this.total;
  }
  openDialogConfirm() {
    localStorage.setItem("order",JSON.stringify(this.orderForm.value));
    localStorage.setItem("productsCart",JSON.stringify(this.productsCart));
    if(this.notLogedUser){
      this.dialog.open(DgNewUserComponent,{
        width: '70%',
        data: { nro:"this.nro" }
        });
    }else{
      this.dialog.open(DgConfirmPedidoComponent,{
        width: '60%',
        data: {products:this.productsCart,total:this.total,order:this.orderForm.value,user:this.user }
        });
    }
    
  }

  viewAllOfMarkets(warehouse){
    this.loadMarketSelected=true;
    this.RequestService.get('http://localhost:8080/api/category/allCategories/'+warehouse.idMarket).subscribe(r=>{
     this.areasReceived=r;
     this.warehouseSelected=warehouse;
     //console.log(this.areasReceived)
     var allProducts=[]
     this.areasReceived.map(area=>{
       area.product.map(product=>{
         allProducts.push(product)
         
       })
     })
     this.productsReceived=allProducts;
     //console.log(this.productsReceived)
     this.copyProductsReceived=this.productsReceived;
      }) 
  }
  
  changeSearch(option){
    if(option=="todos"){
      this.searchInput.setValue("");
      this.onMap=false;
      this.loadDataWarehouse();
      
    }
    if(option=="ubicacion"){
      //this.geolocation();
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
    
    this.searchInput.setValue("");
    var coords = {};
      coords={latitude:this.latitudeUser,longitude:this.longitudeUser}
      console.log(coords)
      this.RequestService.post('http://localhost:8080/api/market/warehouseSearch/',coords).subscribe(r=>{
        this.onMap=true;
        this.warehousesReceived=r;
        console.log(this.warehousesReceived)
         this.loadMap();
      
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
     //console.log(this.productsReceived)
  
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
  getDataUser(){
    this.order=JSON.parse(localStorage.getItem("order"))
    this.cart=JSON.parse(localStorage.getItem("productsCart"))
    this.user=JSON.parse(localStorage.getItem("user"))
    if(this.user==undefined || this.user==null){
      this.notLogedUser=true;
    }else{
      this.notLogedUser=false;
    }
  }
  verifyOrdersPending(){
    if(this.order!=null||this.order!=undefined){

      this.dialog.open(DgConfirmPedidoComponent,{
        width: '60%',
        data: {products:this.cart,total:this.total,order:this.order,user:this.user }
        });
    }
  }
  getProductsSearch(){
    this.nameProduct=this.searchInputProduct.value
    const formD = new FormData();
       formD.append("productName",this.nameProduct)
     console.log("formData",formD.get("productName"));
      this.formDataSearch=formD;
    //console.log(this.formDataSearch)
    if(this.nameProduct!=null|| this.nameProduct!=""){
      this.RequestService.post('http://localhost:8080/api/product/productSearch/'+this.warehouseSelected.idMarket,this.formDataSearch).subscribe(r=>{
      console.log(r)
     this.viewProducts(r[0])
      
      //this.sortBusiness();
      //if(this.Companies.length==0){
        //this.notCompanies=true;
      //} 
      }) 
    
    }
  }
}
