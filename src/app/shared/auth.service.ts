import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { UserDetails } from './user-details.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) { }

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user) {
        const userId = res.user.uid;
        localStorage.setItem('token', 'true');
        this.router.navigate(['main-feed', userId]);
      } else {
        // Handle the case where res.user is null
        console.error('User is null after successful login');
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['login']);
    });
  }
  

  // register method
  async register(userDetails: UserDetails, file: File) {
    try {
      this.isLoadingSubject.next(true);
      const userCredential = await this.fireauth.createUserWithEmailAndPassword(userDetails.email, userDetails.password);
      const profileImageUrl = await this.storage.upload('user-licenses', file);

      const uid = userCredential.user?.uid;
      if (uid) {
        const updatedUserDetails = {
          ...userDetails,
          profileImg: profileImageUrl
        };

        await this.firestore.collection('users').doc(uid).set(updatedUserDetails);

        this.isLoadingSubject.next(false);
        alert('Registration Successful');
        this.router.navigate(['login']);
      }
    } catch (err: any) {
      alert(err.message);
      this.isLoadingSubject.next(false);
      this.router.navigate(['signup']);
    }
  }


  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }


}