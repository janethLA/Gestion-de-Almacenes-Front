import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdateKeymapComponent } from './dg-update-keymap.component';

describe('DgUpdateKeymapComponent', () => {
  let component: DgUpdateKeymapComponent;
  let fixture: ComponentFixture<DgUpdateKeymapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdateKeymapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdateKeymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
