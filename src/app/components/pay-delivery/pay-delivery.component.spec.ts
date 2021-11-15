import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDeliveryComponent } from './pay-delivery.component';

describe('PayDeliveryComponent', () => {
  let component: PayDeliveryComponent;
  let fixture: ComponentFixture<PayDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
