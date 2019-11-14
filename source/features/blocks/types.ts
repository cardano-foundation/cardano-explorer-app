import { IEpochOverview } from '../epochs/types';

export interface IBlockInfo {
  id: string;
  number: number | null;
  size: number;
  slotWithinEpoch: number | null;
}

export interface IBlockOverview extends IBlockInfo {
  createdAt: Date;
  createdBy: string;
  epoch: IEpochOverview['number'];
  output: number;
  transactionsCount: number;
}

export interface IBlockDetailed extends IBlockOverview {
  merkleRoot: string;
  nextBlock: string;
  prevBlock: {
    id: IBlockInfo['id'];
    number: IBlockInfo['number'];
  };
}
