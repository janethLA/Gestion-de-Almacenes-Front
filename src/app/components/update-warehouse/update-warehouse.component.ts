import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})
export class UpdateWarehouseComponent implements OnInit {
  allWarehouses:any;
  allSectors:any;
  constructor(
    private RequestService:RequestService
  ) { }

  ngOnInit(): void {
    this.loadDataWarehouse();
    this.getAllSectors();
  }
  loadDataWarehouse(){
    this.RequestService.get('http://localhost:8080/api/market/allWarehouse/')
    .subscribe(r=>{
      this.allWarehouses = r;
      console.log(this.allWarehouses)
    })
  }
  getAllSectors(){
    this.allSectors=[{idSecor:1,sectorName:"Sud"},
                      {idSecor:2,sectorName:"Norte"},
                      {idSecor:3,sectorName:"Quillacollo"}]
    this.RequestService.get('http://localhost:8080/api/sector/allSector')
    .subscribe(r=>{
      this.allSectors=r;
  })
  }
  getWarehousesByZone(sector):any[]{
    var warehouses=this.allWarehouses?.filter(w=>w.sectorName==sector)
    return warehouses
  }
}
