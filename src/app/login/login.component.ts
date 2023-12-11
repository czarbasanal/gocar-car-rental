import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {

    if (this.email == '') {
      this.snackBar.open('Please enter your email.', 'Close', { duration: 2000 });
      return;
    }

    if (this.password == '') {
      this.snackBar.open('Please enter your password.', 'Close', { duration: 2000 });
      return;
    }


    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';

  }

  

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
  goToLanding() {
    this.router.navigate(['landing-page']);
  }
}