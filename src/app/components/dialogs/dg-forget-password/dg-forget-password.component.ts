import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { DgPhoneCodeComponent } from '../dg-phone-code/dg-phone-code.component';

@Component({
  selector: 'app-dg-forget-password',
  templateUrl: './dg-forget-password.component.html',
  styleUrls: ['./dg-forget-password.component.css']
})
export class DgForgetPasswordComponent implements OnInit {
  private isValidEmail:any=/\S+@\S+\.\S/;
  public activateSpinner:boolean;
  changePassword=this.formBuilder.group({
    
    email:['',[Validators.required,Validators.pattern(this.isValidEmail)]],
  })
  code:any;
  constructor(
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<DgPhoneCodeComponent>,
  ) { }

  ngOnInit(): void {
  }
  sendEmail(){
    var email=this.changePassword.get('email').value
    this.activateSpinner=true;
    console.log(email)
    this.RequestService.get("http://localhost:8080/api/auth/sendEmail/"+email).subscribe(r=>{
      console.log(r)
      this.activateSpinner=false;
      this.openDialogCodeValidate(r);
      this.dialogRef.close();
    })

  }
  openDialogCodeValidate(respuesta) {
    this.dialog.open(DgPhoneCodeComponent,{
    width: '50%',
    data: { idFinalUser:respuesta.idFinalUser,code:respuesta.code,identifier:respuesta.identifier }
    });
  }
}
