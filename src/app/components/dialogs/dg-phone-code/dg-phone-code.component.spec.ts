import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgPhoneCodeComponent } from './dg-phone-code.component';

describe('DgPhoneCodeComponent', () => {
  let component: DgPhoneCodeComponent;
  let fixture: ComponentFixture<DgPhoneCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgPhoneCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgPhoneCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
