import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { UserDetails } from './user-details.model';
import { from } from 'rxjs';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUserDetails(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  getUserImgPath(userId: string): Observable<string | null> {
    return this.firestore.doc(`users/${userId}`).valueChanges().pipe(
      map((user: any) => user ? user.imgPath : null)
    );
  }

  getUserFavorites(userId: string): Observable<{ car: Car, carId: string }[]> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      map(doc => {
        if (doc.exists) {
          const userData = doc.data() as UserDetails;
          console.log(userData);
          console.log(userData.favorites)
          return userData.favorites || [];
        } else {
          return [];
        }
      })
    );
  }

  updateUserFavorites(userId: string, favorites: Array<Car>) {
    const updatePromise = this.firestore.collection('users').doc(userId).update({
      favorites: favorites
    });
    return from(updatePromise);
  }
}
