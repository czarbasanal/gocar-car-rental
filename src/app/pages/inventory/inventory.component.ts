import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireStorageService } from 'src/app/shared/fire-storage.service';
import { Observable, map } from 'rxjs';
import { AdminAddCarComponent } from 'src/app/admin-dashboard/admin-add-car/admin-add-car.component';
import { ConfirmationDialogComponent } from 'src/app/admin-dashboard/confirmation-dialog/confirmation-dialog.component';
import { Car } from 'src/app/shared/car.model';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  cars!: Observable<any[]>;
  displayedColumns: string[] = ['imgPath', 'brand', 'model', 'carType', 'rentPrice', 'maxSeats', 'fuelType', 'transType', 'isRented', 'action'];

  constructor(private dialog: MatDialog, private db: AngularFirestore, private fireStorageService: FireStorageService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.cars = this.db.collection('car-inventory').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Car;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addCar() {
    this.dialog.open(AdminAddCarComponent, {
      width: '1036px',

    });
  }

  async deleteCar(car: any) {
    if (!car) return;
    try {
      await this.db.collection('car-inventory').doc(car.id).delete();

      if (car.imgPath) {
        await this.fireStorageService.delete(car.imgPath);
      }
      this.snackBar.open('Car deleted successfully', 'Close', { duration: 2000 });
    } catch (error) {
      console.error('Error deleting car:', error);
      this.snackBar.open('Error deleting car', 'Close', { duration: 2000 });
    }
  }

  openDeleteConfirmation(car: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(car);
      }
    });
  }
}
