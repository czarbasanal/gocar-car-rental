import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireStorageService } from 'src/app/shared/fire-storage.service';
import { Car } from 'src/app/shared/car.model';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.css']
})
export class AdminAddCarComponent {

  car: Car = {
    brand: '',
    model: '',
    carType: '',
    rentPrice: 0,
    maxSeats: 2,
    fuelType: '',
    transType: '',
    imgPath: '',
    isRented: false,
  };

  constructor(private db: AngularFirestore, private fireStorageService: FireStorageService, private snackBar: MatSnackBar) { }
  @ViewChild('fileInput')
  fileInputVariable!: ElementRef;

  isLoading: boolean = false;
  isFileAttached: boolean = false;
  selectedFile: File | null = null;
  storageCollection: string = 'car-catalogue';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isFileAttached = true;
      this.selectedFile = file;
    }
  }

  async onSubmit(formData: any, form: NgForm) {
    if (this.selectedFile) {
      this.isLoading = true;

      try {
        const url = await this.fireStorageService.upload(this.storageCollection, this.selectedFile);
        formData.imgPath = url;

        await this.db.collection('car-inventory').add(formData);
        this.snackBar.open('Car added to the inventory!', 'Close', { duration: 2000 });

        form.resetForm();
        this.resetFileInput();
        this.car = {
          brand: '',
          model: '',
          carType: '',
          rentPrice: 0,
          maxSeats: 2,
          fuelType: '',
          transType: '',
          imgPath: '',
          isRented: false,
        };
        this.isFileAttached = false;
        this.selectedFile = null;

      } catch (error) {
        console.error('Error:', error);
        this.snackBar.open('Error adding car to Firebase', 'Close', { duration: 2000 });
      } finally {
        this.isLoading = false;
      }
    }
  }

  private resetFileInput() {
    this.fileInputVariable.nativeElement.value = '';
  }
}

