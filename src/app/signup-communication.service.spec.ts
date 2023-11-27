import { TestBed } from '@angular/core/testing';

import { SignupCommunicationService } from './signup-communication.service';

describe('SignupCommunicationService', () => {
  let service: SignupCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
