import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { RequestService } from 'src/app/services/request.service';
import { DgAssignDeliveryComponent } from '../../dialogs/dg-assign-delivery/dg-assign-delivery.component';
import { DgChangeSubstateComponent } from '../../dialogs/dg-change-substate/dg-change-substate.component';
import { DgFillEmergencyComponent } from '../../dialogs/dg-fill-emergency/dg-fill-emergency.component';
import { DgViewPaymentComponent } from '../../dialogs/dg-view-payment/dg-view-payment.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
  providers: [DatePipe]
})
export class OrderCardComponent implements OnInit {
  @Input() idOrder:number;
  @Input() orderDate:any;
  @Input() orderDetail:any;
  @Input() quantityProducts:number;
  @Input() status:string;
  @Input() totalPrice:number;
  @Input() disabled:boolean;
  @Input() warehouseName:string;
  @Input() userName:string;
  @Input() telephone:number;
  @Input() email:string;
  @Input() sectorName:string;
  @Input() shippingCost:number;
  @Input() linkAdmin:string;
  @Input() linkClient:string;
  @Input() linkDelivery:string;
  @Input() linkBuyer:string;
  @Input() nameAccount:string;
  @Input() bankName:string;
  @Input() nroAccount:any;
  @Input() qr:any;
  @Input() buttons:boolean;
  @Input() idOrderAssigned:any;
  @Input() substate:string;
  @Input() reassigned:boolean;
  @Input() complete:boolean;
  @Input() completed:boolean;
  @Input() finalUserPendiente:boolean;
  @Input() assignData:any;
  productsCart:any[]=[];
  image:any;
  orderCompleted:boolean;
  statusDiferent:boolean;
  constructor(
    private dialog:MatDialog,
    private RequestService:RequestService,
    private snack:MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getColorSR(status){
    let color:string;
    if (status=='Pendiente') {
      color = '#979797';
      this.statusDiferent=true;
    } else if (status=='Aceptado') {
        color = '#1975ff';
        this.statusDiferent=true;
      }else if(status=='En curso'){
        color= '#ffc400';
        this.statusDiferent=true;
      }else if(status=='Rechazado'|| status=='Cancelado'){
        color= '#ff4848';
      }else if(status=='Enviando'){
        color= '#ff961c';
        this.statusDiferent=true;
      }else if(status=='Finalizado'){
        color = '#28a745'
      }
    return color;
  }
  getColorSubState(status){
    let color:string;
    if (status=='por pagar') {
      color= '#ff4848'
    } else if (status=='pagado') {
      color = '#28a745'
      }else if(status=='pagado al delivery'){
        color = '#28a745'
      }
    return color;
  }
  getProducts(){
    this.orderDetail.map(order=>{
      var prod=Object.assign(order.product,{subtotal:order.subtotal, units:order.units})
    
      this.productsCart.push(prod)
    })
    console.log(this.productsCart)
  }
  openAssign(){
    if(this.reassigned==true){
      this.dialog.open(DgAssignDeliveryComponent,{
        width: '70%',
        data: {idOrder:this.idOrder, assign:this.assignData}
        });
    }else{
      this.dialog.open(DgAssignDeliveryComponent,{
        width: '70%',
        data: {idOrder:this.idOrder}
        });
    }
    
  }
  openPayment(){
    this.dialog.open(DgViewPaymentComponent,{
      width: '50%',
      data: {idOrder:this.idOrder,nameAccount:this.nameAccount,nroAccount:this.nroAccount,bankName:this.bankName,qr:this.qr}
      });
  }
  acceptOrder(){
    this.RequestService.put("http://localhost:8080/api/orderAssigned/assignedOrderAccepted/"+this.idOrderAssigned,"").subscribe({
      next:()=>{
        console.log("aceptado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  rejectOrder(){
    this.RequestService.put("http://localhost:8080/api/orderAssigned/assignedOrderRejected/"+this.idOrderAssigned,"").subscribe({
      next:()=>{
        console.log("rechazado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  cancelOrder(){
    this.RequestService.put("http://localhost:8080/api/order/orderCanceled/"+this.idOrder,{}).subscribe({
      next:()=>{
        console.log("cancelado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  completeOrder(){
    console.log(this.substate)
    if(this.substate!= 'por pagar'){
      this.RequestService.put("http://localhost:8080/api/orderAssigned/orderCompleted/"+this.idOrderAssigned,"").subscribe({
      next:()=>{
        console.log("completado con exito")
      },error:()=>{
        this.complete=false
        this.orderCompleted=true;
        window.location.reload()
      }
    })
    }else{
      this.snack.open('No se puede finalizar, falta pagar','CERRAR',{duration:5000,panelClass:'snackError',})
       
    }
    
  }
  orderSent(){
    this.RequestService.put("http://localhost:8080/api/order/orderSent/"+this.idOrder,{}).subscribe({
      next:()=>{
        console.log("enviando con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  orderReassign(){
    this.RequestService.put("http://localhost:8080/api/order/reassignOrderInProgress/"+this.idOrder,{}).subscribe({
      next:()=>{
        console.log("reasignado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  cancelOrderInProgress(){
    this.RequestService.put("http://localhost:8080/api/order/cancelOrderInProgressAndSent/"+this.idOrder,{}).subscribe({
      next:()=>{
        console.log("cancelado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }
  finalizeOrder(){
    if(this.substate!= 'por pagar'){
    this.RequestService.put("http://localhost:8080/api/order/finalizeOrder/"+this.idOrder,{}).subscribe({
      next:()=>{
        console.log("finalizado con exito")
      },error:()=>{
        window.location.reload()
      }
    })
  }else{
    this.snack.open('No se puede finalizar, verifique el estado del pago','CERRAR',{duration:5000,panelClass:'snackError',})
     
  }
  }
  addEmergency(){
    this.dialog.open(DgFillEmergencyComponent,{
      width: '50%',
      data: {idOrderAssigned:this.idOrderAssigned}
      });
  }
  openLink(link:string){
    window.open(link,'_blank')
  }
  openChangeSubstate(status:string){
    
      this.dialog.open(DgChangeSubstateComponent,{
        width: '40%',
        data: {idOrder: this.idOrder, status:status}
        });
  }
  async printOrder(){
    let myDate = new Date();
    let myActualDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
        const pdf=new PdfMakeWrapper();
        pdf.pageMargins([0,20,0,0])
        pdf.pageSize('A6')
        pdf.pageOrientation('portrait')
        pdf.defaultStyle({
          fontSize:11,
         //font: 'timesNewRoman'
          //font:'Courier New'
        })
       
          pdf.add(new Txt('PEDIDO #'+this.idOrder).alignment('center').fontSize(12).bold().end);
          pdf.add(new Txt('Almacen:'+this.warehouseName).alignment('left').fontSize(11).margin([20,0]).end);
          pdf.add(new Txt('Sector:'+this.sectorName).alignment('left').fontSize(9).margin([20,0]).end);
          pdf.add(new Txt('Fecha: '+ myActualDate).margin([20,5]).alignment('right').end);
          pdf.add(new Txt('******************************************************').margin([20,0]).end);
          pdf.add(pdf.ln(1));
          pdf.add(new Txt('Productos                           Cantidad               Subtotal  ').margin([20,0]).bold().end);
          this.productsCart.map(product=>{
            pdf.add(new Txt('- '+product.productName +"("+product.quantity+product.measurement+")"+ ".........."+product.units+"unidad"+ ".........."+(product.subtotal)+"Bs").alignment('left').fontSize(10).margin([20,0]).end);
          })
          pdf.add(new Txt('******************************************************').margin([20,0]).end);
          pdf.add(new Txt('Total: ' + this.totalPrice + " "+ 'Bs.').margin([20,5]).bold().alignment('right').fontSize(11).end);
          
           pdf.create().open()
        
    }

}
