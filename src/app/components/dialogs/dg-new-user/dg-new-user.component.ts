import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-new-user',
  templateUrl: './dg-new-user.component.html',
  styleUrls: ['./dg-new-user.component.css']
})
export class DgNewUserComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private RequestService:RequestService,
    private snack:MatSnackBar,
  ) { }

  createUser=this.formBuilder.group({
    finalUserName:['',Validators.required],
    telephone:['',Validators.required],
  })
  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(['/login/']);
  }
  saveUserFinal(user,formDirective: FormGroupDirective){
    this.RequestService.post('http://localhost:8080/api/finalUser/createFinalUser',user).subscribe({
      next:()=>{
        this.snack.open('Usuario creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
       window.location.reload();
      
      },
      error:()=>{
        this.snack.open('Fallo al registrar el usuario','CERRAR',{duration:5000});
        
      }
    })
  }
}
