export interface IAsset {
  assetName: string;
  decimals?: number;
  description?: string;
  fingerprint: string;
  name?: string;
  policyId: string;
  ticker?: string;
}

export interface IToken {
  quantity: string;
  asset: IAsset;
}

export interface ICoin {
  value: string;
  tokens?: IToken[];
}

export interface ITransactionInput extends ICoin {
  address: string;
  sourceTxId: ITransactionDetails['id'];
  sourceTxIndex: number;
}

export interface ITransactionOutput extends ICoin {
  address: string;
  index: number;
}

export interface IWithdrawal extends ICoin {
  address: string;
}

export interface ITransactionMetadata extends ICoin {
  key: string;
}

export interface ITransactionDetails {
  block: {
    epoch?: number | '-';
    id: string;
    number?: number | null;
    slot?: number | null;
  };
  deposit: string;
  fee: string;
  id: string;
  includedAt: Date;
  inputs: ITransactionInput[];
  metadata?: ITransactionMetadata[];
  outputs?: ITransactionOutput[];
  totalOutput: string;
  withdrawals: IWithdrawal[];
  mint?: IToken[];
  burn?: IToken[];
}
