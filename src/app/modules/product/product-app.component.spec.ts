import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAppComponent } from './product-app.component';

describe('ProductAppComponent', () => {
  let component: ProductAppComponent;
  let fixture: ComponentFixture<ProductAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
