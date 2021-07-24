import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAppComponent } from './purchase-app.component';

describe('PurchaseAppComponent', () => {
  let component: PurchaseAppComponent;
  let fixture: ComponentFixture<PurchaseAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
