import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-permits',
  templateUrl: './dg-update-permits.component.html',
  styleUrls: ['./dg-update-permits.component.css']
})
export class DgUpdatePermitsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DgUpdatePermitsComponent>,
    private dialog:MatDialog,
    private RequestService:RequestService,
    private snack:MatSnackBar,
  ) { }
    privileges=this.data.privileges
    idRole=this.data.idRole
    privilegesList:any;
    selectedPrivilege:any[]=[];
    permitsBuyer:any[]=[];
    selectedPermitBuyer:any[]=[];
    allSelectedPrivilege:any[]=[];
  ngOnInit(): void {
    this.loadPrivileges()
  }
  loadPrivileges(){
    this.RequestService.get('http://localhost:8080/api/privilege/allPrivileges').subscribe(r=>{
      this.privilegesList=r;
      this.privileges.map(p=>{
        
        this.privilegesList.map(item=>{
          
          if(p.privilege==item.privilege){
            this.privilegesList.splice(
              this.privilegesList.indexOf(item) ,1
            )
          }
        })
      })
      this.privilegesList.map(priv=>{
        if(priv.privilege=="actualizar imagen"||priv.privilege=="actualizar precios"){
          this.permitsBuyer.push(priv.privilege)
        }
       
      })
      if(this.permitsBuyer.length!=0){
        this.permitsBuyer.map(p=>{
          this.privilegesList.splice(
            this.privilegesList.indexOf(p) ,1
          )
        })
      }
      
    })
  }
  onGroupsChange(options: MatListOption[]) {
    this.selectedPrivilege=options.map(o=> o.value);
  }
  onPermitsChange(options: MatListOption[]) {
    if(options[0]){
      this.selectedPermitBuyer=options[0].value;
    }else{
      this.selectedPermitBuyer=[]
    }
  }
  updatePrivileges(){
      this.allSelectedPrivilege=[...this.selectedPrivilege,...this.selectedPermitBuyer]
   
     this.RequestService.put('http://localhost:8080/api/role/addPrivileges/'+this.idRole,this.allSelectedPrivilege).subscribe(
      {next:()=>{

      },error:()=>{
        this.snack.open('privilegios actualizados.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      }
       
      }
    ) 
  }
}
