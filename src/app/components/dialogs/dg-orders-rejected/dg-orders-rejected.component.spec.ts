import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgOrdersRejectedComponent } from './dg-orders-rejected.component';

describe('DgOrdersRejectedComponent', () => {
  let component: DgOrdersRejectedComponent;
  let fixture: ComponentFixture<DgOrdersRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgOrdersRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgOrdersRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
