import { IBlockOverview } from '../blocks/types';

export interface IEpochOverview {
  blocksCount: number;
  number: number;
  lastBlockAt: Date;
  output: string;
  percentage: number;
  slotsCount: number;
  startedAt: Date;
  transactionsCount: string;
}

export interface IEpochDetails extends IEpochOverview {
  blocks: IBlockOverview[];
}
