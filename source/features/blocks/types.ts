export interface IBlockInfo {
  id: string;
  number: number;
  size: number;
  slotNo: number;
}

export interface IBlockOverview extends IBlockInfo {
  createdAt: number;
  createdBy: string;
  epoch: number;
  slotNo: number;
  output: number;
  transactions: number;
}

export interface IBlockDetailed extends IBlockOverview {
  confirmations: number;
  merkleRoot: string;
  nextBlock: string;
  prevBlock: number;
}
