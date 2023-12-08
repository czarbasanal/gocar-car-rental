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
  daysDifference: number = 0;
  currentCarId: string = ''; //ilisanan pa ni
  currentUserId: string = ''; //ilisanan pa ni

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
    transactionUserId: '',
    transactionCarId: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    rent: 0,
    extras: [],
    duration: 0,
    total: 0,
  };

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.currentCarId = 'nkcd5S3lJVMfJPx5VQLA'; //ilisanan pa ni
    this.currentUserId = '9zOAMpevRPcqWJLi84C6DH54hap2'; //ilisanan pa ni
    this.getCarDetails();
  }
  getCarDetails() {
    this.firestore
      .collection('car-inventory')
      .doc(this.currentCarId)
      .valueChanges()
      .subscribe((data: any) => {
        this.carDetails = data;
        console.log(this.carDetails);
      }
    );
  }
  calculateDays() {
    const formattedPickupTime = this.pickupTime.toString();
    const formattedReturnTime = this.returnTime.toString();
    const pickupDateTime = new Date(this.pickupDate + 'T' + formattedPickupTime + ':00');
    const returnDateTime = new Date(this.returnDate + 'T' + formattedReturnTime + ':00');
    const timeDifference = returnDateTime.getTime() - pickupDateTime.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }
  calculateRentalCost() {
    this.rentalCost = this.daysDifference * this.carDetails?.rentPrice || 0;
  }
  calculateTotalExtraPayment() {
    this.extraPayment = 0;

    if (this.selectedExtras.gpsNavigation) {
      this.extraPayment += this.extraPrices.gpsNavigation * this.daysDifference;
    }
    if (this.selectedExtras.additionalDriver) {
      this.extraPayment += this.extraPrices.additionalDriver * this.daysDifference;
    }
    if (this.selectedExtras.childSeat) {
      this.extraPayment += this.extraPrices.childSeat * this.daysDifference;
    }
    if (this.selectedExtras.roofBicycleRack) {
      this.extraPayment += this.extraPrices.roofBicycleRack * this.daysDifference;
    }
  }
  totalRentExpense() {
    this.totalExpense = this.rentalCost + this.extraPayment;
  }

  onInputChange() {
    this.daysDifference = this.calculateDays();
    this.calculateRentalCost();
    this.calculateTotalExtraPayment();
    this.totalRentExpense()
  }

  getSelectedExtrasDetails() {
    const details: ExtraDetail[] = [];
    
    if (this.selectedExtras.gpsNavigation) {
      details.push({    
        name: 'GPS Navigation',
        basePrice: this.extraPrices.gpsNavigation,
        cost: this.extraPrices.gpsNavigation * this.daysDifference,
      });
    }
    if (this.selectedExtras.additionalDriver) {
      details.push({
        name: 'Additional Driver',
        basePrice: this.extraPrices.additionalDriver,
        cost: this.extraPrices.additionalDriver * this.daysDifference,
      });
    }
    if (this.selectedExtras.childSeat) {
      details.push({
        name: 'Child seat',
        basePrice: this.extraPrices.childSeat,
        cost: this.extraPrices.childSeat * this.daysDifference,
      });
    }
    if (this.selectedExtras.roofBicycleRack) {
      details.push({
        name: 'Roof bicycle rack',
        basePrice: this.extraPrices.roofBicycleRack,
        cost: this.extraPrices.roofBicycleRack * this.daysDifference,
      });
    }
    return details;
  }
  getTime(time: string){
    switch(time) {
      case "09:00":
        time = "09:00 AM"
        break;
      case "10:00":
        time = "10:00 AM"
        break;
      case "11:00":
        time = "11:00 AM"
        break;
      case "12:00":
        time = "12:00 PM"
        break;
      case "13:00":
        time = "01:00 PM"
        break;
      case "14:00":
        time = "02:00 PM"
        break;
      case "15:00":
        time = "03:00 PM"
        break;
      case "16:00":
        time = "04:00 PM"
        break;
      case "17:00":
        time = "05:00 PM"
        break;
    }
    return time
  }

  modelUpdate() {
    this.transactionDetails.transactionCarId = this.currentCarId;
    this.transactionDetails.transactionUserId = this.currentUserId;
    this.transactionDetails.startDate = this.pickupDate;
    this.transactionDetails.startTime = this.getTime(this.pickupTime);
    this.transactionDetails.endDate = this.returnDate;
    this.transactionDetails.endTime = this.getTime(this.returnTime);
    this.transactionDetails.rent = this.rentalCost || 0;
    this.transactionDetails.extras = this.getSelectedExtrasDetails();
    this.transactionDetails.total = this.totalExpense;
    this.transactionDetails.duration = this.daysDifference;
    

    this.firestore.collection('transactions').doc().set(
      this.transactionDetails
    );
  }

  goToLanding() {
    this.modelUpdate();
    this.router.navigate(['receipt']);
  }

}