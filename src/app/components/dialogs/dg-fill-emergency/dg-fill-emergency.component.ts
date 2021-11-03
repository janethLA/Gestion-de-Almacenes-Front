import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-fill-emergency',
  templateUrl: './dg-fill-emergency.component.html',
  styleUrls: ['./dg-fill-emergency.component.css']
})
export class DgFillEmergencyComponent implements OnInit {
  activateSpinner:boolean;
  emergency=this.formBuilder.group({
    
    commentary:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  sendEmergency(emergency){
    this.RequestService.put("http://localhost:8080/api/orderAssigned/reportEmergency/"+this.data.idOrderAssigned,emergency.commentary).subscribe({
      next:()=>{
        this.snack.open('Emergencia enviada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
      },
      error:()=>{
        this.snack.open('Emergencia enviada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();

      }
    })
  }

}
