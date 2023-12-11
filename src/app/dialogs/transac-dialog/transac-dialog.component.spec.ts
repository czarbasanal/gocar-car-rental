import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacDialogComponent } from './transac-dialog.component';

describe('TransacDialogComponent', () => {
  let component: TransacDialogComponent;
  let fixture: ComponentFixture<TransacDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransacDialogComponent]
    });
    fixture = TestBed.createComponent(TransacDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
