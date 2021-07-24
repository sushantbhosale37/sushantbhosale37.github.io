import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusFormComponent } from './update-status-form.component';

describe('UpdateStatusFormComponent', () => {
  let component: UpdateStatusFormComponent;
  let fixture: ComponentFixture<UpdateStatusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStatusFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
