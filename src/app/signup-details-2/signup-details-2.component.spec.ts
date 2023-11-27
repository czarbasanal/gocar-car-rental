import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDetails2Component } from './signup-details-2.component';

describe('SignupDetails2Component', () => {
  let component: SignupDetails2Component;
  let fixture: ComponentFixture<SignupDetails2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupDetails2Component]
    });
    fixture = TestBed.createComponent(SignupDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
