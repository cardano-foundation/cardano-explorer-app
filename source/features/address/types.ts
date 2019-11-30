import { ITransactionDetails } from '../transactions/types';

export interface IAddressSummary {
  address: string;
  finalBalance: string;
  transactionsCount: string;
}

export interface IAddressDetail extends IAddressSummary {
  transactions: ITransactionDetails[];
}
