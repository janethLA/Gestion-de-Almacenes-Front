import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-report-of-delivery',
  templateUrl: './report-of-delivery.component.html',
  styleUrls: ['./report-of-delivery.component.css']
})
export class ReportOfDeliveryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'statusOfOrderAssigned','delivery','shippingCost','dateOfOrderAssigned','receiptNumber','paymentDate'];
  dataSource: MatTableDataSource<any>;
  allOrders:any;
  user:any;
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
  constructor(
    private RequestService:RequestService,
  ) {
    
   }
   ngOnInit(): void {
     this.loadDataUser();
    this.searchFormInit();
    this.loadDataDelivery();
    
  }
  
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadDataDelivery(){
    this.RequestService.get('http://localhost:8080/api/orderAssigned/allOrdersCompletedForReport/'+this.user.idUser)
    .subscribe(r=>{
      this.allOrders = r;
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
      let columnDateOfOrder = row.dateOfOrderAssigned;
      const columnStatus = row.statusOfOrderAssigned;
      const columnDelivery = row.delivery === null ? '' : row.delivery;;
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

  getTotalCost() {
    if(this.totalShippingCost==0){
      return this.dataSource?.data.map(t => t.shippingCost).reduce((acc, value) => acc + value, 0);
    }else{
      return this.totalShippingCost;
    }
    
  }
}
