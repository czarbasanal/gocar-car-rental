import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { UserDetails } from 'src/app/shared/user-details.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  userDataSource!: Observable<UserDetails[]>;
  expandedElement: UserDetails | null = null;
  userDisplayedColumns: string[] = ['email', 'firstname', 'lastname', 'myRentedCars', 'action'];

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userDataSource = this.firestore.collection<UserDetails>('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserDetails;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  deleteUser(user: any) {
    if (user.id) {
      this.firestore.doc(`users/${user.id}`).delete()
        .then(() => {
          this.snackBar.open('User deleted successfully', 'Close', { duration: 2000 });
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Error deleting user', 'Close', { duration: 2000 });
        });
    } else {
      this.snackBar.open('Error: User ID not found', 'Close', { duration: 2000 });
    }
  }
}
