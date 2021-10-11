import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dg-priveleges',
  templateUrl: './dg-priveleges.component.html',
  styleUrls: ['./dg-priveleges.component.css']
})
export class DgPrivelegesComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,) { }

  
    privileges:any;
    ngOnInit(): void {
      this.privileges=this.data.privileges;
      console.log(this.privileges);
    }
  

}
