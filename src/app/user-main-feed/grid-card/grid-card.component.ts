import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent {
  toggleButtonText: string = 'See More';

  toggleCollapse(): void {
    this.toggleButtonText = this.toggleButtonText === 'See More' ? 'See Less' : 'See More';
  }
}
