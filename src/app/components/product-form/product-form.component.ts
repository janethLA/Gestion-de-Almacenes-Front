import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() allCategories:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
  ) { }

  dataFile:any;
  fileName = '';
  formData = new FormData();
  filteredOptions: Observable<string[]>;

  productForm= this.formBuilder.group({
    productName:['',[Validators.required]],
    description:['',[Validators.required]],
    price:['',[Validators.required]],
    measurement:['',[Validators.required]],
    quantity:['',[Validators.required]],
    idCategory:['',[Validators.required]],
    file:['',[Validators.required]],
    expirationDate:['',[]],
    
  });
  measurements:any/* =[
    {value:"Kilogramo",name:"Kilogramo(Kg)"},
    {value:"Gramo",name:"Gramo(g)"},
    {value:"Metro",name:"Metro(m)"},
    {value:"Litro",name:"Litro(l)"},
    {value:"Mililitro",name:"Mililitro(ml)"},
    {value:"Unidad",name:"Unidad(u)"},
    {value:"Docena",name:"Docena"},
    ] */
  ngOnInit(): void {
    this.allCategories=this.data.allCategories;
    this.loadMeasurements();
  }

  loadMeasurements(){
    this.RequestService.get('http://localhost:8080/api/product/allMeasurement/')
    .subscribe(r=>{
      console.log(r);
      this.measurements = r;
      this.filteredOptions = this.productForm.get("measurement").valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );
    })
  }
  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.measurements.filter(measurement => measurement.toLowerCase().includes(filterValue));
  }

  saveProduct(product,formDirective: FormGroupDirective){
    this.RequestService.post('http://localhost:8080/api/product/createProduct/'+this.productForm.get('idCategory').value,this.formData).subscribe({
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

  onFileSelected(event) {
    const file:File = event.target.files[0];
    //console.log(file, event);
    if (file) {
      this.fileName = file.name;
      const formD = new FormData();
      formD.append("file", file);
      this.productForm.get('file').setValue(file)
      //console.log(this.productForm.get('productName').value)
       formD.append("productName",this.productForm.get('productName').value)
      formD.append("description",this.productForm.get('description').value)
      formD.append("expirationDate",this.productForm.get('expirationDate').value)
      formD.append("price",this.productForm.get('price').value)
      formD.append("measurement",this.productForm.get('measurement').value)
      formD.append("idCategory",this.productForm.get('idCategory').value) 
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
