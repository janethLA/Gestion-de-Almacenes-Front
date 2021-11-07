import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgCreatePaymentComponent } from './dg-create-payment.component';

describe('DgCreatePaymentComponent', () => {
  let component: DgCreatePaymentComponent;
  let fixture: ComponentFixture<DgCreatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgCreatePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgCreatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
