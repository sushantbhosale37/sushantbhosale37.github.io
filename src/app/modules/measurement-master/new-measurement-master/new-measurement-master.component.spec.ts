import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeasurementMasterComponent } from './new-measurement-master.component';

describe('NewMeasurementMasterComponent', () => {
  let component: NewMeasurementMasterComponent;
  let fixture: ComponentFixture<NewMeasurementMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeasurementMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeasurementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
