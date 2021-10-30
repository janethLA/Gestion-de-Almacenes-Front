import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-restart-password',
  templateUrl: './dg-restart-password.component.html',
  styleUrls: ['./dg-restart-password.component.css']
})
export class DgRestartPasswordComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DgRestartPasswordComponent>,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snack:MatSnackBar,

  ) { }

  private isValidNumber="([6-7]{1})([0-9]{7})"
  hide=true;
  hide2=true;
  changePassword=this.formBuilder.group({
    password:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)], 
      asyncValidators:[this.passwordCheck()],
        updateOn: 'blur'
    }],
    confirmPassword:['',[Validators.required,Validators.pattern(this.isValidNumber),this.confirmCheck()]],
  })
  ngOnInit(): void {
  }
  existUser:string;
  
  passwordCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  confirmCheck(){
    return(control: AbstractControl)=>{
      console.log(control.value==this.changePassword?.get('password').value)
      if(control.value==this.changePassword?.get('password').value){
        return null;
      }else{
        return {same:false}
      }
        
    }

  } 
  getErrorMessage(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.changePassword?.get(field).errors?.required){
        message="nueva contraseña es requerido"
      }else if(this.changePassword?.get(field).hasError('pattern')){
        message="ingrese un numero de telefono valido"
      }else if(this.changePassword?.get(field).hasError('exist')){
        message="el numero ya esta registrado"
      }
    }
    return message
  }
  getErrorMessage2(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.changePassword?.get(field).errors?.required){
        message="nueva contraseña es requerido"
      }else if(this.changePassword?.get(field).hasError('pattern')){
        message="ingrese un numero de telefono valido"
      }else if(this.changePassword?.get(field).hasError('same')){
        message="ingrese la misma contraseña"
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
  updatePassword(){
    const dataUser={idFinalUser:this.data.idFinalUser,identifier:this.data.identifier,password:this.changePassword.get('password').value}
    if(this.data.identifier==1){
      this.RequestService.put("http://localhost:8080/api/auth/changePassword ",dataUser)
      .subscribe({
        next:()=>{
          this.snack.open('contraseña actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
          this.dialogRef.close()
          window.location.reload();
        },
        error:()=>{
          this.snack.open('Fallo al actualizar la contraseña','CERRAR',{duration:5000})
        }
      });
    }
  }
}
