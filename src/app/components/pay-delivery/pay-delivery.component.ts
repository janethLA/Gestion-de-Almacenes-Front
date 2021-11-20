import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DgAddReceiptComponent } from '../dialogs/dg-add-receipt/dg-add-receipt.component';
@Component({
  selector: 'app-pay-delivery',
  templateUrl: './pay-delivery.component.html',
  styleUrls: ['./pay-delivery.component.css']
})
export class PayDeliveryComponent implements OnInit {
  displayedColumns: string[] = ['select','id', 'status','paymentStatusToDelivery', 'delivery','deliveryCost','dateOfOrderAssigned','actions'];
  displayedColumnsBuyer: string[] = ['select','id', 'status','paymentStatusToBuyer', 'buyerName','buyerCost','dateOfOrderAssigned','actions'];
  displayedColumnsCollect: string[] = ['select','id', 'status','substateOfOrder', 'deliveryName','shippingCost','totalPrice','dateOfOrderAssigned','actions'];
  dataSource: MatTableDataSource<any>;
  dataSourceBuyer: MatTableDataSource<any>;
  dataSourceCollect: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  allOrders:any;
  selectedRow:boolean;
  allOrdersBuyer:any;
  allCollectsDelivery:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public searchForm: FormGroup;
  public searchFormBuyer: FormGroup;
  public searchFormCollect: FormGroup;
  public status = '';
  public delivery = '';
  public dateOfOrder = '';
  public buyer='';
  public totalShippingCost=0;
  public totalShippingCostCollect=0;
  public totalPriceCollect=0;
  public totalBuyerCost=0;
  
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.searchFormInit();
    this.loadDeliveryData();
    this.loadBuyerData();
    this.loadCollectData();
  }
  loadDeliveryData(){
    this.RequestService.get('http://localhost:8080/api/order/allOrdersCompletedForPay')
    .subscribe(r=>{
      this.allOrders = r;
      console.log(this.allOrders)
      this.dataSource = new MatTableDataSource(this.allOrders);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.getFilterPredicate();
    })
  }
  loadBuyerData(){
    this.RequestService.get('http://localhost:8080/api/order/allOrdersCompletedForPayToBuyer')
    .subscribe(r=>{
      this.allOrdersBuyer = r;
      console.log(this.allOrdersBuyer)
      this.dataSourceBuyer = new MatTableDataSource(this.allOrdersBuyer);
      this.dataSourceBuyer.paginator = this.paginator;
    this.dataSourceBuyer.sort = this.sort;
    //this.dataSourceBuyer.filterPredicate = this.getFilterPredicate();
    })
  }
  loadCollectData(){
    this.RequestService.get('http://localhost:8080/api/order/allOrdersToCollectDelivery')
    .subscribe(r=>{
      this.allCollectsDelivery = r;
      console.log(this.allCollectsDelivery)
      this.dataSourceCollect = new MatTableDataSource(this.allCollectsDelivery);
      this.dataSourceCollect.paginator = this.paginator;
    this.dataSourceCollect.sort = this.sort;
    //this.dataSourceBuyer.filterPredicate = this.getFilterPredicate();
    })
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      delivery: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      dateOfOrderStart: new FormControl(''),
      dateOfOrderEnd: new FormControl('')
    });
    this.searchFormBuyer = new FormGroup({
      status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      buyer: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      dateOfOrderStartBuyer: new FormControl(''),
      dateOfOrderEndBuyer: new FormControl('')
    });
    this.searchFormCollect = new FormGroup({
      status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      delivery: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      dateOfOrderStartCollect: new FormControl(''),
      dateOfOrderEndCollect: new FormControl('')
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
      let columnDateOfOrder = row.dateOfOrderAssigned;
      const columnStatus = row.status;
      const columnDelivery = row.delivery;
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
      }
      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    this.totalShippingCost=0;
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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log(this.selection)
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getTotalCost() {
    if(this.totalShippingCost==0){
      return this.dataSource?.data.map(t => t.deliveryCost).reduce((acc, value) => acc + value, 0);
    }else{
      return this.totalShippingCost;
    }
    
  }
  getTotalCostBuyer() {
    if(this.totalBuyerCost==0){
      return this.dataSourceBuyer?.data.map(t => t.buyerCost).reduce((acc, value) => acc + value, 0);
    }else{
      return this.totalBuyerCost;
    }
    
  }
  getTotalCostCollect(field:string) {
    if(this.totalShippingCostCollect==0 && this.totalPriceCollect==0){
      return this.dataSourceCollect?.data.map(t => t[field]).reduce((acc, value) => acc + value, 0);
    }else{
      if(field=='shippingCost'){
        return this.totalShippingCostCollect
      }else{
        return this.totalPriceCollect;
      }
      
    }
    
  }
  openAddReceipt(name:string){
    this.dialog.open(DgAddReceiptComponent,{
        width: '60%',
        data: { dataSelected:this.selection.selected,name:name}
        });
    } 
    
}
