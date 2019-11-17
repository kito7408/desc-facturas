import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcDescuentoComponent } from './calc-descuento.component';

describe('CalcDescuentoComponent', () => {
  let component: CalcDescuentoComponent;
  let fixture: ComponentFixture<CalcDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
