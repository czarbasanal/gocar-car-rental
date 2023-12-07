import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AdminAddCarComponent } from 'src/app/admin-dashboard/admin-add-car/admin-add-car.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  cars!: Observable<any[]>;
  displayedColumns: string[] = ['brand', 'model', 'carType', 'rentPrice', 'maxSeats', 'fuelType', 'transType'];

  constructor(private dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cars = this.firestore.collection('car-inventory').valueChanges();
  }

  addCar() {
    this.dialog.open(AdminAddCarComponent, {
      width: '1036px',

    });
  }
}
