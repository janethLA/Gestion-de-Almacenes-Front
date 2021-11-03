import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgFillEmergencyComponent } from './dg-fill-emergency.component';

describe('DgFillEmergencyComponent', () => {
  let component: DgFillEmergencyComponent;
  let fixture: ComponentFixture<DgFillEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgFillEmergencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgFillEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
