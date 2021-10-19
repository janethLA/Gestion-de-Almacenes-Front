import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgNewUserComponent } from './dg-new-user.component';

describe('DgNewUserComponent', () => {
  let component: DgNewUserComponent;
  let fixture: ComponentFixture<DgNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgNewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
