import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-add-receipt',
  templateUrl: './dg-add-receipt.component.html',
  styleUrls: ['./dg-add-receipt.component.css']
})
export class DgAddReceiptComponent implements OnInit {
  public activateSpinner:boolean;
  dataPays:any;
  addReceipt=this.formBuilder.group({
    
    receipt:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<DgAddReceiptComponent>,
  ) { }
    
  ngOnInit(): void {
    this.dataPays=this.data.dataSelected
    console.log(this.dataPays)
  }
  
  sendReceipt(){
    var listPays=[]
    this.dataPays.map(data=>{
      listPays.push(data.idOrder)
    })
    console.log(this.dataPays)
    if(this.data.name=='delivery'){
      this.RequestService.put("http://localhost:8080/api/orderAssigned/payDelivery/"+this.dataPays[0].idDelivery+"/"+this.addReceipt.get('receipt').value,listPays).subscribe({
        next:()=>{
          window.location.reload()
        },error:()=>{
          window.location.reload()
        }
      })
    }else{
      this.RequestService.put("http://localhost:8080/api/orderAssigned/payBuyer/"+this.dataPays[0].idBuyer+"/"+this.addReceipt.get('receipt').value,listPays).subscribe({
        next:()=>{
          window.location.reload()
        },error:()=>{
          window.location.reload()
        }
      })
    }
    
  }
}
