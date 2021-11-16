import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-distance',
  templateUrl: './dg-update-distance.component.html',
  styleUrls: ['./dg-update-distance.component.css']
})
export class DgUpdateDistanceComponent implements OnInit {
  public activateSpinner:boolean;
  dataDistance:any;
  update=this.formBuilder.group({
    
    distance:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
  ) { }
    
  ngOnInit(): void {
    this.dataDistance=this.data
    this.update.get('distance').setValue(this.dataDistance.distance)
  }
  
  updateDistance(data){
   this.activateSpinner=true;
    this.RequestService.put("http://localhost:8080/api/setting/registerSearchDistance",data).subscribe({
      next:()=>{
        this.activateSpinner=false;
        window.location.reload()
      },error:()=>{
      }
    })
  }
}
