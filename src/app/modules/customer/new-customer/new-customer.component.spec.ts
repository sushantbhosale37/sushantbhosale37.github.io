import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerComponent } from './new-customer.component';

describe('DailyDataComponent', () => {
  let component: NewCustomerComponent;
  let fixture: ComponentFixture<NewCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCustomerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
