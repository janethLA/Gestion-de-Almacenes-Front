import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-show-stores',
  templateUrl: './show-stores.component.html',
  styleUrls: ['./show-stores.component.css']
})
export class ShowStoresComponent implements OnInit {

  warehousesReceived:any;
  constructor(
    private RequestService:RequestService,
  ) { }

  ngOnInit(): void {
    this.loadDataWarehouse();
  }
  loadDataWarehouse(){
     this.RequestService.get('http://localhost:8080/api/market/allWarehouse/')
     .subscribe(r=>{
       console.log(r);
       this.warehousesReceived = r;
     })
   }
   cols$ = this.subscribeToResize();

  private subscribeToResize(): Observable<number> {
    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        map((e: Event) => this.checkWidth(e.target as Window)),
        distinctUntilChanged(),
        map(isLaptop => isLaptop ? 1 : 2)
      );
  }

  private checkWidth(e: Window): boolean {
    return e.innerWidth <= 1600;
  }
}
