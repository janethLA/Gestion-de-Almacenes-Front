import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgAddReceiptComponent } from './dg-add-receipt.component';

describe('DgAddReceiptComponent', () => {
  let component: DgAddReceiptComponent;
  let fixture: ComponentFixture<DgAddReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgAddReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgAddReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
