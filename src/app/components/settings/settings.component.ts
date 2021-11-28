import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { DgUpdateBusinessComponent } from '../dialogs/settings/dg-update-business/dg-update-business.component';
import { DgUpdateDistanceComponent } from '../dialogs/settings/dg-update-distance/dg-update-distance.component';
import { DgUpdateKeymapComponent } from '../dialogs/settings/dg-update-keymap/dg-update-keymap.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  dataConfiguration:any;
  qrData:any;
  sesionInit:boolean;
  mySubscription: Subscription
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDataConfigurations();
    this.loadDataQr()
    this.mySubscription= interval(10000).subscribe((x =>{
      this.loadDataQr();
  }));

  }

  loadDataConfigurations(){
    this.RequestService.get("http://localhost:8080/api/setting/getSetting").subscribe(r=>{
    console.log(r)
    this.dataConfiguration=r
    })
  }
  loadDataQr(){
    this.RequestService.getQr("http://localhost:9000/qr").subscribe(r=>{
      console.log(r)
      if(Object.entries(r).length != 0){
        this.qrData=r
      }else{
        this.sesionInit=true;
        this.mySubscription.unsubscribe()
      }
      
    })
  }
  openUpdateBusiness(){
    this.dialog.open(DgUpdateBusinessComponent,{
      width: '50%',
      data: {nameForReport:this.dataConfiguration.nameForReport,telephoneForReport:this.dataConfiguration.telephoneForReport,
            emailForReport:this.dataConfiguration.emailForReport,addresForReport:this.dataConfiguration.addresForReport }
      });
  }
  openUpdateDistance(){
    this.dialog.open(DgUpdateDistanceComponent,{
      width: '50%',
      data: { distance:this.dataConfiguration.searchDistance}
      });
  }
  openUpdateKey(){
    this.dialog.open(DgUpdateKeymapComponent,{
      width: '50%',
      data: { key:this.dataConfiguration.googleKey}
      });

  }
}
