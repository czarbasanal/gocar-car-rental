import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent {
  toggleButtonText: string = 'Show More Cars';

  constructor(private router: Router) { }

  toggleCollapse(): void {
    this.toggleButtonText = this.toggleButtonText === 'Show More Cars' ? 'Show Less Cars' : 'Show More Cars';
  }

  goToCarRental() {
    this.router.navigate(['/car-rental']);
  }
}
