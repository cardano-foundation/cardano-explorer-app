export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `DateTime` scalar represents a date and time following the ISO 8601 standard */
  DateTime: any,
  /** Hex encoded hash32 string, 64 characters */
  Hash32HexString: any,
  /** PublicKeyHash string */
  PublicKeyHash: any,
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * BigInt can represent values between -(2^53) + 1 and 2^53 - 1. 
 */
  BigInt: any,
  /** LoveLaces, the atomic unit of ADA */
  LoveLaces: any,
  /** 0-100 */
  Percentage: any,
  /** TransactionHash string */
  TransactionHash: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



export type Block = {
  __typename?: 'Block',
  epoch?: Maybe<Epoch>,
  fees?: Maybe<Scalars['String']>,
  id: Scalars['Hash32HexString'],
  merkelRootHash?: Maybe<Scalars['Hash32HexString']>,
  /** Genesis and Epoch Boundary Blocks (EBBs) do not have numbers */
  number?: Maybe<Scalars['Int']>,
  previousBlock?: Maybe<Block>,
  size: Scalars['Int'],
  /** Genesis and Epoch Boundary Blocks (EBBs) are not created within slots */
  slot?: Maybe<Slot>,
  transactions: Array<Maybe<Transaction>>,
};


export type BlockTransactionsArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Transaction_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transaction_Bool_Exp>
};

export type Block_Bool_Exp = {
  dateCreated?: Maybe<Date_Comparison_Exp>,
  id?: Maybe<Hash32HexString_Comparison_Exp>,
  number?: Maybe<Int_Comparison_Exp>,
};

export type Block_Order_By = {
  number?: Maybe<Order_By>,
  size?: Maybe<Order_By>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cardano = {
  __typename?: 'Cardano',
  blockHeight: Scalars['Int'],
  currentEpoch: Epoch,
};

/** expression to compare data of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['DateTime']>,
  _gt?: Maybe<Scalars['DateTime']>,
  _gte?: Maybe<Scalars['DateTime']>,
  _in?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
  _lt?: Maybe<Scalars['DateTime']>,
  _lte?: Maybe<Scalars['DateTime']>,
  _neq?: Maybe<Scalars['DateTime']>,
  _nin?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
};


export type Epoch = {
  __typename?: 'Epoch',
  blocks?: Maybe<Array<Maybe<Block>>>,
  endedAt?: Maybe<Scalars['DateTime']>,
  output: Scalars['String'],
  number: Scalars['Int'],
  slots: Array<Slot>,
  startedAt?: Maybe<Scalars['DateTime']>,
  transactionsCount?: Maybe<Scalars['String']>,
};

export type Epoch_Bool_Exp = {
  afterDate?: Maybe<Scalars['DateTime']>,
  beforeDate?: Maybe<Scalars['DateTime']>,
  number?: Maybe<Int_Comparison_Exp>,
};

export type Epoch_Order_By = {
  blockCount?: Maybe<Order_By>,
  number?: Maybe<Order_By>,
  fees?: Maybe<Order_By>,
};


/** All fields are combined with logical 'AND'. */
export type Hash32HexString_Comparison_Exp = {
  _eq?: Maybe<Scalars['Hash32HexString']>,
  _in?: Maybe<Array<Maybe<Scalars['Hash32HexString']>>>,
  _nin?: Maybe<Array<Maybe<Scalars['Hash32HexString']>>>,
};

/** expression to compare data of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>,
  _gt?: Maybe<Scalars['Int']>,
  _gte?: Maybe<Scalars['Int']>,
  _in?: Maybe<Array<Scalars['Int']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Int']>,
  _lte?: Maybe<Scalars['Int']>,
  _neq?: Maybe<Scalars['Int']>,
  _nin?: Maybe<Array<Scalars['Int']>>,
};


/** expression to compare data of type Lovelaces. All fields are combined with logical 'AND'. */
export type Lovelaces_Comparison_Exp = {
  _eq?: Maybe<Scalars['LoveLaces']>,
  _gt?: Maybe<Scalars['LoveLaces']>,
  _gte?: Maybe<Scalars['LoveLaces']>,
  _in?: Maybe<Array<Scalars['LoveLaces']>>,
  _lt?: Maybe<Scalars['LoveLaces']>,
  _lte?: Maybe<Scalars['LoveLaces']>,
  _neq?: Maybe<Scalars['LoveLaces']>,
  _nin?: Maybe<Array<Scalars['LoveLaces']>>,
};

/** ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  Desc = 'desc'
}

/** ordering options */
export enum Order_By_With_Nulls {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}


/** expression to compare data of type Percentage. All fields are combined with logical 'AND'. */
export type Percentage_Comparison_Exp = {
  _eq?: Maybe<Scalars['Percentage']>,
  _gt?: Maybe<Scalars['Percentage']>,
  _gte?: Maybe<Scalars['Percentage']>,
  _lt?: Maybe<Scalars['Int']>,
  _lte?: Maybe<Scalars['Int']>,
  _neq?: Maybe<Scalars['Int']>,
};


export type Query = {
  __typename?: 'Query',
  blocks: Array<Maybe<Block>>,
  epochs: Array<Maybe<Epoch>>,
  cardano?: Maybe<Cardano>,
  transactions: Array<Maybe<Transaction>>,
  utxoSet: Array<Maybe<TransactionOutput>>,
};


export type QueryBlocksArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Block_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Block_Bool_Exp>
};


export type QueryEpochsArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Epoch_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Epoch_Bool_Exp>
};


export type QueryTransactionsArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Transaction_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transaction_Bool_Exp>
};


export type QueryUtxoSetArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Utxo_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Utxo_Bool_Exp>
};

export type Slot = {
  __typename?: 'Slot',
  block?: Maybe<Block>,
  /** Public key of the elected UTXO */
  leader?: Maybe<Scalars['PublicKeyHash']>,
  epoch: Epoch,
  number: Scalars['Int'],
  /** Calculated based on the genesis start date, using slot number and duration */
  startedAt?: Maybe<Scalars['DateTime']>,
};

export type Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>,
  _gt?: Maybe<Scalars['String']>,
  _gte?: Maybe<Scalars['String']>,
  _ilike?: Maybe<Scalars['String']>,
  _in?: Maybe<Array<Maybe<Scalars['String']>>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _like?: Maybe<Scalars['String']>,
  _lt?: Maybe<Scalars['String']>,
  _lte?: Maybe<Scalars['String']>,
  _neq?: Maybe<Scalars['String']>,
  _nilike?: Maybe<Scalars['String']>,
  _nin?: Maybe<Array<Maybe<Scalars['String']>>>,
  _nlike?: Maybe<Scalars['String']>,
  _nsimilar?: Maybe<Scalars['String']>,
  _similar?: Maybe<Scalars['String']>,
};

export type Transaction = {
  __typename?: 'Transaction',
  block?: Maybe<Block>,
  fee: Scalars['String'],
  id: Scalars['Hash32HexString'],
  /** Date the transaction was included in the blockchain, determined by the slot start date */
  includedAt: Scalars['DateTime'],
  inputs: Array<TransactionInput>,
  outputs: Array<TransactionOutput>,
  totalOutput: Scalars['String'],
};

export type Transaction_Bool_Exp = {
  /** dateCreated: Date_comparison_exp */
  id?: Maybe<Hash32HexString_Comparison_Exp>,
  block?: Maybe<Block_Bool_Exp>,
};

export type Transaction_Order_By = {
  block?: Maybe<Order_By>,
  fee?: Maybe<Order_By>,
};


export type TransactionInput = {
  __typename?: 'TransactionInput',
  sourceTxId: Scalars['Hash32HexString'],
  sourceTxIndex: Scalars['Int'],
  address: Scalars['String'],
  value: Scalars['String'],
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput',
  address: Scalars['String'],
  index: Scalars['Int'],
  txId: Scalars['Hash32HexString'],
  value: Scalars['String'],
};


export type Utxo_Bool_Exp = {
  address?: Maybe<Text_Comparison_Exp>,
};

export type Utxo_Order_By = {
  address?: Maybe<Order_By>,
};
export type BlockDetailsFragment = ({ __typename?: 'Block' } & Pick<Block, 'id' | 'merkelRootHash' | 'number' | 'size'> & { epoch: Maybe<({ __typename?: 'Epoch' } & Pick<Epoch, 'number'>)>, previousBlock: Maybe<({ __typename?: 'Block' } & Pick<Block, 'id' | 'number'>)>, slot: Maybe<({ __typename?: 'Slot' } & Pick<Slot, 'number'>)>, transactions: Array<Maybe<({ __typename?: 'Transaction' } & Pick<Transaction, 'id'>)>> });

export type BlockOverviewFragment = ({ __typename?: 'Block' } & Pick<Block, 'id' | 'number' | 'size'> & { epoch: Maybe<({ __typename?: 'Epoch' } & Pick<Epoch, 'number'>)>, slot: Maybe<({ __typename?: 'Slot' } & Pick<Slot, 'number'>)>, transactions: Array<Maybe<({ __typename?: 'Transaction' } & Pick<Transaction, 'id'>)>> });

export type GetLatestBlocksQueryVariables = {
  limit?: Maybe<Scalars['Int']>
};


export type GetLatestBlocksQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & BlockOverviewFragment)>> });

export type BlockDetailsFragment = ({ __typename?: 'Block' } & Pick<Block, 'id' | 'merkelRootHash' | 'number' | 'size'> & { epoch: Maybe<({ __typename?: 'Epoch' } & Pick<Epoch, 'number'>)>, previousBlock: Maybe<({ __typename?: 'Block' } & Pick<Block, 'id'>)>, slot: Maybe<({ __typename?: 'Slot' } & Pick<Slot, 'number'>)>, transactions: Array<Maybe<({ __typename?: 'Transaction' } & Pick<Transaction, 'id'>)>> });

export type EpochDetailsFragment = ({ __typename?: 'Epoch' } & Pick<Epoch, 'endedAt' | 'number' | 'startedAt' | 'output' | 'transactionsCount'>);

export type GetLatestEpochsQueryVariables = {
  limit?: Maybe<Scalars['Int']>
};


export type GetLatestEpochsQuery = ({ __typename?: 'Query' } & { epochs: Array<Maybe<({ __typename?: 'Epoch' } & EpochDetailsFragment)>> });

export type EpochDetailsFragment = ({ __typename?: 'Epoch' } & Pick<Epoch, 'endedAt' | 'number' | 'startedAt' | 'output' | 'transactionsCount'> & { slots: Array<({ __typename?: 'Slot' } & Pick<Slot, 'number'>)>, blocks: Maybe<Array<Maybe<({ __typename?: 'Block' } & Pick<Block, 'id'>)>>> });

export type SearchForBlockByIdQueryVariables = {
  id: Scalars['Hash32HexString']
};


export type SearchForBlockByIdQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & BlockDetailsFragment)>> });

export type SearchForBlockByNumberQueryVariables = {
  number: Scalars['Int']
};


export type SearchForBlockByNumberQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & BlockDetailsFragment)>> });

export type SearchForEpochByNumberQueryVariables = {
  number: Scalars['Int']
};


export type SearchForEpochByNumberQuery = ({ __typename?: 'Query' } & { epochs: Array<Maybe<({ __typename?: 'Epoch' } & EpochDetailsFragment)>> });

export type SearchForTransactionByIdQueryVariables = {
  id?: Maybe<Scalars['Hash32HexString']>
};


export type SearchForTransactionByIdQuery = ({ __typename?: 'Query' } & { transactions: Array<Maybe<({ __typename?: 'Transaction' } & TransactionDetailsFragment)>> });

export type TransactionDetailsFragment = ({ __typename?: 'Transaction' } & Pick<Transaction, 'fee' | 'id' | 'totalOutput'> & { block: Maybe<({ __typename?: 'Block' } & Pick<Block, 'id'>)>, inputs: Array<({ __typename?: 'TransactionInput' } & Pick<TransactionInput, 'sourceTxIndex' | 'address' | 'value'>)>, outputs: Array<({ __typename?: 'TransactionOutput' } & Pick<TransactionOutput, 'address' | 'index' | 'txId' | 'value'>)> });

export type TransactionDetailsFragment = ({ __typename?: 'Transaction' } & Pick<Transaction, 'fee' | 'id' | 'totalOutput'> & { block: Maybe<({ __typename?: 'Block' } & Pick<Block, 'id'>)>, inputs: Array<({ __typename?: 'TransactionInput' } & Pick<TransactionInput, 'sourceTxIndex' | 'address' | 'value'>)>, outputs: Array<({ __typename?: 'TransactionOutput' } & Pick<TransactionOutput, 'address' | 'index' | 'txId' | 'value'>)> });
