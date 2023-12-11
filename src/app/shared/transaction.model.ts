export interface TransactionDetails {
  id?: string;
  transactionUserId: string;
  transactionCarId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  rent: number;
  extras: ExtraDetail[];
  days: number,
  hrs: number,
  total: number;
}

export interface ExtraDetail {
  name: string;
  basePrice: number;
  cost: number;
}