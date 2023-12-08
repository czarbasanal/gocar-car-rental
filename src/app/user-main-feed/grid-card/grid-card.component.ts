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

  updateDisplayedCars(): void {
    this.displayedCars = this.isCollapsed ? this.cars.slice(0, 6) : this.cars;
  }

  goToCarRental() {
    this.router.navigate(['/car-rental']);
  }

}
