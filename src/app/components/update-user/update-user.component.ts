import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { DgUpdateUserComponent } from '../dialogs/dg-update-user/dg-update-user.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userData:any
  user:any;
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.loadDataUser();
  }
  loadData(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadDataUser(){
    this.RequestService.get('http://localhost:8080/api/finalUser/userFinalData/'+this.user.idUser)
     .subscribe(r=>{
       this.userData = r;
     })
  }
  openDialogUpdate(){
    this.dialog.open(DgUpdateUserComponent,{
      width: '50%',
      data: { user:this.userData}
      });
  }
}
