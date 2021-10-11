import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSectorComponent } from './register-sector.component';

describe('RegisterSectorComponent', () => {
  let component: RegisterSectorComponent;
  let fixture: ComponentFixture<RegisterSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
