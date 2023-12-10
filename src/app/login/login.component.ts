import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';

  }

  //myEmail: string = 'anthonygwapopacamarra@gmail.com';
  //myEmail: string = 'czarbasanal@gmail.com';
  //myEmail: string = 'mexldelvertuba@gmail.com';
  myEmail: string = 'aithaneulysse.gimenez.21@usjr.edu.ph';


  forgotPassword() {
    this.auth.forgotPassword(this.myEmail);
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
  goToLanding() {
    this.router.navigate(['landing-page']);
  }
}