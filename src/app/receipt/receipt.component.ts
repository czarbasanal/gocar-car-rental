import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  isHovered = false;

  currentTransactionDetails: any;
  currentCarDetails: any;
  currentUserDetails: any;
  currentTransactionId: string = '';

  isLoading: boolean = false;

  constructor(private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const params = await firstValueFrom(this.route.params.pipe(take(1)));
      if (params) {
        this.currentTransactionId = params['transactionId'];
  
        const transaction = await this.retrieveDocument('transactions', this.currentTransactionId);
        this.currentTransactionDetails = transaction;
  
        if (this.currentTransactionDetails) {
          const car = await this.retrieveDocument('car-inventory', this.currentTransactionDetails.transactionCarId);
          this.currentCarDetails = car;
  
          const user = await this.retrieveDocument('users', this.currentTransactionDetails.transactionUserId);
          this.currentUserDetails = user;
        }
      } else {
        console.error("Route parameters are undefined");
      }
    } catch (error) {
      console.error("Error in ngOnInit: ", error);
    }
    this.isLoading = false;
  }
  

  async retrieveDocument(collectionId: string, documentId: string): Promise<any> {
    const documentObservable = this.firestore
      .collection(collectionId)
      .doc(documentId)
      .valueChanges()
      .pipe(take(1))
    return firstValueFrom(documentObservable);
  }
  
  goBackToMainFeed() {
    if (this.currentTransactionDetails && this.currentTransactionDetails.transactionUserId) {
      this.router.navigate(['main-feed', this.currentTransactionDetails.transactionUserId]);
    } else {
      console.error("Transaction user ID is undefined");
    }
  }

  goBack() {
    this.router.navigate(['car-rental']);
  }
}
