import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdateDistanceComponent } from './dg-update-distance.component';

describe('DgUpdateDistanceComponent', () => {
  let component: DgUpdateDistanceComponent;
  let fixture: ComponentFixture<DgUpdateDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdateDistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdateDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
