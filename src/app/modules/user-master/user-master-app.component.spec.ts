import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterAppComponent } from './user-master-app.component';

describe('UserMasterAppComponent', () => {
  let component: UserMasterAppComponent;
  let fixture: ComponentFixture<UserMasterAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMasterAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMasterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
