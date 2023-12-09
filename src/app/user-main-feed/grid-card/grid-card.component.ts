import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent implements OnInit {
  cars: Car[] = [];
  displayedCars: Car[] = [];
  showSeeMoreButton: boolean = false;
  toggleButtonText: string = 'Show More Cars';
  maxPrice: number = Infinity;

  filterCriteria = {
    types: new Set<string>(),
    capacities: new Set<number>(),
  };

  constructor(private router: Router, private db: AngularFirestore) { }
  isCollapsed: boolean = true;

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.db.collection<Car>('car-inventory').valueChanges({ idField: 'id' })
      .subscribe(carData => {
        this.cars = carData;
        this.showSeeMoreButton = carData.length > 6;
        this.updateDisplayedCars();
      });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleButtonText = this.isCollapsed ? 'Show More Cars' : 'Show Less Cars';
    this.updateDisplayedCars();
  }

  setFilterCriteria(types: Set<string>, capacities: Set<number>): void {
    this.filterCriteria.types = types;
    this.filterCriteria.capacities = capacities;
    this.updateDisplayedCars();
  }
  setMaxPrice(price: number): void {
    this.maxPrice = price;
    this.updateDisplayedCars();
  }
  updateDisplayedCars(): void {
    let filteredCars = this.cars;

    if (this.filterCriteria.types.size > 0) {
      filteredCars = filteredCars.filter(car => this.filterCriteria.types.has(car.carType));
    }

    if (this.filterCriteria.capacities.size > 0) {
      filteredCars = filteredCars.filter(car => this.filterCriteria.capacities.has(car.maxSeats));
    }

    filteredCars = filteredCars.filter(car => car.rentPrice <= this.maxPrice);

    this.displayedCars = this.isCollapsed ? filteredCars.slice(0, 6) : filteredCars;
  }



  goToCarRental() {
    this.router.navigate(['/car-rental']);
  }

}
