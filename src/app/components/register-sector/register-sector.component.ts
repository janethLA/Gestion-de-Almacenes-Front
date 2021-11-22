import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-register-sector',
  templateUrl: './register-sector.component.html',
  styleUrls: ['./register-sector.component.css']
})
export class RegisterSectorComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  private isValidSector:any=/^[a-zA-Z0-9]+$/;
  registerSector= this.formBuilder.group({
    sectorName:['',{
      validators:[Validators.required], 
      asyncValidators:[this.sectorCheck()],
        updateOn: 'blur'
    }],

  });
  ngOnInit(): void {
  }
  saveSector(sector,formDirective: FormGroupDirective){
    console.log("Esta es el sector a Registrar",sector);
    
    this.RequestService.post('http://localhost:8080/api/sector/createSector', sector)
    .subscribe({
      next:()=>{
        console.log('Sector creado exitosamente!!');
        this.snack.open('Sector registrado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        console.log('Ocurrio un error, no se creo la cotizacon.');
        this.snack.open('Fallo al registrar el Sector','CERRAR',{duration:5000})
      }
    });
  }

  sectorCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/sector/uniqueSectorName/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  getErrorMessage(field: string,funct:string):string{
    let message;
    //var valor=this.registerUser?.get(field)    console.log(valor)

    if(funct=='register'){
      if(this.registerSector?.get(field).errors?.required){
        message="Campo nombre de sector es requerido"
      }else if(this.registerSector?.get(field).hasError('pattern')){
        message="nombre de sector no es valido"
      }else if(this.registerSector?.get(field).hasError('exist')){
        message="nombre del sector ya esta en uso"
      }
    }/* else if(funct=='edit'){

      if(this.editUser?.get(field).hasError('pattern')){
        message="nombre de usuario no es valido"
      }else if(this.editUser?.get(field).hasError('exist')){
        message="nombre de usuario ya esta en uso"
      }
    } */
    return message
  }


  isValidField(field: string):boolean{
    return(
      (this.registerSector.get(field).touched || this.registerSector.get(field).dirty) &&
       !this.registerSector.get(field).valid
    )  }

}
