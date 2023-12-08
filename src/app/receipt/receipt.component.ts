import { Component, OnInit  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  currentTransactionDetails: any;
  currentCarDetails: any;
  currentUserDetails: any;
  currentTransactionId: string = '';

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.currentTransactionId = 'mEwPqBzR8m1qzjl1kUSY'; //ilisanan pa ni
    this.getTransactionDetails();
  }

  getTransactionDetails() {
    this.firestore
      .collection('transactions')
      .doc(this.currentTransactionId)
      .valueChanges()
      .subscribe((data: any) => {
        this.currentTransactionDetails = data;
        console.log('Transaction: ',this.currentTransactionDetails);
        console.log('CarId: ',this.currentTransactionDetails.transactionCarId);
        console.log('UserId: ',this.currentTransactionDetails.transactionUserId);
        if (this.currentTransactionDetails.transactionCarId && this.currentTransactionDetails.transactionUserId) {
          this.getCarDetails();
          this.getUserDetails();
        }
      }
    );
  }

  getCarDetails() {
    if (this.currentTransactionDetails.transactionCarId) {
      this.firestore
      .collection('car-inventory')
      .doc(this.currentTransactionDetails.transactionCarId)
      .valueChanges()
      .subscribe((data: any) => {
        this.currentCarDetails = data;
        console.log('Car: ',this.currentCarDetails);
      }
    );
    }
  }
  getUserDetails() {
    if (this.currentTransactionDetails.transactionUserId) {
      this.firestore
      .collection('users')
      .doc(this.currentTransactionDetails.transactionUserId)
      .valueChanges()
      .subscribe((data: any) => {
        this.currentUserDetails = data;
        console.log('User: ',this.currentUserDetails);
      }
    );
    }
  }
  goBackToMainFeed() {
    alert('Thank you for choosing gocar!');
    this.router.navigate(['main-feed']);
  }
}
