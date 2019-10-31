export interface IBlockOverview {
  number: number;
  createdAt: number;
  createdBy: string;
  epoch: number;
  output: number;
  size: number;
  transactions: number;
}

export interface IBlockDetailed extends IBlockOverview {
  confirmations: number;
  id: string;
  merkleRoot: string;
  nextBlock: string;
  prevBlock: number;
}

/*
id,
  merkelRootHash,
  number,
  size,
  epoch {
    number
  },
  previousBlock {
    id
  }
  slot {
    number
  },
  transactions {
    id
  }
 */
