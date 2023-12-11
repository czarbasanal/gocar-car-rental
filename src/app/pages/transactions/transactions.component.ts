import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { TransactionDetails } from 'src/app/shared/transaction.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransacDialogComponent } from 'src/app/dialogs/transac-dialog/transac-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions!: Observable<TransactionDetails[]>;
  transactionIds: Map<TransactionDetails, string> = new Map();
  carNames: Map<string, string> = new Map();
  expandedElement: TransactionDetails | null = null;
  displayedColumns: string[] = ['transactionUserId', 'transactionCarId', 'startDate', 'endDate', 'rent', 'total', 'action'];

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.transactions = this.firestore.collection<TransactionDetails>('transactions').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TransactionDetails;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );

    this.fetchCarNames();
  }

  fetchCarNames() {
    this.firestore.collection<any>('car-inventory').valueChanges({ idField: 'id' }).subscribe(cars => {
      cars.forEach(car => {
        this.carNames.set(car.id, car.model);
      });
    });
  }

  deleteTransaction(transaction: TransactionDetails) {
    const dialogRef = this.dialog.open(TransacDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        if (transaction.id) {
          this.firestore.doc(`transactions/${transaction.id}`).delete()
            .then(() => {
              this.snackBar.open('Transaction deleted successfully', 'Close', { duration: 3000 });
            })
            .catch(error => {
              console.error('Error deleting transaction:', error);
              this.snackBar.open('Error deleting transaction', 'Close', { duration: 3000 });
            });
        } else {
          this.snackBar.open('Error: Transaction ID not found', 'Close', { duration: 3000 });
        }
      }
    });
  }
}

