export interface ICoin {
  value: string;
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

export interface ITransactionDetails {
  block: {
    epoch?: number;
    id: string;
    number?: number | null;
    slot?: number | null;
  };
  fee: string;
  id: string;
  includedAt: Date;
  inputs: ITransactionInput[];
  outputs: ITransactionOutput[];
  totalOutput: string;
}
