import { Component, OnInit  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ExtraDetail, TransactionDetails } from 'src/app/shared/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  carDetails: any;
  pickupDate: string = '';
  returnDate: string = '';
  pickupTime: string = '';
  returnTime: string = '';
  rentalCost: number = 0;
  extraPayment: number = 0;
  totalExpense: number = 0;

  selectedExtras: any = {
    gpsNavigation: false,
    additionalDriver: false,
    childSeat: false,
    roofBicycleRack: false,
  };
  extraPrices: any = {
    gpsNavigation: 100,
    additionalDriver: 250,
    childSeat: 50,
    roofBicycleRack: 150,
  };

  transactionDetails: TransactionDetails = {
    transactionId: '',
    user: '',
    rent: 0,
    extras: [],
    total: 0,
  };

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.getCarDetails();
  }

  getCarDetails() {
    const carId = 'NQqYOoSMrxt5aUiuOoIC';//ilisanan na ni diria

    this.firestore
      .collection('car-inventory')
      .doc(carId)
      .valueChanges()
      .subscribe((data: any) => {
        this.carDetails = data;
        console.log(this.carDetails);
      }
    );
  }

  calculateRentalCost() {
    const formattedPickupTime = this.padZero(this.pickupTime.toString());
    const formattedReturnTime = this.padZero(this.returnTime.toString());
    const pickupDateTime = new Date(this.pickupDate + 'T' + formattedPickupTime + ':00:00');
    const returnDateTime = new Date(this.returnDate + 'T' + formattedReturnTime + ':00:00');
    const timeDifference = returnDateTime.getTime() - pickupDateTime.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.rentalCost = daysDifference * this.carDetails?.rentPrice || 0;
  }
  padZero(value: string): string {
    return value.length === 1 ? '0' + value : value;
  }

  calculateTotalExtraPayment() {
    const formattedPickupTime = this.padZero(this.pickupTime.toString());
    const formattedReturnTime = this.padZero(this.returnTime.toString());
    const pickupDateTime = new Date(this.pickupDate + 'T' + formattedPickupTime + ':00:00');
    const returnDateTime = new Date(this.returnDate + 'T' + formattedReturnTime + ':00:00');
    const timeDifference = returnDateTime.getTime() - pickupDateTime.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.extraPayment = 0;

    if (this.selectedExtras.gpsNavigation) {
      this.extraPayment += this.extraPrices.gpsNavigation * daysDifference;
    }
    if (this.selectedExtras.additionalDriver) {
      this.extraPayment += this.extraPrices.additionalDriver * daysDifference;
    }
    if (this.selectedExtras.childSeat) {
      this.extraPayment += this.extraPrices.childSeat * daysDifference;
    }
    if (this.selectedExtras.roofBicycleRack) {
      this.extraPayment += this.extraPrices.roofBicycleRack * daysDifference;
    }
  }

  totalRentExpense() {
    this.totalExpense = this.rentalCost + this.extraPayment;
  }

  onInputChange() {
    this.calculateRentalCost();
    this.calculateTotalExtraPayment();
    this.totalRentExpense()
  }

  getSelectedExtrasDetails() {
    const details: ExtraDetail[] = [];
    const formattedPickupTime = this.padZero(this.pickupTime.toString());
    const formattedReturnTime = this.padZero(this.returnTime.toString());
    const pickupDateTime = new Date(this.pickupDate + 'T' + formattedPickupTime + ':00:00');
    const returnDateTime = new Date(this.returnDate + 'T' + formattedReturnTime + ':00:00');
    const timeDifference = returnDateTime.getTime() - pickupDateTime.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (this.selectedExtras.gpsNavigation) {
      details.push({
        name: 'GPS Navigation',
        cost: this.extraPrices.gpsNavigation * daysDifference,
      });
    }
    if (this.selectedExtras.additionalDriver) {
      details.push({
        name: 'Additional Driver',
        cost: this.extraPrices.additionalDriver * daysDifference,
      });
    }
    if (this.selectedExtras.childSeat) {
      details.push({
        name: 'Child seat',
        cost: this.extraPrices.childSeat * daysDifference,
      });
    }
    if (this.selectedExtras.roofBicycleRack) {
      details.push({
        name: 'Roof bicycle rack',
        cost: this.extraPrices.roofBicycleRack * daysDifference,
      });
    }
    return details;
  }

  modelUpdate() {
    this.transactionDetails.rent = this.rentalCost || 0;
    this.transactionDetails.extras = this.getSelectedExtrasDetails();
    this.transactionDetails.total = this.totalExpense;

    this.firestore.collection('transactions').add(this.transactionDetails)
      .catch((error) => {
        console.error('Error adding transaction:', error);
      });

    console.log("Transaction: ",this.transactionDetails);
  }

  goToLanding() {
    this.modelUpdate();
    this.router.navigate(['receipt']);
  }

}