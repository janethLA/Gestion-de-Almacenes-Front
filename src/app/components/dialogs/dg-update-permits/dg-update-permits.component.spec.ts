import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdatePermitsComponent } from './dg-update-permits.component';

describe('DgUpdatePermitsComponent', () => {
  let component: DgUpdatePermitsComponent;
  let fixture: ComponentFixture<DgUpdatePermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdatePermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdatePermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
