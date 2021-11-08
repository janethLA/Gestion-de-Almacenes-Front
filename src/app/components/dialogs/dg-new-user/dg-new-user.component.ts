import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

import { DgPhoneCodeComponent} from '../dg-phone-code/dg-phone-code.component';
/* import { Injectable } from "@angular/core";
    import { Twilio } from "twilio"; */

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
  private isValidEmail:any=/\S+@\S+\.\S/;
  createUser=this.formBuilder.group({
    finalUserName:['',Validators.required],
    userName:['',],
    email:['',{
      validators:[Validators.pattern(this.isValidEmail)],
      asyncValidators:[this.emailCheck()],
      updateOn: 'blur'
    }],
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheck()],
      updateOn: 'blur'
    }],
  })
  
  code:any;
  activateSpinner:boolean;
  finalUser:any;
  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(['/login/']);
  }
  saveUserFinal(user,formDirective: FormGroupDirective){
    user.userName=this.generateUserName(user.finalUserName)
    //console.log(user)
    this.finalUser=user;
    this.activateSpinner=true
    this.RequestService.post('http://localhost:8080/api/finalUser/createFinalUser',user).subscribe({
      
       next:(respuesta:any)=>{
        console.log(respuesta)
        this.activateSpinner=false;
        this.code=respuesta.code;
        this.sendMessage(this.code)
        //this.snack.open('Usuario creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        //this.sendSMS()
        this.openDialogCodeValidate(respuesta.idFinalUser,respuesta.code,user.telephone,user)
        this.dialogRef.close();
       //window.location.reload();
      
      },
      error:()=>{
        this.snack.open('Fallo al registrar el usuario','CERRAR',{duration:5000});
        
      } 
    })
  }
  sendMessage(code){
    var message={message:"*Verifica tu número*, tu codigo de verificacion es:"+code,number:"591"+this.finalUser.telephone}
    console.log(message)
    this.RequestService.post("http://localhost:9000/send",message).subscribe(r=>{
      console.log(r)
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
      if(this.createUser?.get(field).errors.required){
        message="Campo celular es requerido"
      }else if(this.createUser?.get(field).hasError('pattern')){
        message="El numero de celular no es valido"
      }else if(this.createUser?.get(field).hasError('exist')){
        message="este numero ya esta registrado"
      }
    }
    return message
  }
  emailCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/finalUser/uniqueEmail/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  telephoneCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
   
  getErrorMessage(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.createUser?.get(field).errors?.required){
        message="el campo email es requerido"
      }else if(this.createUser?.get(field).hasError('pattern')){
        message="ingrese un email valido"
      }else if(this.createUser?.get(field).hasError('exist')){
        message="el email ya esta registrado"
      }
    }
    return message
  }
  
  
  isValidField(field: string):boolean{
    return(
      (this.createUser.get(field).touched || this.createUser.get(field).dirty) &&
       !this.createUser.get(field).valid
    )  }

    openDialogCodeValidate(idFinalUser,code,telephone,user) {
      this.dialog.open(DgPhoneCodeComponent,{
      width: '50%',
      data: { idFinalUser:idFinalUser,code:code,telephone:telephone,user:user }
      });
    }

    /* sendSMS(){
      // getting ready
      const twilioNumber = '+16627676661';
      const accountSid = 'ACa89c84148e594b27b0e35f07303a843f';
      const authToken = '97c6bfe39c2434be989cf90a3eb999cd';

      const client = new Twilio(accountSid, authToken);

      
          const phoneNumbers = [ '+59165735953']    

          phoneNumbers.map(phoneNumber => {
              console.log(phoneNumber);
              
              
              const textContent = {
                  body: `Tu codigo de verificacion es `+this.code+` username es`,
                  to: phoneNumber,
                  from: twilioNumber
              }
          
              client.messages.create(textContent)
              .then((message) => console.log(message.to))
          })
      

  }
 */}
