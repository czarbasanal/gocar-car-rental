import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { SignupCommunicationService } from '../shared/signup-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showDetails = true;
  isLoading = false;
  constructor(
    private router: Router,
    private signupCommunicationService: SignupCommunicationService,
    private authService: AuthService  // Inject AuthService
  ) { }

  ngOnInit() {
    this.signupCommunicationService.detailsButtonClick$.subscribe(() => {
      this.toggleDetails();
    });

    this.authService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });

    this.resetComponentState();
  }

  private resetComponentState() {
    this.showDetails = true;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  goBackToLogin() {
    if (this.showDetails) {
      this.router.navigate(['/login']);
    } else {
      this.toggleDetails();
    }
  }
}
