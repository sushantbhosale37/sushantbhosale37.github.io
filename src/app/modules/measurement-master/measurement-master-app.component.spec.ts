import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementMasterAppComponent } from './measurement-master-app.component';

describe('MeasurementMasterAppComponent', () => {
  let component: MeasurementMasterAppComponent;
  let fixture: ComponentFixture<MeasurementMasterAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementMasterAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementMasterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
