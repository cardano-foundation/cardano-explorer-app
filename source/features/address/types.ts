export interface IAddressSummary {
  address: string;
  transactionsCount: string;
}

export interface IPaymentAddressSummary extends IAddressSummary {
  finalBalance: string;
}

export interface IStakeAddressSummary extends IAddressSummary {
  totalWithdrawals: string;
  totalWithdrawn: string;
}
