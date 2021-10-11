import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreContentComponent } from './store-content.component';

describe('StoreContentComponent', () => {
  let component: StoreContentComponent;
  let fixture: ComponentFixture<StoreContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
