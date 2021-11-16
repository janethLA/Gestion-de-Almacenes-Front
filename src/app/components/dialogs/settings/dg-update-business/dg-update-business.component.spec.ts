import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdateBusinessComponent } from './dg-update-business.component';

describe('DgUpdateBusinessComponent', () => {
  let component: DgUpdateBusinessComponent;
  let fixture: ComponentFixture<DgUpdateBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdateBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdateBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
