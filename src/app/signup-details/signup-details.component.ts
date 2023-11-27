import { Component } from '@angular/core';
import { SignupCommunicationService } from '../signup-communication.service';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.css']
})

export class SignupDetailsComponent {
  constructor(private signupCommunicationService: SignupCommunicationService) {}

  onFormSubmit(event: Event) {
    event.preventDefault();
    console.log('Button clicked in SignUpDetailsComponent');
    this.signupCommunicationService.notifyDetailsButtonClick();
  }
}
