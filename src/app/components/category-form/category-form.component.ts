import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() idStore:number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
  ) { }
  private isValidCategory:any=/^[a-zA-Z0-9]+$/;
  categoryForm= this.formBuilder.group({
    categoryName:['',{
      validators:[Validators.pattern(this.isValidCategory)], 
      asyncValidators:[this.categoryCheck()],
        updateOn: 'blur'
    }],
    description:['',[Validators.required]]
  });
  ngOnInit(): void {
    this.idStore=this.data.idStore
  }

  saveCategory(category,formDirective: FormGroupDirective){
    this.RequestService.post('http://localhost:8080/api/category/createCategory/'+this.idStore,category).subscribe({
      next:()=>{
        this.snack.open('Categoria registrada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
       window.location.reload();
       /* console.log(category)
       console.log('http://localhost:8080/api/category/createCategory/'+this.idStore)
     */
      },
      error:()=>{
        this.snack.open('Fallo al registrar la categoria','CERRAR',{duration:5000});
        
      }
    })
  }
  
  categoryCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      const formData = new FormData();
      //formData.append("idWarehouse", this.idStore);
      return this.RequestService.get2('http://localhost:8080/api/category/uniqueCategoryName/'+control.value,formData)
        /* .pipe(
          map((result) => (result) ?  null : {exist:!result})
        ); */
      
    };
  }
  getErrorMessage(field: string,funct:string):string{
    let message;
    //var valor=this.registerUser?.get(field)    console.log(valor)

    if(funct=='register'){
      if(this.categoryForm?.get(field).errors?.required){
        message="Campo nombre de categoria es requerido"
      }else if(this.categoryForm?.get(field).hasError('pattern')){
        message="nombre de categoria no es valido"
      }else if(this.categoryForm?.get(field).hasError('exist')){
        message="nombre de categoria ya esta en uso"
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
      (this.categoryForm.get(field).touched || this.categoryForm.get(field).dirty) &&
       !this.categoryForm.get(field).valid
    )  }

}
