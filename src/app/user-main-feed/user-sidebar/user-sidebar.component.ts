import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  types = [
    { name: 'Pickup', count: 0, value: 'Pickup', isChecked: false },
    { name: 'SUV', count: 0, value: 'SUV', isChecked: false },
    { name: 'Coupe', count: 0, value: 'Coupe', isChecked: false },
    { name: 'Sedan', count: 0, value: 'Sedan', isChecked: false },
    { name: 'Crossover', count: 0, value: 'Crossover', isChecked: false },
    { name: 'Van', count: 0, value: 'Van', isChecked: false },
    { name: 'MPV', count: 0, value: 'MPV', isChecked: false },
  ];

  capacities = [
    { name: '2 Person', count: 0, value: 2, isChecked: false },
    { name: '5 Person', count: 0, value: 5, isChecked: false },
    { name: '8 Person', count: 0, value: 8, isChecked: false },
    { name: '18 Person', count: 0, value: 18, isChecked: false },
  ];
  maxPrice: number = 3000.00;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.fetchCarData();
  }

  fetchCarData() {
    this.db.collection<any>('car-inventory').valueChanges()
      .subscribe(cars => {
        this.calculateCounts(cars);
      });
  }

  calculateCounts(cars: any[]) {
    this.types.forEach(type => type.count = 0);
    this.capacities.forEach(capacity => capacity.count = 0);

    cars.forEach(car => {
      this.types.forEach(type => {
        if (car.carType.toLowerCase() === type.value.toLowerCase()) {
          type.count++;
        }
      });

      this.capacities.forEach(capacity => {
        const seatCount = parseInt(capacity.name.split(' ')[0]);
        if (car.maxSeats === seatCount) {
          capacity.count++;
        }
      });
    });
  }

  @Output() filterChanged = new EventEmitter<{ types: Set<string>, capacities: Set<number> }>();

  onCheckboxChange() {
    const selectedTypes = new Set(this.types.filter(t => t.isChecked).map(t => t.value));
    const selectedCapacities = new Set(this.capacities.filter(c => c.isChecked).map(c => Number(c.value)));

    this.filterChanged.emit({ types: selectedTypes, capacities: selectedCapacities });
  }
  @Output() maxPriceChanged = new EventEmitter<number>();

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxPrice = Number(input.value);
    this.maxPriceChanged.emit(this.maxPrice); // Emit the current max price
  }

}
