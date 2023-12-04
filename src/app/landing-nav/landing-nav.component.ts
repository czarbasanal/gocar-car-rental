import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css']
})
export class LandingNavComponent {
  constructor(private router: Router) {
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
