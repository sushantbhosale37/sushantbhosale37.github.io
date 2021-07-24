import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeShapeMasterAppComponent } from './cake-shape-master-app.component';

describe('CakeShapeMasterAppComponent', () => {
  let component: CakeShapeMasterAppComponent;
  let fixture: ComponentFixture<CakeShapeMasterAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeShapeMasterAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeShapeMasterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
