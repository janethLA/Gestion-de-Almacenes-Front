import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-keymap',
  templateUrl: './dg-update-keymap.component.html',
  styleUrls: ['./dg-update-keymap.component.css']
})
export class DgUpdateKeymapComponent implements OnInit {
  public activateSpinner:boolean;
  dataKey:any;
  update=this.formBuilder.group({
    
    key:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
  ) { }
    
  ngOnInit(): void {
    this.dataKey=this.data
    this.update.get('key').setValue(this.dataKey.key)
  }
  
  updateKey(data){
   this.activateSpinner=true;
    this.RequestService.put("http://localhost:8080/api/setting/registerGoogleMapsKey",data).subscribe({
      next:()=>{
        this.activateSpinner=false;
        window.location.reload()
      },error:()=>{
      }
    })
  }
}
