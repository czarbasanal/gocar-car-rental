import { Timestamp } from 'firebase/firestore';
import { Car } from './car.model';

export type NotificationItem = {
  description: string;
  timestamp: Timestamp;
}

export type MyRentedCarsItem = {
  transactionId: string;
  userId: string;
  carName: string;
  carImage: string;
  route: string;
}

export class UserDetails {
  constructor(
    public email: string = '',
    public firstname: string = '',
    public lastname: string = '',
    public password: string = '',
    public licenseImg: string = '',
    public profileImg: string = '',
    public notifications: Array<NotificationItem> = [],
    public favorites: Array<{ car: Car, carId: string }> = [],
    public myRentedCars: Array<MyRentedCarsItem> = []
  ) { }
}