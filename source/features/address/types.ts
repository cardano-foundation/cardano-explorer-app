import { IToken } from '../transactions/types';

export interface IAddressSummary {
  address: string;
  transactionsCount: string;
}

export interface IPaymentAddressSummary extends IAddressSummary {
  finalBalance: string;
  tokensBalance?: IToken[];
}

export interface IStakeAddressSummary extends IAddressSummary {
  totalWithdrawals: string;
  totalWithdrawn: string;
}
