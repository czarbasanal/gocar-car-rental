import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  types = [
    { name: 'Pickup', count: 10, value: 'pickup' },
    { name: 'SUV', count: 12, value: 'suv' },
    { name: 'MPV', count: 16, value: 'mpv' },
    { name: 'Coupe', count: 1, value: 'coupe' },
    { name: 'Sedan', count: 20, value: 'sedan' },
    { name: 'Crossover', count: 14, value: 'crossover' },
    { name: 'Van', count: 8, value: 'van' },
  ];

  capacities = [
    { name: '2 Person', count: 10, value: '2person' },
    { name: '5 Person', count: 14, value: '5person' },
    { name: '8 Person', count: 16, value: '8person' },
    { name: '18 Person', count: 8, value: '18person' },
  ];
  maxPrice: number = 3000.00;
  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxPrice = Number(input.value);
  }
}
