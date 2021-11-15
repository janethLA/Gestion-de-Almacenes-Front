import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { DgPhoneCodeComponent } from '../dg-phone-code/dg-phone-code.component';

@Component({
  selector: 'app-dg-forget-password',
  templateUrl: './dg-forget-password.component.html',
  styleUrls: ['./dg-forget-password.component.css']
})
export class DgForgetPasswordComponent implements OnInit {
  private isValidEmail:any=/\S+@\S+\.\S/;
  private isValidNumber="([6-7]{1})([0-9]{7})"
  public activateSpinner:boolean;
  changePassword=this.formBuilder.group({
    
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheck()],
      updateOn: 'blur'
    }],
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
    var telephone=this.changePassword.get('telephone').value
    this.activateSpinner=true;
    this.RequestService.get("http://localhost:8080/api/auth/recoverByPhone/"+telephone).subscribe(r=>{
      console.log(r)
      this.activateSpinner=false;
      
      this.openDialogCodeValidate(r,telephone);
      this.dialogRef.close();
    })

  }
  sendMessage(code,telephone){
    var message={message:"*Verifica tu número*, tu codigo de verificacion es:"+code,number:"591"+telephone}
    console.log(message)
    this.RequestService.post("http://localhost:9000/send",message).subscribe(r=>{
      console.log(r)
    })
  }
  openDialogCodeValidate(respuesta,telephone) {
    this.sendMessage(respuesta.code,telephone)
   // console.log(respuesta.idFinalUser)
    this.dialog.open(DgPhoneCodeComponent,{
    width: '50%',
    data: { idFinalUser:respuesta.idFinalUser,code:respuesta.code,identifier:respuesta.identifier ,telephone:telephone}
    });
  }
  telephoneCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  {exist:result} :null )
        );
      
    };
  }
  getErrorMessageNumber(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.changePassword?.get(field).errors?.required){
        message="Campo celular es requerido"
      }else if(this.changePassword?.get(field).hasError('pattern')){
        message="El numero de celular no es valido"
      }else if(this.changePassword?.get(field).hasError('exist')){
        message="este numero no esta registrado"
      }
    }
    return message
  }
  
  isValidField(field: string):boolean{
    return(
      (this.changePassword.get(field).touched || this.changePassword.get(field).dirty) &&
       !this.changePassword.get(field).valid
    )  
  }

}
