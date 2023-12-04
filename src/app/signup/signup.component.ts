import { Component, OnInit  } from '@angular/core';
import { SignupCommunicationService } from '../signup-communication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  showDetails = true;

  constructor(private router: Router, private signupCommunicationService: SignupCommunicationService) {}

  ngOnInit() {
    this.signupCommunicationService.detailsButtonClick$.subscribe(() => {
      this.toggleDetails();
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
