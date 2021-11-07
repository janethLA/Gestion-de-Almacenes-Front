import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-create-payment',
  templateUrl: './dg-create-payment.component.html',
  styleUrls: ['./dg-create-payment.component.css']
})
export class DgCreatePaymentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
  ) { }
  dataFile:any;
  fileName = '';
  formData = new FormData();

  payment= this.formBuilder.group({
    nameAccount:['',[Validators.required]],
    bankName:['',[Validators.required]],
    nroAccount:['',[Validators.required]],
    qr:['',[Validators.required]],
    
  });
  ngOnInit(): void {
  }
  
  savePayment(payment,formDirective: FormGroupDirective){
    this.RequestService.post('http://localhost:8080/api/payment/createPayment',this.formData).subscribe({
      next:()=>{
        this.snack.open('Forma de Pago registrado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
       window.location.reload();
       
      },
      error:()=>{
        this.snack.open('Fallo al registrar la forma de pago','CERRAR',{duration:5000});
        
      }
    })
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    //console.log(file, event);
    if (file) {
      this.fileName = file.name;
      const formD = new FormData();
      formD.append("qr", file);
      this.payment.get('qr').setValue(file)
      //console.log(this.productForm.get('productName').value)
       formD.append("nameAccount",this.payment.get('nameAccount').value)
      formD.append("bankName",this.payment.get('bankName').value)
      formD.append("nroAccount",this.payment.get('nroAccount').value)
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
