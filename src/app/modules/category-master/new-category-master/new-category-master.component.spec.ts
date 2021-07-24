import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryMasterComponent } from './new-category-master.component';

describe('NewCategoryMasterComponent', () => {
  let component: NewCategoryMasterComponent;
  let fixture: ComponentFixture<NewCategoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCategoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
