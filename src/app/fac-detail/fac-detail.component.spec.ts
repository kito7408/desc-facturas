import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacDetailComponent } from './fac-detail.component';

describe('FacDetailComponent', () => {
  let component: FacDetailComponent;
  let fixture: ComponentFixture<FacDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
