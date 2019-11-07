export interface IBlockInfo {
  id: string;
  number: number;
  size: number;
  slotWithinEpoch: number;
}

export interface IBlockOverview extends IBlockInfo {
  createdAt: number;
  createdBy: string;
  epoch: number;
  slotWithinEpoch: number;
  output: number;
  transactions: number;
}

export interface IBlockDetailed extends IBlockOverview {
  confirmations: number;
  merkleRoot: string;
  nextBlock: string;
  prevBlock: number;
}
