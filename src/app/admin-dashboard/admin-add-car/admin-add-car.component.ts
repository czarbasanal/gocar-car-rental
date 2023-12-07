import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';




@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.css']
})
export class AdminAddCarComponent {
  car = {
    brand: '',
    model: '',
    type: '',
    rentPrice: null,
    seats: null,
    fuelType: '',
    transType: '',
    imgPath: '',
    isRented: false
  };

  constructor(private db: AngularFireDatabase) { }

  onSubmit(formData: any) {
    this.db.list('Cars').push(formData)
      .then(() => console.log('Car added to Firebase!'))
      .catch(error => console.error('Error adding car to Firebase', error));
  }
}

