import { IEpochOverview } from '../epochs/types';
import { ITransactionDetails } from '../transactions/types';

export interface IBlockOverview {
  createdAt: Date;
  createdBy: string;
  epoch: IEpochOverview['number'];
  id: string;
  number: number | '-';
  output: number;
  size: number;
  slotWithinEpoch: number | '-';
  transactionsCount: number;
}

export interface IBlockDetailed extends IBlockOverview {
  merkleRoot: string;
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
