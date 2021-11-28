import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { Canvas, ITable, Item, PdfMakeWrapper, Rect, Table, Txt } from 'pdfmake-wrapper';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

type TableRow=[any,any,any,any,any,any,any,any,any,any]

@Component({
  selector: 'app-report-of-orders',
  templateUrl: './report-of-orders.component.html',
  styleUrls: ['./report-of-orders.component.css'],
  providers: [DatePipe]
})
export class ReportOfOrdersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'status', 'name', 'telephone','quantityProducts','delivery','shippingCost','totalPrice','hourOfOrder','dateOfOrder'];
  dataSource: MatTableDataSource<any>;
  allOrders:any;
  configurations:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  public searchForm: FormGroup;
  public status = '';
  public delivery = '';
  public dateOfOrder = '';
  totalShippingCost=0;
  totalPrice=0;
  findData:boolean;
  constructor(
    private RequestService:RequestService,
    private datePipe: DatePipe
  ) {
    
   }
   ngOnInit(): void {
    this.searchFormInit();
    this.loadReportData();
    this.loadConfigurations();
    
  }

  ngAfterViewInit() {
    
    
  }
  loadConfigurations(){
    this.RequestService.get('http://localhost:8080/api/setting/getSetting')
    .subscribe(r=>{
      this.configurations = r;
    })
  }
  loadReportData(){
    this.RequestService.get('http://localhost:8080/api/report/reportOfOrders ')
    .subscribe(r=>{
      this.allOrders = r;
      console.log(this.allOrders)
      this.dataSource = new MatTableDataSource(this.allOrders);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    /* Filter predicate used for filtering table per different columns
    *  */
    this.dataSource.filterPredicate = this.getFilterPredicate();
    })
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      delivery: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      dateOfOrderStart: new FormControl(''),
      dateOfOrderEnd: new FormControl('')
    });
  }
  /* this method well be called for each row in table  */
  getFilterPredicate() {
    return (row: any, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const dateOfOrderStart = filterArray[0];
      const dateEnd=this.searchForm.get('dateOfOrderEnd').value;
      const dateOfOrderEnd = (dateEnd === null || dateEnd === '') ? '' : dateEnd.toISOString().split('T')[0];
      const status = filterArray[1];
      const delivery = filterArray[2];
      const matchFilter = [];

      // Fetch data from row
      let columnDateOfOrder = row.dateOfOrder;
      const columnStatus = row.status;
      const columnDelivery = row.delivery === null ? '' : row.delivery;
      //var parts =columnDateOfOrder.split('-');
      //columnDateOfOrder = new Date(parts[0], parts[1] - 1, parts[2]); 
      // verify fetching data by our searching values
      var customFilterDD;
      if(dateOfOrderEnd=== ''){
        customFilterDD = columnDateOfOrder?.includes(dateOfOrderStart);
        
      }else{
        
        if(columnDateOfOrder>= dateOfOrderStart && columnDateOfOrder<= dateOfOrderEnd){
          customFilterDD=true;
        }else{
          customFilterDD=false;
        }
      }
      
      const customFilterDS = columnStatus?.toLowerCase().includes(status);
      const customFilterAS = columnDelivery?.toLowerCase().includes(delivery);

      // push boolean values into array
      matchFilter.push(customFilterDD);
      matchFilter.push(customFilterDS);
      matchFilter.push(customFilterAS);
      if(matchFilter.every(Boolean)){
        this.totalShippingCost+=row.shippingCost;
        this.totalPrice+=row.totalPrice;
        this.findData=true;
      }
      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    this.totalShippingCost=0;
    this.totalPrice=0;
    this.findData=false;
    const date = this.searchForm.get('dateOfOrderStart').value;
    const as = this.searchForm.get('status').value;
    const ds = this.searchForm.get('delivery').value;
    this.dateOfOrder = (date === null || date === '') ? '' : date.toISOString().split('T')[0];
    this.status = as === null ? '' : as;
    this.delivery = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue = this.dateOfOrder + '$' + this.status + '$' + this.delivery;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /* getTotalCost(field:string) {
    if(this.totalShippingCost==0 && this.totalPrice==0){
      return this.dataSource?.data.map(t => t[field]).reduce((acc, value) => acc + value, 0);
    }else{
      if(field=='shippingCost'){
        return this.totalShippingCost
      }else{
        return this.totalPrice;
      }
      
    }
    
  } */
  getTotalCost(field:string) {
    if(this.totalShippingCost==0 && this.totalPrice==0){
      if(this.findData==undefined ){
        return this.dataSource?.data.map(t => t[field]).reduce((acc, value) => acc + value, 0);
      }else if(this.findData==false){
        if(field=='shippingCost'){
          return this.totalShippingCost=0
        }else{
          return this.totalPrice=0;
        }
      }else if(this.findData){
        if(field=='shippingCost'){
          return this.totalShippingCost
        }else{
          return this.totalPrice;
        }
      }
      
    }else{
      if(field=='shippingCost'){
        return this.totalShippingCost
      }else{
        return this.totalPrice;
      }
      
    }
    
  }
  async printReport(){
    let myDate = new Date();
    let myActualDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
        const pdf=new PdfMakeWrapper();
        pdf.pageMargins([0,20,0,0])
        pdf.pageSize('A4')
        pdf.pageOrientation('landscape')
        pdf.defaultStyle({
          fontSize:11,
          //font:'roboto'
        })
       
          pdf.add(new Txt('SISTEMA DE GESTION DE ALMACENES').margin([20,0]).bold().fontSize(13).end);
          pdf.add(new Txt(this.configurations.nameForReport).margin([20,0]).bold().fontSize(13).end);
          pdf.add(new Txt('Teléfono: '+this.configurations.telephoneForReport).margin([20,0]).fontSize(10).end);
          pdf.add(new Txt('Email: '+this.configurations.emailForReport).margin([20,0]).fontSize(10).end);
          pdf.add(new Txt('Dirección: '+this.configurations.addresForReport).margin([20,0]).fontSize(10).end);

          pdf.add(new Txt('REPORTE DE PEDIDOS').bold().alignment('center').fontSize(13).end);
          pdf.add(new Txt('Moneda (Bs)').bold().alignment('center').fontSize(12).end);
          pdf.add(pdf.ln(1));
          pdf.add(new Txt('Busqueda por filtro: '+"-----"+this.dataSource.filter+"-----").margin([20,10]).end);
          pdf.add(new Txt('Fecha: '+ myActualDate).margin([20,10]).relativePosition(550,-32).end);
          pdf.add(new Txt('los pedidos que se detallan a continuacion son de proposito informativo')
            .margin([20,10]).fontSize(10).end);
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
      var foot=['Totales','','','','','',this.getTotalCost('shippingCost'),this.getTotalCost('totalPrice'),'','']
        return new Table([
        [ 'ID', 'ESTADO','NOMBRE USUARIO','TELEFONO','N° DE PRODUCTOS','DELIVERY','COSTO DE ENVIO','TOTAL','HORA','FECHA'],
        ...this.extractData(data),foot,
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
        return data.map(row=>[row.idOrder,row.status,row.userName,row.telephone,row.quantityProducts,row.delivery,row.shippingCost,row.totalPrice,row.hourOfOrder,row.dateOfOrder])
    } 

    

}

