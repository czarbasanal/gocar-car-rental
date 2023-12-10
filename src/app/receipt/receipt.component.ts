import { Component, OnInit  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentTransactionId = params['transactionId'];
    });

    this.getTransactionDetails();
    console.log(this.currentTransactionDetails)
  }

  getTransactionDetails() {
    this.firestore
      .collection('transactions')
      .doc(this.currentTransactionId)
      .valueChanges()
      .subscribe((data: any) => {
        this.currentTransactionDetails = data;
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
      }
    );
    }
  }
  goBackToMainFeed() {
    alert('Thank you for choosing gocar!');
    this.firestore.collection('car-inventory').doc(this.currentTransactionDetails.transactionCarId).update({
      isRented: true
    });
    this.router.navigate(['main-feed', this.currentTransactionDetails.transactionUserId]);
  }
  goBack() {
    this.router.navigate(['car-rental']);
  }
}
