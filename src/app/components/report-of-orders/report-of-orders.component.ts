import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';



@Component({
  selector: 'app-report-of-orders',
  templateUrl: './report-of-orders.component.html',
  styleUrls: ['./report-of-orders.component.css']
})
export class ReportOfOrdersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'status', 'name', 'telephone','quantityProducts','totalPrice','hourOfOrder','dateOfOrder'];
  dataSource: MatTableDataSource<any>;
  allOrders:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor(
    private RequestService:RequestService,
  ) {
    
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.loadReportData();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}

