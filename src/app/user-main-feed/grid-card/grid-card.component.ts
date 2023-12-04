import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent {
  toggleButtonText: string = 'Show More Cars';

  toggleCollapse(): void {
    this.toggleButtonText = this.toggleButtonText === 'Show More Cars' ? 'Show Less Cars' : 'Show More Cars';
  }
}
