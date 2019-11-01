import { IBlockInfo } from '../blocks/types';

export interface IEpochOverview {
  blocksCount: number;
  number: number;
  endedAt: Date;
  output: number;
  percentage?: number;
  slotsCount: number;
  startedAt: Date;
  status: string;
  transactionsCount: number;
}

export interface IEpochDetails extends IEpochOverview {
  blocks: IBlockInfo[];
}
