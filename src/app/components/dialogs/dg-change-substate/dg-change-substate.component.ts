import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-change-substate',
  templateUrl: './dg-change-substate.component.html',
  styleUrls: ['./dg-change-substate.component.css']
})
export class DgChangeSubstateComponent implements OnInit {
  activateSpinner:boolean;
  idOrder:any;
  status:string;
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  substates:string[]=[];
  substateSelect:string;
  constructor(
    private RequestService:RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.idOrder=this.data.idOrder;
    this.status=this.data.status;
    if(this.status=="En curso"){
      this.substates=['pagado']
    }else if(this.status=="Enviando"){
      this.substates=['pagado','pagado al delivery']
    }
  }
  changeSubstate(){
    this.RequestService.put('http://localhost:8080/api/order/changeSubstate/'+this.idOrder,this.substateSelect).subscribe({
      next:()=>{

      },error:()=>{
        window.location.reload();
      }
    })
  }

}
