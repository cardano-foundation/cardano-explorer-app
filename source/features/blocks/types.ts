import { ITransactionDetails } from '../transactions/types';

export interface IBlockOverview {
  createdAt: Date;
  createdBy: string;
  epoch: number | '-';
  id: string;
  number: number | '-';
  output: string;
  size: number;
  slotNo: number | '-';
  transactionsCount: string;
}

export interface IBlockDetailed extends IBlockOverview {
  nextBlock: {
    id: IBlockOverview['id'];
    number: IBlockOverview['number'];
  };
  prevBlock: {
    id: IBlockOverview['id'];
    number: IBlockOverview['number'];
  };
  transactions: ITransactionDetails[];
}
