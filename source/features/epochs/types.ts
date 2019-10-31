export interface IEpochDetails {
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
