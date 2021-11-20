import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { DgShippingCostComponent } from '../dg-shipping-cost/dg-shipping-cost.component';

@Component({
  selector: 'app-dg-assign-delivery',
  templateUrl: './dg-assign-delivery.component.html',
  styleUrls: ['./dg-assign-delivery.component.css']
})
export class DgAssignDeliveryComponent implements OnInit {
  allDeliveries:any;
  allDeliveriesCopy:any;
  allBuyers:any;
  allBuyersCopy:any;
  noDeliverySelected:boolean=true;
  deliverySelected:any;
  buyerSelected:any;
  searchInput = new FormControl;
  options: any;
  filteredOptions: Observable<string[]>;
  public notCompanies=false;
  allPayments:any;
  noPaymentSelected:boolean=true;
  paymentSelected:any;
  user:any;
  shippingForm= this.formBuilder.group({
    shippingCost:['',[]],
    deliveryCost:['',[Validators.required]],
    buyerCost:['',[Validators.required]],
    
  });
  
  constructor(
    private RequestService:RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snack:MatSnackBar,
    private dialogRef: MatDialogRef<DgAssignDeliveryComponent>,
    private dialog:MatDialog,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.loadDataUser()
    this.loadDeliveries();
    this.loadBuyers();
    this.getAllSectors();
    this.loadPayments();
    
    /* this.allDeliveries=[
      {idUser:1,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
      {idUser:2,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
      {idUser:3,name:"marco",email:"marc@gmail.com",telephone:78787878,sector:"Zona SUD"},
    ] */
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadDeliveries(){
    this.RequestService.get('http://localhost:8080/api/order/allDeliveries')
    .subscribe(r=>{
      this.allDeliveries=r
      this.allDeliveriesCopy=this.allDeliveries
      console.log(this.allDeliveries)
    })
  }
  loadBuyers(){
    this.RequestService.get('http://localhost:8080/api/order/allBuyers')
    .subscribe(r=>{
      this.allBuyers=r
      this.allBuyersCopy=this.allBuyers
      console.log(this.allBuyers)
      if(this.data.assign!= undefined){
        this.allBuyers = this.allBuyers.map((buyer) => ({
          ...buyer,
          seleccionado: buyer.idUser===this.data.assign.idUserOfBuyer
        }));
        this.noDeliverySelected=false;
        this.buyerSelected=[{idUser:this.data.assign.idUserOfBuyer}];
        this.loadDataAssign();
      }
    })
  }
  getDelivery(options: MatListOption[]) {
    this.deliverySelected=options.map(o=> o.value);
    console.log(this.deliverySelected)
    if(options!=[]){
      this.noDeliverySelected=false;
    }
  }
  getBuyer(options: MatListOption[]) {
    this.buyerSelected=options.map(o=> o.value);
    console.log(this.buyerSelected)
    if(options!=[]){
      this.noDeliverySelected=false;
    }
  }
  loadPayments(){
    this.RequestService.get('http://localhost:8080/api/payment/allPayments')
    .subscribe(r=>{
      this.allPayments=r
      console.log(this.allPayments)
      if(this.data.assign!= undefined){
        this.allPayments = this.allPayments.map((payment) => ({
          ...payment,
          seleccionado: payment.idPayment===this.data.assign.idPayment
        }));
        this.noPaymentSelected=false;
        this.paymentSelected=[{idPayment:this.data.assign.idPayment}]
      }
    })
  }
  getPayment(options: MatListOption[]) {
    this.paymentSelected=options.map(o=> o.value);
    console.log(this.paymentSelected)
    if(options!=[]){
      this.noPaymentSelected=false;
    }
  }
  loadDataAssign(){
      this.shippingForm.get('deliveryCost').setValue(this.data.assign?.deliveryCost)
      this.shippingForm.get('buyerCost').setValue(this.data.assign?.buyerCost)
      this.shippingForm.get('shippingCost').setValue(this.shippingForm.get('deliveryCost').value + this.shippingForm.get('buyerCost').value)
 }
  assignDelivery(){
    this.shippingForm.get('shippingCost').setValue(this.shippingForm.get('deliveryCost').value + this.shippingForm.get('buyerCost').value)
    var assign={idUser:this.deliverySelected[0].idUser,idOrder:this.data.idOrder,shippingCost:this.shippingForm.get('shippingCost').value,
                idUserCallCenter:this.user.idUser,idPayment:this.paymentSelected[0].idPayment, idUserOfBuyer:this.buyerSelected[0].idUser,
                deliveryCost:this.shippingForm.get('deliveryCost').value,buyerCost:this.shippingForm.get('buyerCost').value}
    console.log(assign)
   this.RequestService.post('http://localhost:8080/api/orderAssigned/assignOrder',assign)
    .subscribe({
      next:()=>{
        //window.location.reload()
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
  openShippingCost(){
    this.dialog.open(DgShippingCostComponent,{
      width: '50%',
      data: { idUser:this.deliverySelected[0].idUser,idOrder:this.data.idOrder}
      });
  }
  
}
