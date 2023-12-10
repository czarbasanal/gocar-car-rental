import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserDetails } from './user-details.model';

export type UserDetailsWithFile = {
  userDetails: UserDetails;
  file: File;
}

@Injectable({
  providedIn: 'root',
})

export class SignupCommunicationService {
  private detailsButtonClickSubject = new ReplaySubject<UserDetailsWithFile>(1);

  detailsButtonClick$ = this.detailsButtonClickSubject.asObservable();

  notifyDetailsButtonClick(userDetailsWithFile: UserDetailsWithFile) {
    this.detailsButtonClickSubject.next(userDetailsWithFile);
  }
}
