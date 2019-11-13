import { ITransactionDetails } from '../transactions/types';

export interface IAddressSummary {
  address: string;
  finalBalance: string;
  transactionsCount: number;
}

export interface IAddressDetail extends IAddressSummary {
  transactions: ITransactionDetails[];
}
