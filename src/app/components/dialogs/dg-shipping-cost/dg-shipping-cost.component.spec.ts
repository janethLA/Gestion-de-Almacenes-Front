import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgShippingCostComponent } from './dg-shipping-cost.component';

describe('DgShippingCostComponent', () => {
  let component: DgShippingCostComponent;
  let fixture: ComponentFixture<DgShippingCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgShippingCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgShippingCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
