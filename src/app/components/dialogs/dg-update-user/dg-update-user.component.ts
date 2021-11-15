import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import {RequestService} from '../../../services/request.service'
import { DgPhoneCodeComponent } from '../dg-phone-code/dg-phone-code.component';

@Component({
  selector: 'app-dg-update-user',
  templateUrl: './dg-update-user.component.html',
  styleUrls: ['./dg-update-user.component.css']
})
export class DgUpdateUserComponent implements OnInit {
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DgUpdateUserComponent>,
    private dialog:MatDialog,
    private RequestService:RequestService,
    private formBuilder:FormBuilder,
    private snack:MatSnackBar,
  ) { }
  hide = false;
  activateSpinner:boolean
  private isValidUserName:any=/^[a-zA-Z0-9]+$/;
  private isValidNumber="([6-7]{1})([0-9]{7})"
  private isValidEmail:any=/\S+@\S+\.\S/;
  editUser = this.formBuilder.group({
    finalUserName:['',],
    password:['',{
      validators:[Validators.required,]
    }],
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheck()],
      updateOn: 'blur'
    }],
    userName:['',{
      validators:[Validators.pattern(this.isValidUserName)], 
      asyncValidators:[this.usernameCheck()],
        updateOn: 'blur'
    }]
  })
  
  user=this.data.user;

  ngOnInit(): void {
    this.user=this.data.user;
      //this.fiterRoleType();
      console.log(this.user)
      this.editUser.controls['finalUserName'].setValue(this.user?.finalUserName);
      //this.editUser.controls['password'].setValue(this.user?.password);
      this.editUser.controls['userName'].setValue(this.user?.userName);
      this.editUser.controls['telephone'].setValue(this.user?.telephone);
      this.editUser.controls['password'].setValue(this.user?.password);

  }

  saveEdit(update,formDirective: FormGroupDirective){
    this.activateSpinner=true;
    if(update.userName==this.user.userName){
      update.userName=""
    }
    if(update.password==this.user.password){
      update.password=""
    }
    if(update.telephone==this.user.telephone){
      update.telephone=""
    }
    if(update.finalUserName==this.user.finalUserName){
      update.finalUserName=""
    }
    //console.log(update)
    this.RequestService.put('http://localhost:8080/api/finalUser/updateDataUser/'+this.user?.idFinalUser, update)
    .subscribe({
      next:(r:any)=>{
        console.log(r.code)
        if(r.code!=''){
          this.openDialogCode(r)
        }else{
          
        this.activateSpinner=false;
        this.snack.open('Usuario actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload()
        }
        //window.location.reload();
      },
      error:()=>{
        this.snack.open('Fallo al actualizar el usuario','CERRAR',{duration:5000})
      }
    });

  }

  existUser:string;
  usernameCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/finalUser/uniqueUserName/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : ((control.value==this.user.userName)?null:{exist:!result}))
        );
      
    };
  }
  telephoneCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : ((control.value==this.user.telephone)?null:{exist:!result}))
        );
      
    };
  }
  emailCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      if(control.value!=""){
        return this.RequestService.get('http://localhost:8080/api/auth/uniqueEmailAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null :((control.value==this.user.email)?null: {exist:!result}))
        );
      
      }else{
        return null;
      }
      
    };
  }
  
  getErrorMessage(field: string,funct:string):string{
    let message;let name;
    if(field=="email"){
      name="email"
    }else if(field=="telephone"){
      name="el numero"
    }else if(field=="userName"){
      name="el nombre de usuario"
    }
    
      if(this.editUser?.get(field).hasError('pattern')){
        message= name+" no es valido"
      }else if(this.editUser?.get(field).hasError('exist')){
        message=name+"  ya esta en uso"
      }
    
    return message
  }


  
    isValidFieldEdit(field: string):boolean{
      return(
        (this.editUser.get(field).touched || this.editUser.get(field).dirty) &&
         !this.editUser.get(field).valid
      )  }

      openDialogCode(respuesta){
        this.dialog.open(DgPhoneCodeComponent,{
          width: '50%',
          data: { idFinalUser:respuesta.idFinalUser,code:respuesta.code,password:respuesta.password,identifier:2}
          });
      }    

}
