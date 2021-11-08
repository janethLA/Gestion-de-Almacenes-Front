import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgViewPaymentComponent } from './dg-view-payment.component';

describe('DgViewPaymentComponent', () => {
  let component: DgViewPaymentComponent;
  let fixture: ComponentFixture<DgViewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgViewPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgViewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
