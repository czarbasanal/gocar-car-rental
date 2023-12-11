import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private auth: AuthService, private signupCommunicationService: SignupCommunicationService, private snackBar: MatSnackBar) { }

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
      this.snackBar.open('Please enter your email.', 'Close', { duration: 2000 });
      return;
    }

    if (this.userDetailsWithFile.userDetails.password == '') {
      this.snackBar.open('Please enter your password.', 'Close', { duration: 2000 });
      return;
    }

    if (this.confirmPassword == '') {
      this.snackBar.open('Please confirm your password.', 'Close', { duration: 2000 });
      return;
    }

    if (this.userDetailsWithFile.userDetails.password !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 2000 });
      return;
    }

    this.auth.register(this.userDetailsWithFile.userDetails, this.userDetailsWithFile.file);
    this.userDetailsWithFile == null;
  }
}
