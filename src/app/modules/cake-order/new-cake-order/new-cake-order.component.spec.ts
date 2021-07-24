import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCakeOrderComponent } from './new-cake-order.component';

describe('DailyDataComponent', () => {
  let component: NewCakeOrderComponent;
  let fixture: ComponentFixture<NewCakeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCakeOrderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
