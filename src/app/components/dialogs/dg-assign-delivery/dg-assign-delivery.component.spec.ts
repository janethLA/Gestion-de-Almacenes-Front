import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgAssignDeliveryComponent } from './dg-assign-delivery.component';

describe('DgAssignDeliveryComponent', () => {
  let component: DgAssignDeliveryComponent;
  let fixture: ComponentFixture<DgAssignDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgAssignDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgAssignDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
