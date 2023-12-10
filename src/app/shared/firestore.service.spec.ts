import { TestBed } from '@angular/core/testing';

import { UserService } from './firestore.service';

describe('FirestoreService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
