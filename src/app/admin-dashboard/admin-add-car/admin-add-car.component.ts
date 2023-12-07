import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from 'src/app/shared/car.model';


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

  constructor(private db: AngularFirestore) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const imageName = file.name;
      const imagePath = `assets/car-catalogue/${imageName}`;
      this.car.imgPath = imagePath;
    }
  }

  onSubmit(formData: any) {
    if (typeof formData.rentPrice === 'number') {
      formData.rentPrice = parseFloat(formData.rentPrice.toFixed(2));
    }

    this.db.collection('car-inventory').add(formData)
      .then(() => console.log('Car added to Firebase!'))
      .catch(error => console.error('Error adding car to Firebase', error));
  }
}

