import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgChangeSubstateComponent } from './dg-change-substate.component';

describe('DgChangeSubstateComponent', () => {
  let component: DgChangeSubstateComponent;
  let fixture: ComponentFixture<DgChangeSubstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgChangeSubstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgChangeSubstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
