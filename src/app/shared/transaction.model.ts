export interface TransactionDetails {
    transactionId: string;
    user: string;
    rent: number;
    extras: ExtraDetail[];
    total: number;
  }
  
  export interface ExtraDetail {
    name: string;
    cost: number;
  }