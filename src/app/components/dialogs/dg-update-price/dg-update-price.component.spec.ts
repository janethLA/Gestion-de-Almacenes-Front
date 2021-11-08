import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdatePriceComponent } from './dg-update-price.component';

describe('DgUpdatePriceComponent', () => {
  let component: DgUpdatePriceComponent;
  let fixture: ComponentFixture<DgUpdatePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdatePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
