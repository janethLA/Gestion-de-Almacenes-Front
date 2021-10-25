import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import {RequestService} from '../../../services/request.service'

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
  private isValidUserName:any=/^[a-zA-Z0-9]+$/;
  editUser = this.formBuilder.group({
    finalUserName:['',[]],
    telephone:['',[]],
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
      this.editUser.get('finalUserName').setValue(this.user?.finalUserName);
      //this.editUser.controls['password'].setValue(this.user?.password);
      this.editUser.controls['userName'].setValue(this.user?.userName);
      this.editUser.controls['telephone'].setValue(this.user?.telephone);

  }

  saveEdit(update,formDirective: FormGroupDirective){

    //console.log(this.user)
    this.RequestService.put('http://localhost:8080/api/finalUser/updateDataUser/'+this.user?.idFinalUser, update)
    .subscribe({
      next:()=>{
        this.snack.open('Usuario actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
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
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }

  
  getErrorMessage(field: string,funct:string):string{
    let message;
    //var valor=this.registerUser?.get(field)    console.log(valor)

      if(this.editUser?.get(field).hasError('pattern')){
        message="nombre de usuario no es valido"
      }else if(this.editUser?.get(field).hasError('exist')){
        message="nombre de usuario ya esta en uso"
      }
    
    return message
  }


  
    isValidFieldEdit(field: string):boolean{
      return(
        (this.editUser.get(field).touched || this.editUser.get(field).dirty) &&
         !this.editUser.get(field).valid
      )  }

}
