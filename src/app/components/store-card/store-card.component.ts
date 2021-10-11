import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.css']
})
export class StoreCardComponent implements OnInit {
@Input() id:number;
@Input() name:string;
@Input() address:string;
@Input() latitude:number;
@Input() longitude:number;
marker: google.maps.Marker;
  constructor() { }

  ngOnInit(): void {
    let loader=new Loader({
      apiKey:'AIzaSyAlZsuin6kTiBDLiELbZhUpgAeZ6UiYgWo'
    })
    loader.load().then(() => {
      const map=new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.latitude, lng: this.longitude},
        zoom: 8,
      });
      this.marker = new google.maps.Marker({
        map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: { lat: this.latitude, lng: this.longitude },
      });
    });
  }

}
