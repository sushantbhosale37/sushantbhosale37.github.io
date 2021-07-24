import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCakeShapeMasterComponent } from './new-cake-shape-master.component';

describe('NewCakeShapeMasterComponent', () => {
  let component: NewCakeShapeMasterComponent;
  let fixture: ComponentFixture<NewCakeShapeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCakeShapeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCakeShapeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
