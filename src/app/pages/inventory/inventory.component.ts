import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireStorageService } from 'src/app/shared/fire-storage.service';
import { ConfirmationDialogComponent } from 'src/app/admin-dashboard/confirmation-dialog/confirmation-dialog.component';
import { AdminAddCarComponent } from 'src/app/admin-dashboard/admin-add-car/admin-add-car.component';
import { Car } from 'src/app/shared/car.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Car>([]);
  carIds: Map<Car, string> = new Map();
  displayedColumns: string[] = ['imgPath', 'brand', 'model', 'carType', 'rentPrice', 'maxSeats', 'fuelType', 'transType', 'isRented', 'return', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private db: AngularFirestore, private fireStorageService: FireStorageService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchCars();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchCars() {
    this.db.collection<Car>('car-inventory').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Car;
        const id = a.payload.doc.id;
        this.carIds.set(data, id);
        return { id, ...data };
      }))
    ).subscribe(carData => {
      this.dataSource = new MatTableDataSource<Car>(carData);
      this.dataSource.paginator = this.paginator;
    });
  }

  addCar() {
    this.dialog.open(AdminAddCarComponent, {
      width: '1036px',
    });
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

  returnCar(car: Car) {
    const carId = this.carIds.get(car);
    if (carId) {
      this.db.collection('car-inventory').doc(carId).update({ isRented: false })
        .then(() => {
          car.isRented = false;
          this.snackBar.open('Car returned successfully', 'Close', { duration: 2000 });
        })
        .catch(error => {
          console.error('Error returning car:', error);
          this.snackBar.open('Error returning car', 'Close', { duration: 2000 });
        });
    }
  }
}
