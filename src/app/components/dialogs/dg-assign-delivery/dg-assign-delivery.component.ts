import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-assign-delivery',
  templateUrl: './dg-assign-delivery.component.html',
  styleUrls: ['./dg-assign-delivery.component.css']
})
export class DgAssignDeliveryComponent implements OnInit {
  allDeliveries:any;
  allDeliveriesCopy:any;
  noDeliverySelected:boolean=true;
  deliverySelected:any;
  searchInput = new FormControl();
  options: any;
  filteredOptions: Observable<string[]>;
  public notCompanies=false;
  constructor(
    private RequestService:RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snack:MatSnackBar,
    private dialogRef: MatDialogRef<DgAssignDeliveryComponent>,
  ) { }

  ngOnInit(): void {
    this.loadDeliveries();
    this.getAllSectors()
    /* this.allDeliveries=[
      {idUser:1,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
      {idUser:2,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
      {idUser:3,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
    ] */
  }
  loadDeliveries(){
    this.RequestService.get('http://localhost:8080/api/order/allDeliveries')
    .subscribe(r=>{
      this.allDeliveries=r
      this.allDeliveriesCopy=this.allDeliveries
      console.log(this.allDeliveries)
    })
  }
  getDelivery(options: MatListOption[]) {
    this.deliverySelected=options.map(o=> o.value);
    console.log(this.deliverySelected)
    if(options!=[]){
      this.noDeliverySelected=false;
    }
}
assignDelivery(){
  var assign={idUser:this.deliverySelected[0].idUser,idOrder:this.data.idOrder}
  this.RequestService.post('http://localhost:8080/api/orderAssigned/assignOrder',assign)
  .subscribe({
    next:()=>{

    },error:()=>{
      window.location.reload()
    }
  })
  }

  getAllSectors(){
    this.RequestService.get('http://localhost:8080/api/sector/allSector').subscribe(r=>{
      this.options=r;
      console.log(this.options)
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
  filterDeliveries(){
    this.allDeliveries=this.allDeliveriesCopy.filter(d=>{
      if(d.sector==this.searchInput.value){
        return d
      }
    })
    console.log(this.allDeliveries)
  }
}
