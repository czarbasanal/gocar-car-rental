import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router , private auth: AuthService, private snackBar: MatSnackBar) { }

  backToLogin() {
    this.router.navigate(['login']);
  }

  sendEmail() {

    if (this.email == '') {
      this.snackBar.open('Please enter your email.', 'Close', { duration: 2000 });
      return;
    }

    this.auth.forgotPassword(this.email);
  }
}
