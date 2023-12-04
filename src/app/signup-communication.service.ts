import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserDetails } from './shared/user-details.model';

@Injectable({
  providedIn: 'root',
})

export class SignupCommunicationService {
  private detailsButtonClickSubject = new ReplaySubject<UserDetails>(1);

  detailsButtonClick$ = this.detailsButtonClickSubject.asObservable();

  notifyDetailsButtonClick(userDetails: UserDetails) {
    this.detailsButtonClickSubject.next(userDetails);
  }
}
