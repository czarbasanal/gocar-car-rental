import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireStorageService } from 'src/app/shared/fire-storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Car } from 'src/app/shared/car.model';
import { NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';




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

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private fireStorageService: FireStorageService, private snackBar: MatSnackBar) { }
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
      console.log(this.selectedFile)
    }
  }

  async onSubmit(formData: any, form: NgForm) {
    if (this.selectedFile) {
      this.isLoading = true;

      try {
        const task = await this.fireStorageService.uploadFile(this.storageCollection, this.selectedFile);

        const snapshot = await task;
        const fileRef = this.storage.ref(snapshot.ref.fullPath);

        const url = await this.fireStorageService.generateFileURL(fileRef);
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

