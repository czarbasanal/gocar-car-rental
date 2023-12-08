import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent implements OnInit {
  cars: Car[] = [];
  showSeeMoreButton: boolean = false;
  toggleButtonText: string = 'Show More Cars';
  isCollapsed: boolean = true;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.db.collection<Car>('car-inventory').valueChanges({ idField: 'id' })
      .subscribe(carData => {
        this.cars = carData;
        this.showSeeMoreButton = carData.length > 6;
      });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleButtonText = this.isCollapsed ? 'Show More Cars' : 'Show Less Cars';
  }
}
