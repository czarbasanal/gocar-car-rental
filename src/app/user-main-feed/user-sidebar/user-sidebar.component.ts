import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  types = [
    { name: 'Pickup', count: 0, value: 'Picup' },
    { name: 'SUV', count: 0, value: 'SUV' },
    { name: 'Coupe', count: 0, value: 'Coupe' },
    { name: 'Sedan', count: 0, value: 'Sedan' },
    { name: 'Crossover', count: 0, value: 'Crossover' },
    { name: 'Van', count: 0, value: 'Van' },
    { name: 'MPV', count: 0, value: 'MPV' },
  ];

  capacities = [
    { name: '2 Person', count: 0, value: '2person' },
    { name: '5 Person', count: 0, value: '5person' },
    { name: '8 Person', count: 0, value: '8person' },
    { name: '18 Person', count: 0, value: '18person' },
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

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxPrice = Number(input.value);
  }
}
