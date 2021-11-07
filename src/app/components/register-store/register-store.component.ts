import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loader } from '@googlemaps/js-api-loader';

import {RequestService} from '../../services/request.service';
export interface coordenada{
  longitud:number;
  latitud:number;
}
@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {
  ubicacionCentral:coordenada;
  ubicacionEnProceso:coordenada;

  coordenadas:coordenada[]=[];
  marker: google.maps.Marker;
  sectors:any;
  dataFile:any;
  fileName = '';
  formData = new FormData();
  constructor(
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar
  ) { }

  registerStoreForm= this.formBuilder.group({
    marketName:['',[Validators.required]],
    address:['',[Validators.required]],
    latitude:['',[Validators.required]],
    longitude:['',[Validators.required]],
    idSector:['',[Validators.required]],
    image:['',[Validators.required]]
    });

  ngOnInit(): void {
    this.startMap();
    this.loadSectors();
  }

  startMap(){
    var latitude:any;
  var longitude:any;
    let loader=new Loader({
      apiKey:'AIzaSyAlZsuin6kTiBDLiELbZhUpgAeZ6UiYgWo'
    })
    loader.load().then(() => {
      const map=new google.maps.Map(document.getElementById("map"), {
        center: { lat: -17.3895, lng: -66.1568 },
        zoom: 12,
      });
      this.marker = new google.maps.Marker({
        map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: -17.3895, lng: -66.1568 },
      });
      
      this.marker.addListener("dragend", ($event)=>{
        latitude=$event.latLng.lat();
        longitude=$event.latLng.lng();
        console.log(latitude)
        this.addCoordenadas(latitude,longitude)
      });
    }); 
  }
  
  addCoordenadas(latitude,longitude){
    this.registerStoreForm.get('latitude').setValue(latitude)
    this.registerStoreForm.get('longitude').setValue(longitude)
  }
  loadSectors(){
    this.RequestService.get('http://localhost:8080/api/sector/allSector').subscribe(r=>{
      this.sectors=r;
    })
  }
  saveStore(store,formDirective: FormGroupDirective){
    this.RequestService.post('http://localhost:8080/api/market/createMarket ',this.formData).subscribe({
      next:()=>{
        this.snack.open('Almacen registrado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess'})
        window.location.reload();
    
      },
      error:()=>{
        this.snack.open('Fallo al registrar el Almacen','CERRAR',{duration:5000});
      }
    })
  }
  onFileSelected(event) {
    const file:File = event.target.files[0];
    //console.log(file, event);
    if (file) {
      this.fileName = file.name;
      const formD = new FormData();
      formD.append("image", file);
      this.registerStoreForm.get('image').setValue(file)
      //console.log(this.productForm.get('productName').value)
       formD.append("marketName",this.registerStoreForm.get('marketName').value)
      formD.append("address",this.registerStoreForm.get('address').value)
      formD.append("longitude",this.registerStoreForm.get('longitude').value)
      formD.append("latitude",this.registerStoreForm.get('latitude').value)
      formD.append("idSector",this.registerStoreForm.get('idSector').value)
      //console.log("formData",formD);
      this.formData=formD;
     }
  }
  replace:boolean=false;
  disalbedInput(){
    let disabled:boolean=false;
    if(this.dataFile!=null){
      disabled=true;
    }
    if(this.replace==true){
      disabled=false;
    }
    return disabled;
  }
}
