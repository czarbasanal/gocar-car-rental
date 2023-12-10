import { Timestamp } from 'firebase/firestore';
import { Car } from './car.model';

export type NotificationItem = {
  description: string;
  timestamp: Timestamp;
}

export type MyRentedCarsItem = {
  transactionId: string;
  userId: string;
  route: null;
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
    public favorites: Array<Car> = [],
    public myRentedCars: Array<MyRentedCarsItem> = []
  ) { }
}