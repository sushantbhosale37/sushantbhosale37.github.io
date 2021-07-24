import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMasterAppComponent } from './category-master-app.component';

describe('CategoryMasterAppComponent', () => {
  let component: CategoryMasterAppComponent;
  let fixture: ComponentFixture<CategoryMasterAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMasterAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMasterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
