import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UserDetails } from '../shared/user-details.model';
import { SignupCommunicationService } from '../signup-communication.service';

@Component({
  selector: 'app-signup-details-2',
  templateUrl: './signup-details-2.component.html',
  styleUrls: ['./signup-details-2.component.css']
})
export class SignupDetails2Component implements OnInit {

  confirmPassword: string = '';
  userDetails!: UserDetails;

  constructor(private auth: AuthService, private signupCommunicationService: SignupCommunicationService) { 
  }

  ngOnInit(): void {
    this.signupCommunicationService.detailsButtonClick$.subscribe(
      (userDetails: UserDetails) => {
        this.userDetails = userDetails;
      }
    );
  }

  register() {
    if (this.userDetails.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.userDetails.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.confirmPassword == '') {
      alert('Please confirm your password');
      return;
    }

    if (this.userDetails.password !== this.confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    this.auth.register(this.userDetails);

    this.userDetails == null;
  }
}