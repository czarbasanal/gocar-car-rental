import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

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
}
