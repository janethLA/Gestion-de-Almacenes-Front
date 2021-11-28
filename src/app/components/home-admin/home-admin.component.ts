import { Component, OnInit,Inject,ViewChild,ElementRef } from '@angular/core';

import { RegisterRoleComponent } from '../register-role/register-role.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { MatTableDataSource } from '@angular/material/table';
import {RequestService} from '../../services/request.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DgPrivelegesComponent } from 'src/app/components/dg-priveleges/dg-priveleges.component';
import { RegisterSectorComponent } from '../register-sector/register-sector.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DgUpdatePermitsComponent } from '../dialogs/dg-update-permits/dg-update-permits.component';


export interface User{
  idUser: number;
  name: string;
  email:string;
  registrationDate:string;
  privileges: {};
  role:string;
  spendingUnit:string;
}
export interface Role{
  idRole:number;
  privilegios:{};
  roleName:string;
}


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(public dialog: MatDialog, private RequestService: RequestService,private snack:MatSnackBar,) { }
  units:any;
  rolesResponse:any;
  usersResponse:any;
  users:User[]=[];
  idUser:any;
  userName:any;
  privilegios:any;
  displayedColumns: string[] = ['index', 'name', 'email','role','telephone','actions'];
  dataSource =  new MatTableDataSource<User>([]);
  columnas=[
    {titulo:"NOMBRE" ,name: "name"},
    {titulo:"CORREO" ,name: "email"},
    {titulo:"ROL" ,name: "role"},
    {titulo:"TELEFONO" ,name: "telephone"},

  ];
  roles:Role[]=[];

  displayedColumnsRole: string[] = ['index', 'roleName','description','privileges','edit'];
  dataSourceRole =  new MatTableDataSource<Role>([]);
  columnasRole=[
    {titulo:"NOMBRE ROL" ,name: "roleName"},
    {titulo:"DESCRIPCIÓN" ,name: "description"},
  ];

  ngOnInit(): void {
    this.loadUnits();
    this.loadUsers();
    this.loadRoles();
    
  }

  loadUnits(){
    this.RequestService.get('http://localhost:8080/api/sector/allSector').subscribe(r=>{
      this.units=r;
      console.log("Sectores ",this.units)
    })
  }
  loadUsers(){
    this.RequestService.get('http://localhost:8080/api/user/allUser').subscribe(r=>{
      this.usersResponse=r;
      this.users=this.usersResponse;
      this.dataSource.data=this.users;
      console.log("USERS ",this.users)
    })
  }

  loadRoles(){
    this.RequestService.get('http://localhost:8080/api/role/allRoles').subscribe(r=>{
      this.rolesResponse=r;
      this.roles=this.rolesResponse;
      this.dataSourceRole.data=this.roles;
      console.log("ROLES ",this.roles)
    })
  }

  openRegisterSector(){
    this.dialog.open(RegisterSectorComponent);
  }


 
  openRegisterRole(){
    this.dialog.open(RegisterRoleComponent);
  }
  openRegisterUser(){
    this.dialog.open(RegisterUserComponent,{
      width: '50%',
      data:{
        unitList:this.units,
        roleList:this.roles,
        user:null,
        transform:'register',
      }
    });
  }
  openEditUser(user){
    this.dialog.open(RegisterUserComponent,{
      width: '50%',
      data:{
        unitList:this.units,
        roleList:this.roles,
        user:user,
        transform:'edit',
      }
    });
  }

  deleteUser(idUser){
    console.log(idUser)
    this.RequestService.delete('http://localhost:8080/api/user/deleteUser/'+idUser)
    .subscribe({
      error:()=>{
        this.snack.open('Usuario eliminado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      /* error:()=>{
        this.snack.open('Fallo al eliminar el usuario','CERRAR',{duration:5000})
      } */
    });
  }
  openPriveleges(priv){
    this.dialog.open(DgPrivelegesComponent,{
      data:{
        privileges:priv
      }
    })
  }
  editPermits(privilege,idRole){
    this.dialog.open(DgUpdatePermitsComponent,{
      width: '50%',
      height:'100%',
      data:{
        privileges:privilege,idRole:idRole
      }
    })
  }
}
