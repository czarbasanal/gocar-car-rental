import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainFeedComponent } from './user-main-feed.component';

describe('UserMainFeedComponent', () => {
  let component: UserMainFeedComponent;
  let fixture: ComponentFixture<UserMainFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMainFeedComponent]
    });
    fixture = TestBed.createComponent(UserMainFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
