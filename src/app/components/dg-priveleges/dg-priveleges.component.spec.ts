import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgPrivelegesComponent } from './dg-priveleges.component';

describe('DgPrivelegesComponent', () => {
  let component: DgPrivelegesComponent;
  let fixture: ComponentFixture<DgPrivelegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgPrivelegesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgPrivelegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
