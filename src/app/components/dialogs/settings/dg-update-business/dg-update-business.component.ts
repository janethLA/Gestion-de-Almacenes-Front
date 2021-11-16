import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-business',
  templateUrl: './dg-update-business.component.html',
  styleUrls: ['./dg-update-business.component.css']
})
export class DgUpdateBusinessComponent implements OnInit {
  public activateSpinner:boolean;
  dataBusiness:any;
  updateBusiness=this.formBuilder.group({
    
    nameForReport:['',[Validators.required]],
    telephoneForReport:['',[Validators.required]],
    emailForReport:['',[Validators.required]],
    addresForReport:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
  ) { }
    
  ngOnInit(): void {
    this.dataBusiness=this.data
    console.log(this.dataBusiness)
    this.updateBusiness.get('nameForReport').setValue(this.dataBusiness.nameForReport);
    this.updateBusiness.get('telephoneForReport').setValue(this.dataBusiness.telephoneForReport);
    this.updateBusiness.get('emailForReport').setValue(this.dataBusiness.emailForReport);
    this.updateBusiness.get('addresForReport').setValue(this.dataBusiness.addresForReport);
  }
  
  updateBusinessData(data){
   this.activateSpinner=true;
    this.RequestService.put("http://localhost:8080/api/setting/registerParametersForReport",data).subscribe({
      next:()=>{
        this.activateSpinner=false;
        window.location.reload()
      },error:()=>{
      }
    })
  }
}
