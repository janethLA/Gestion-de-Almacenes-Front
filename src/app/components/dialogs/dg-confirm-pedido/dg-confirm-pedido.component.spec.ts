import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgConfirmPedidoComponent } from './dg-confirm-pedido.component';

describe('DgConfirmPedidoComponent', () => {
  let component: DgConfirmPedidoComponent;
  let fixture: ComponentFixture<DgConfirmPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgConfirmPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgConfirmPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
