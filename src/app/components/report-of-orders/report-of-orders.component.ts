import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { Canvas, ITable, Item, PdfMakeWrapper, Rect, Table, Txt } from 'pdfmake-wrapper';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

type TableRow=[any,any,any,any,any,any,any,any]

@Component({
  selector: 'app-report-of-orders',
  templateUrl: './report-of-orders.component.html',
  styleUrls: ['./report-of-orders.component.css']
})
export class ReportOfOrdersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'status', 'name', 'telephone','quantityProducts','delivery','shippingCost','totalPrice','hourOfOrder','dateOfOrder'];
  dataSource: MatTableDataSource<any>;
  allOrders:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delivery= new FormControl();
  status= new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  constructor(
    private RequestService:RequestService,
  ) {
    
   }
   filteredValues = { id:'', status:'',name:'',telephone:'',quantityProducts:'',delivery:'',shippingCost:'',totalPrice:'',hourOfOrder:'',dateOfOrder:''};
  ngOnInit(): void {
    
    
  }

  ngAfterViewInit() {
    this.loadReportData();
    this.listenFilters();
    
  }
  /* applyFilter(filterValue: string) {
    let filter = {
      delivery: filterValue.trim().toLowerCase(),
      position: filterValue.trim().toLowerCase(),
      topFilter: true
    }
    this.dataSource.filter = JSON.stringify(filter)
  } */
  listenFilters(){
    this.delivery.valueChanges.subscribe((deliveryFilterValue)=> {
      this.filteredValues.delivery = deliveryFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
  
      this.status.valueChanges.subscribe((statusFilterValue) => {
        this.filteredValues.status = statusFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
        
      });
  
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
  customFilterPredicate() {
    const myFilterPredicate = function(data:any,filter:string) :boolean {
      let searchString = JSON.parse(filter);
      let deliveryFound = data.delivery.toString().trim().toLowerCase().indexOf(searchString.delivery.toLowerCase()) !== -1
      let statusFound = data.status.toString().trim().indexOf(searchString.status) !== -1
      
          return deliveryFound && statusFound 
      
    }
    return myFilterPredicate;
  }
  loadReportData(){
    this.RequestService.get('http://localhost:8080/api/report/reportOfOrders ')
    .subscribe(r=>{
      this.allOrders = r;
      console.log(this.allOrders)
      this.dataSource = new MatTableDataSource(this.allOrders);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }
  async printReport(){
        const pdf=new PdfMakeWrapper();
        pdf.pageMargins([0,20,0,0])
        pdf.pageSize('A4')
        pdf.defaultStyle({
          fontSize:11,
          //font:'roboto'
        })
       
          pdf.add(new Txt('SISTEMA DE GESTION DE ALMACENES').margin([20,0]).bold().fontSize(13).end);
          pdf.add(new Txt('HELPSYSTEM').margin([20,0]).bold().fontSize(13).end);
          pdf.add(new Txt('Teléfono: 4444444 ; 444444').margin([20,0]).fontSize(10).end);
          pdf.add(new Txt('Cochabamba - Bolivia').margin([20,0]).fontSize(10).end);

          pdf.add(new Txt('REPORTE DE PEDIDOS').bold().alignment('center').fontSize(13).end);
          pdf.add(new Txt('Moneda (Bs)').bold().alignment('center').fontSize(12).end);
          pdf.add(pdf.ln(1));
          pdf.add(new Txt('Busqueda por filtro: '+"-----"+this.dataSource.filter+"-----"+'............................................\
          Fecha: ............./............./............./').margin([20,10]).end);
          pdf.add(new Txt('los pedidos que se detallan a continuacion son de proposito informativo')
            .margin([30,0]).fontSize(9).end);
          if(this.dataSource.filteredData==[]){
            pdf.add(this.createTable(this.dataSource.data))
          }else{
            pdf.add(this.createTable(this.dataSource.filteredData))
          }
           pdf.create().open();
        
    }

    //   


    createTable(data: Item[]):ITable{
      [{}]
        return new Table([
        [ 'ID', 'ESTADO','NOMBRE','TELEFONO','N° DE PRODUCTOS','TOTAL','HORA','FECHA'],
        ...this.extractData(data),
      ]).margin([20,10]).alignment('center').fontSize(10).layout({hLineColor:(rowIndex:number,node:any,columnIndex:number)=>{
              return  '#c2c2c2';
      },vLineColor:((rowIndex:number,node:any,columnIndex:number)=>{
          return  '#c2c2c2';
      }),fillColor:((rowIndex:number,node:any,columnIndex:number)=>{
          return  rowIndex===0?'#c2c2c2':'';
      })
      }).end;
    }
  
    extractData(data:any[]):TableRow[]{
        var index=1
        return data.map(row=>[row.idOrder,row.status,row.userName,row.telephone,row.quantityProducts,row.totalPrice,row.hourOfOrder,row.dateOfOrder])
    } 

    

}

