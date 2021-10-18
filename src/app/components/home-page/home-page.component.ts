import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  productsReceived:any
  warehousesReceived:any;
  searchInput = new FormControl();
  public nameProduct:string;
  public latitudeUser:any;
  public longitudeUser:any;
  public onMap=false;
  formDataSearch = new FormData();
  marker: google.maps.Marker;

  constructor(
    private RequestService:RequestService
  ) { }

  ngOnInit(): void {
    this.loadDataProduct();
    this.geolocation();
  }
  geolocation(){
    if(!navigator.geolocation){
      console.log("location is not supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitudeUser=position.coords.latitude;
      this.longitudeUser=position.coords.longitude;
      
    })
  }
  loadDataProduct(){
    this.RequestService.get('http://localhost:8080/api/product/allProducts/')
    .subscribe(r=>{
      console.log(r);
      this.productsReceived = r;
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
      this.RequestService.get2('http://localhost:8080/api/market/productSearch/',this.formDataSearch).subscribe(r=>{
      this.onMap=true;
      this.warehousesReceived=r;
      this.loadMap();
      //this.sortBusiness();
      //if(this.Companies.length==0){
        //this.notCompanies=true;
      //} 
    }) 
    
  }
  }
  generateFormData(){
    const formD = new FormData();
      formD.append("latitude", this.latitudeUser);
       formD.append("longitude",this.longitudeUser)
      formD.append("productName",this.nameProduct)
      //console.log("formData",formD);
      this.formDataSearch=formD;
  }
  loadMap(){
    
    let loader=new Loader({
      apiKey:'AIzaSyAlZsuin6kTiBDLiELbZhUpgAeZ6UiYgWo'
    })
    loader.load().then(() => {
      const map=new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.latitudeUser, lng: this.longitudeUser},
        zoom: 8,
      });
      this.warehousesReceived.map((w)=>{
        this.marker = new google.maps.Marker({
          map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: { lat: w.latitude, lng: w.longitude },
        });
      })
      
    });
  }
}
