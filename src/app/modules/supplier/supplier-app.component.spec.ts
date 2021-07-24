import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAppComponent } from './supplier-app.component';

describe('SupplierAppComponent', () => {
  let component: SupplierAppComponent;
  let fixture: ComponentFixture<SupplierAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
