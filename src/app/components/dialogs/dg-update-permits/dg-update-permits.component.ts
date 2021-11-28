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
    selectedPrivilege:any;
  ngOnInit(): void {
    console.log(this.privileges)
    this.loadPrivileges()
  }
  print(ob: MatCheckboxChange){
    console.log(ob)
  }
  loadPrivileges(){
    this.RequestService.get('http://localhost:8080/api/privilege/allPrivileges').subscribe(r=>{
      this.privilegesList=r;
      console.log(this.privilegesList);
      this.privileges.map(p=>{
        this.privilegesList.map(item=>{
          if(p.privilege==item.privilege){
            this.privilegesList.splice(
              this.privilegesList.indexOf(item) ,1
            )
          }
        })
      })
      console.log(this.privilegesList)
      
    })
  }
  onGroupsChange(options: MatListOption[]) {
    this.selectedPrivilege=options.map(o=> o.value);
    console.log(this.selectedPrivilege)
  }
  updatePrivileges(){
    this.RequestService.put('http://localhost:8080/api/role/addPrivileges/'+this.idRole,this.selectedPrivilege).subscribe(
      r=>{
        console.log(r)
      }
    )
  }
}
