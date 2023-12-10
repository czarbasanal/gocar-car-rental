import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { SignupCommunicationService, UserDetailsWithFile } from 'src/app/shared/signup-communication.service';

@Component({
  selector: 'app-signup-details-2',
  templateUrl: './signup-details-2.component.html',
  styleUrls: ['./signup-details-2.component.css']
})
export class SignupDetails2Component implements OnInit, OnDestroy {
  confirmPassword: string = '';
  userDetailsWithFile!: UserDetailsWithFile;
  private detailsButtonClickSubscription!: Subscription;

  constructor(private auth: AuthService, private signupCommunicationService: SignupCommunicationService) { }

  ngOnInit(): void {
    this.detailsButtonClickSubscription = this.signupCommunicationService.detailsButtonClick$.subscribe(
      (userDetailsWithFile: UserDetailsWithFile) => {
        this.userDetailsWithFile = userDetailsWithFile;
      }
    );
  }

  ngOnDestroy(): void {
    this.detailsButtonClickSubscription.unsubscribe();
  }

  register() {
    if (this.userDetailsWithFile.userDetails.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.userDetailsWithFile.userDetails.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.confirmPassword == '') {
      alert('Please confirm your password');
      return;
    }

    if (this.userDetailsWithFile.userDetails.password !== this.confirmPassword) {
      alert("Password did not match.");
      return;
    }

    this.auth.register(this.userDetailsWithFile.userDetails, this.userDetailsWithFile.file);
    this.userDetailsWithFile == null;
  }
}
