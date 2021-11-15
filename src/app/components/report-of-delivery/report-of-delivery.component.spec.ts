import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfDeliveryComponent } from './report-of-delivery.component';

describe('ReportOfDeliveryComponent', () => {
  let component: ReportOfDeliveryComponent;
  let fixture: ComponentFixture<ReportOfDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
