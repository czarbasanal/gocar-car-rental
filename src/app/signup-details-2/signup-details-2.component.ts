import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup-details-2',
  templateUrl: './signup-details-2.component.html',
  styleUrls: ['./signup-details-2.component.css']
})
export class SignupDetails2Component implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';
  }

}