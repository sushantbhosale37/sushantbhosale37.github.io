import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { helpComponent } from './help.component';

describe('ForgotPasswordComponent', () => {
  let component: helpComponent;
  let fixture: ComponentFixture<helpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [helpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(helpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
