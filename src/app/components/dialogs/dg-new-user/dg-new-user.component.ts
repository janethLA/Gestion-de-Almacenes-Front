import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

import { DgPhoneCodeComponent} from '../dg-phone-code/dg-phone-code.component';

@Component({
  selector: 'app-dg-new-user',
  templateUrl: './dg-new-user.component.html',
  styleUrls: ['./dg-new-user.component.css']
})
export class DgNewUserComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DgNewUserComponent>,
    private formBuilder:FormBuilder,
    private router: Router,
    private RequestService:RequestService,
    private snack:MatSnackBar,
    public dialog: MatDialog,
  ) { }
  private isValidNumber="([6-7]{1})([0-9]{7})"
  createUser=this.formBuilder.group({
    finalUserName:['',Validators.required],
    userName:['',],
    telephone:['',[Validators.required,Validators.pattern(this.isValidNumber)]],
  })
  
  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(['/login/']);
  }
  saveUserFinal(user,formDirective: FormGroupDirective){
    user.userName=this.generateUserName(user.finalUserName)
    //console.log(user)
    
    this.RequestService.post('http://localhost:8080/api/finalUser/createFinalUser',user).subscribe({
      
       next:(respuesta:any)=>{
        console.log(respuesta)
        //this.snack.open('Usuario creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        this.openDialogCodeValidate(respuesta.idFinalUser,respuesta.code,user.telephone)
        this.dialogRef.close();
       //window.location.reload();
      
      },
      error:()=>{
        this.snack.open('Fallo al registrar el usuario','CERRAR',{duration:5000});
        
      } 
    })
  }
  generateUserName(nameUser){
    //nameUser="Fernando Arana"
    var word=""
    var listWords=[]
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    var userName="";
    for(let  i=0;i<nameUser.length+1;i++){
        var letter=nameUser.charAt(i)
        if(letter!=" "){
          word+=letter
          if(i==nameUser.length){
            listWords.push(word)
          }
        }else{
          listWords.push(word)
          word="";
        }
    }
    listWords.map(w=>{
    userName+=w.slice(0,3)
    
  })
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  userName+=result.slice(0,3)
  return userName;
  }

  getErrorMessageNumber(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.createUser.get(field).errors.required){
        message="Campo celular es requerido"
      }else if(this.createUser.get(field).hasError('pattern')){
        message="El numero de celular no es valido"
      }
    }else if(funct=='edit'){
      if(this.createUser.get(field).hasError('pattern')){
        message="El numero de celular no es valido"
      }
    }
    return message
  }
  isValidField(field: string):boolean{
    return(
      (this.createUser.get(field).touched || this.createUser.get(field).dirty) &&
       !this.createUser.get(field).valid
    )  }

    openDialogCodeValidate(idFinalUser,code,telephone) {
      this.dialog.open(DgPhoneCodeComponent,{
      width: '50%',
      data: { idFinalUser:idFinalUser,code:code,telephone:telephone }
      });
    }
}
