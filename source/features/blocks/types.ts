export interface IBlockInfo {
  id: string;
  number: number;
  size: number;
}

export interface IBlockOverview extends IBlockInfo {
  createdAt: number;
  createdBy: string;
  epoch: number;
  output: number;
  transactions: number;
}

export interface IBlockDetailed extends IBlockOverview {
  confirmations: number;
  merkleRoot: string;
  nextBlock: string;
  prevBlock: number;
}
