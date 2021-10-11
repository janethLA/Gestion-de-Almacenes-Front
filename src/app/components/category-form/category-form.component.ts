import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() idStore:number

  constructor(
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
  ) { }

  categoryForm= this.formBuilder.group({
    categoryName:['',[Validators.required]],
    description:['',[Validators.required]]
  });
  ngOnInit(): void {
    
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
}
