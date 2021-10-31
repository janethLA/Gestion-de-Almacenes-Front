import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfOrdersComponent } from './report-of-orders.component';

describe('ReportOfOrdersComponent', () => {
  let component: ReportOfOrdersComponent;
  let fixture: ComponentFixture<ReportOfOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
