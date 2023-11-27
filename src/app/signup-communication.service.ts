import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupCommunicationService {
  private detailsButtonClickSubject = new Subject<void>();

  detailsButtonClick$ = this.detailsButtonClickSubject.asObservable();

  notifyDetailsButtonClick() {
    this.detailsButtonClickSubject.next();
  }
}
