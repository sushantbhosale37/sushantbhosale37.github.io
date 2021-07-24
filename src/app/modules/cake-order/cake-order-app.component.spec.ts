import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeOrderAppComponent } from './cake-order-app.component';

describe('CprComponent', () => {
  let component: CakeOrderAppComponent;
  let fixture: ComponentFixture<CakeOrderAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CakeOrderAppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeOrderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
