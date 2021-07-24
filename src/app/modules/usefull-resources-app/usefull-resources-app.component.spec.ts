import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefullResourcesAppComponent } from './usefull-resources-app.component';

describe('UsefullResourcesAppComponent', () => {
  let component: UsefullResourcesAppComponent;
  let fixture: ComponentFixture<UsefullResourcesAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefullResourcesAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefullResourcesAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
