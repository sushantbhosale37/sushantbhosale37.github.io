import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppComponent } from './sales-app.component';

describe('CprComponent', () => {
  let component: SalesAppComponent;
  let fixture: ComponentFixture<SalesAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesAppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
