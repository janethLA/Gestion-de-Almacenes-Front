import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsContentComponent } from './payments-content.component';

describe('PaymentsContentComponent', () => {
  let component: PaymentsContentComponent;
  let fixture: ComponentFixture<PaymentsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
