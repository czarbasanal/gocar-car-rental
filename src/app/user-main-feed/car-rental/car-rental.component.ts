import { Component, OnInit  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ExtraDetail, TransactionDetails } from 'src/app/shared/transaction.model';
import { Router, ActivatedRoute  } from '@angular/router';

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

  formattedPickupTime: any;
  formattedReturnTime: any;
  pickupDateTime: any;
  returnDateTime: any;

  rentalCost: number = 0;
  extraPayment: number = 0;
  totalExpense: number = 0;
  daysDifference: number = 0;
  hrsDifference: number = 0;
  currentCarId: string = '';
  currentUserId: string = '';
  currentTransactionId: string = '';

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
    days: 0,
    hrs: 0,
    total: 0,
  };

  constructor(private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentUserId = params['userId'];
      this.currentCarId = params['carId'];
    });
    this.getCarDetails();
  }
  getCarDetails() {
    this.firestore
      .collection('car-inventory')
      .doc(this.currentCarId)
      .valueChanges()
      .subscribe((data: any) => {
        this.carDetails = data;
      }
    );
  }
  calculateDays() {
    const timeDifference = this.returnDateTime.getTime() - this.pickupDateTime.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }
  calculateHrs() {
    const timeDifference = this.returnDateTime.getTime() - this.pickupDateTime.getTime();
    const remainingMilliseconds = timeDifference % (1000 * 3600 * 24);
    const hrsDifference = Math.floor(remainingMilliseconds / (1000 * 3600));
    return hrsDifference;
  }
  
  calculateRentalCost() {
    this.rentalCost = (this.daysDifference * this.carDetails?.rentPrice || 0)
                    + (this.hrsDifference  * (this.carDetails?.rentPrice / 24 || 0));
  }

  calculateTotalExtraPayment() {
    this.extraPayment = 0;

    if (this.selectedExtras.gpsNavigation) {
      this.extraPayment += (this.extraPrices.gpsNavigation * this.daysDifference)
                          +((this.extraPrices.gpsNavigation / 24) * this.hrsDifference)
    }
    if (this.selectedExtras.additionalDriver) {
      this.extraPayment += (this.extraPrices.additionalDriver * this.daysDifference)
                          +((this.extraPrices.additionalDriver / 24) * this.hrsDifference)
    }
    if (this.selectedExtras.childSeat) {
      this.extraPayment += (this.extraPrices.childSeat * this.daysDifference)
                          +((this.extraPrices.childSeat / 24) * this.hrsDifference)
    }
    if (this.selectedExtras.roofBicycleRack) {
      this.extraPayment += (this.extraPrices.roofBicycleRack * this.daysDifference)
                          +((this.extraPrices.roofBicycleRack / 24) * this.hrsDifference)
    }
  }
  totalRentExpense() {
    this.totalExpense = this.rentalCost + this.extraPayment;
  }

  areInputsFilled(): boolean {
    return !!this.pickupDate && !!this.pickupTime && !!this.returnDate && !!this.returnTime;
  }

  onInputChange() {
    if(this.areInputsFilled()){
      this.formattedPickupTime = this.pickupTime.toString();
      this.formattedReturnTime = this.returnTime.toString();
      this.pickupDateTime = new Date(this.pickupDate + 'T' + this.formattedPickupTime + ':00:00');
      this.returnDateTime = new Date(this.returnDate + 'T' + this.formattedReturnTime + ':00:00');
      
      if (this.calculateDays() == 0){
        this.daysDifference = 1;
        this.hrsDifference = 0;
      }
      else{
        this.daysDifference = this.calculateDays();
        this.hrsDifference = this.calculateHrs();
      }

      this.calculateRentalCost();
      this.calculateTotalExtraPayment();
      this.totalRentExpense()
    }
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
      case "09":
        time = "09:00 AM"
        break;
      case "10":
        time = "10:00 AM"
        break;
      case "11":
        time = "11:00 AM"
        break;
      case "12":
        time = "12:00 PM"
        break;
      case "13":
        time = "01:00 PM"
        break;
      case "14":
        time = "02:00 PM"
        break;
      case "15":
        time = "03:00 PM"
        break;
      case "16":
        time = "04:00 PM"
        break;
      case "17":
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
    this.transactionDetails.rent = this.rentalCost;
    this.transactionDetails.extras = this.getSelectedExtrasDetails();
    this.transactionDetails.total = this.totalExpense;
    this.transactionDetails.days = this.daysDifference;
    this.transactionDetails.hrs = this.hrsDifference;

    this.currentTransactionId = this.firestore.createId();
    this.firestore.collection('transactions').doc(this.currentTransactionId).set(
      this.transactionDetails
    );
  }

  valid(){
    const currentDate = new Date();
    currentDate.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), 0);
    const minPickupDate = new Date(currentDate);
    minPickupDate.setDate(currentDate.getDate());

    if (this.pickupDateTime <= minPickupDate) {
      alert('Invalid Pick up Date. Please choose another date');
      return false;
    }
    else if (this.pickupDateTime > this.returnDateTime || this.pickupDateTime == this.returnDateTime) {
      alert('Invalid Return Date. Please choose another date');
      return false;
    }
    else if (this.pickupDate == '') {
      alert('Please enter Pick up Date');
      return false;
    }
    else if (this.getTime(this.pickupTime) == '') {
      alert('Please enter Return Date');
      return false;
    }
    else if (this.returnDate == '') {
      alert('Please enter Pick up Time');
      return false;
    }
    else if (this.getTime(this.returnTime) == '') {
      alert('Please enter Return Time');
      return false;
    }
    else{
      return true;
    }
    
  }

  goToReceipt() {
    if (this.valid()){
      this.modelUpdate();
      this.router.navigate(['receipt', this.currentTransactionId]);
    }
  }
}