import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private firestore: AngularFirestore) { }

  getUsersCount() {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => actions.length)
    );
  }

  getTransactionsCount() {
    return this.firestore.collection('transactions').snapshotChanges().pipe(
      map(actions => actions.length)
    );
  }

  getCarsCount() {
    return this.firestore.collection('car-inventory').snapshotChanges().pipe(
      map(actions => actions.length)
    );
  }
}
