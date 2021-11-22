import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators,FormGroupDirective} from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar
  ) { }
  privilegeSelected=new FormControl();
  private isValidRole:any=/^[a-zA-Z0-9]+$/;
  registerRole= this.formBuilder.group({
    roleName:['',{
      validators:[Validators.required], 
      asyncValidators:[this.roleCheck()],
        updateOn: 'blur'
    }],
    description:['',[Validators.required]],
    privileges:['',[Validators.required]]
  });

  facultieSelected="none"
  typeUnit:string;
  privilegesList:any;
  privilegesRAF:any[]=[];
  privilegesRUG:any[]=[];
  //privilegesRUG:string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  checked = false;
  ngOnInit(): void {
    this.loadPrivileges();
    

  }
  printType(e){
    console.log(e,this.typeUnit);
  }
  print(e){
    console.log(e);
    console.log('formControl asasdas',this.privilegeSelected);
  }
  loadPrivileges(){
    this.RequestService.get('http://localhost:8080/api/privilege/allPrivileges').subscribe(r=>{
      this.privilegesList=r;
      console.log(this.privilegesList);
      //this.filterPrivileges();
    })
  }

  filterPrivileges(){
    for (let priv in this.privilegesList){
      if(this.privilegesList[priv].identifier == '2'){
        this.privilegesRUG.push(this.privilegesList[priv]);
      }else if(this.privilegesList[priv].identifier == '3'){
        this.privilegesRAF.push(this.privilegesList[priv]);
      } 
    }
    console.log('RAF __>',this.privilegesRAF);
    console.log('RUG __>',this.privilegesRUG)
  }
  ss(role,formDirective: FormGroupDirective){
    console.log("ROLE REGISTRADO >>>>>>>>>>",role)
  }
  saveRole(role,formDirective: FormGroupDirective){
    this.RequestService.post('http://localhost:8080/api/role/createRole',role).subscribe({
      next:()=>{
        this.snack.open('Rol registrada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
        console.log('exito registrar role');
    
      },
      error:()=>{
        this.snack.open('Fallo al registrar el Rol','CERRAR',{duration:5000});
        console.log('error registrar role');
      }
    })
  }
  roleCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/role/uniqueRoleName/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  getErrorMessage(field: string,funct:string):string{
    let message;
    //var valor=this.registerUser?.get(field)    console.log(valor)

    if(funct=='register'){
      if(this.registerRole?.get(field).errors?.required){
        message="Campo nombre de rol es requerido"
      }else if(this.registerRole?.get(field).hasError('pattern')){
        message="nombre de rol no es valido"
      }else if(this.registerRole?.get(field).hasError('exist')){
        message="nombre de rol ya esta en uso"
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
      (this.registerRole.get(field).touched || this.registerRole.get(field).dirty) &&
       !this.registerRole.get(field).valid
    )  }

}
