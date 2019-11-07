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
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * BigInt can represent values between -(2^53) + 1 and 2^53 - 1. 
 */
  BigInt: any,
  /** Hex encoded hash32 string, 64 characters */
  Hash32HexString: any,
  /** LoveLaces, the atomic unit of ADA */
  LoveLaces: any,
  /** 0-100 */
  Percentage: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



/** expression to compare data of type BigInt. All fields are combined with logical 'AND'. */
export type BigInt_Comparison_Exp = {
  _eq?: Maybe<Scalars['BigInt']>,
  _gt?: Maybe<Scalars['BigInt']>,
  _gte?: Maybe<Scalars['BigInt']>,
  _in?: Maybe<Array<Scalars['BigInt']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['BigInt']>,
  _lte?: Maybe<Scalars['BigInt']>,
  _neq?: Maybe<Scalars['BigInt']>,
  _nin?: Maybe<Array<Scalars['BigInt']>>,
};

export type Block = {
  __typename?: 'Block',
  createdAt: Scalars['DateTime'],
  createdBy: Scalars['String'],
  /** Genesis block does not belong to the 0th epoch, therefore it could be null */
  epoch?: Maybe<Epoch>,
  fees: Scalars['String'],
  id: Scalars['Hash32HexString'],
  /** Ouroboros Classic Epoch Boundary blocks (EBB) do not have a merkel root */
  merkelRootHash?: Maybe<Scalars['Hash32HexString']>,
  /** Ouroboros Classic Epoch Boundary blocks (EBB) do not have a block number */
  number?: Maybe<Scalars['Int']>,
  /** Ouroboros Classic Epoch Boundary blocks (EBB) do not have a slot number */
  slotNo?: Maybe<Scalars['Int']>,
  /** Ouroboros Classic Epoch Boundary blocks (EBB) do not have a slot number */
  slotWithinEpoch?: Maybe<Scalars['Int']>,
  previousBlock?: Maybe<Block>,
  size: Scalars['Int'],
  transactions: Array<Maybe<Transaction>>,
  transactions_aggregate: Transaction_Aggregate,
};


export type BlockTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Transaction_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transaction_Bool_Exp>
};


export type BlockTransactions_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Transaction_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transaction_Bool_Exp>
};

export type Block_Aggregate = {
  __typename?: 'Block_aggregate',
  aggregate?: Maybe<Block_Aggregate_Fields>,
};

export type Block_Aggregate_Fields = {
  __typename?: 'Block_aggregate_fields',
  avg?: Maybe<Block_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Block_Max_Fields>,
  min?: Maybe<Block_Min_Fields>,
  sum?: Maybe<Block_Sum_Fields>,
};

export type Block_Avg_Fields = {
  __typename?: 'Block_avg_fields',
  fees?: Maybe<Scalars['Float']>,
  size?: Maybe<Scalars['Float']>,
};

export type Block_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Block_Bool_Exp>>>,
  _not?: Maybe<Block_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Block_Bool_Exp>>>,
  createdAt?: Maybe<Date_Comparison_Exp>,
  createdBy?: Maybe<Text_Comparison_Exp>,
  epoch?: Maybe<Epoch_Bool_Exp>,
  fees?: Maybe<BigInt_Comparison_Exp>,
  id?: Maybe<Hash32HexString_Comparison_Exp>,
  number?: Maybe<Int_Comparison_Exp>,
  previousBlock?: Maybe<Block_Bool_Exp>,
  size?: Maybe<Int_Comparison_Exp>,
  slotNo?: Maybe<Int_Comparison_Exp>,
  slotWithinEpoch?: Maybe<Int_Comparison_Exp>,
  transactions?: Maybe<Transaction_Bool_Exp>,
};

export type Block_Max_Fields = {
  __typename?: 'Block_max_fields',
  fees?: Maybe<Scalars['BigInt']>,
  size?: Maybe<Scalars['BigInt']>,
};

export type Block_Min_Fields = {
  __typename?: 'Block_min_fields',
  fees?: Maybe<Scalars['BigInt']>,
  size?: Maybe<Scalars['BigInt']>,
};

export type Block_Order_By = {
  createdAt?: Maybe<Order_By>,
  createdBy?: Maybe<Order_By>,
  epoch?: Maybe<Epoch_Order_By>,
  fees?: Maybe<Order_By>,
  number?: Maybe<Order_By_With_Nulls>,
  size?: Maybe<Order_By>,
  slotNo?: Maybe<Order_By_With_Nulls>,
  slotWithinEpoch?: Maybe<Order_By_With_Nulls>,
};

export type Block_Sum_Fields = {
  __typename?: 'Block_sum_fields',
  fees?: Maybe<Scalars['BigInt']>,
  size?: Maybe<Scalars['BigInt']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cardano = {
  __typename?: 'Cardano',
  blockHeight: Scalars['Int'],
  currentEpoch: Epoch,
  protocolConst: Scalars['Int'],
  slotDuration: Scalars['Int'],
  startTime: Scalars['DateTime'],
};

export type Coin_Aggregate = {
  __typename?: 'Coin_aggregate',
  aggregate?: Maybe<Coin_Aggregate_Fields>,
};

export type Coin_Aggregate_Fields = {
  __typename?: 'Coin_aggregate_fields',
  avg?: Maybe<Coin_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Coin_Max_Fields>,
  min?: Maybe<Coin_Min_Fields>,
  sum?: Maybe<Coin_Sum_Fields>,
};

export type Coin_Avg_Fields = {
  __typename?: 'Coin_avg_fields',
  value?: Maybe<Scalars['BigInt']>,
};

export type Coin_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Coin_Bool_Exp>>>,
  _not?: Maybe<Coin_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Coin_Bool_Exp>>>,
  address?: Maybe<Text_Comparison_Exp>,
  value?: Maybe<BigInt_Comparison_Exp>,
};

export type Coin_Max_Fields = {
  __typename?: 'Coin_max_fields',
  value?: Maybe<Scalars['BigInt']>,
};

export type Coin_Min_Fields = {
  __typename?: 'Coin_min_fields',
  value?: Maybe<Scalars['BigInt']>,
};

export type Coin_Order_By = {
  address?: Maybe<Order_By>,
  txId?: Maybe<Order_By>,
  value?: Maybe<Order_By>,
};

export type Coin_Sum_Fields = {
  __typename?: 'Coin_sum_fields',
  value?: Maybe<Scalars['BigInt']>,
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
  blocks: Array<Block>,
  blocks_aggregate: Block_Aggregate,
  output: Scalars['String'],
  number: Scalars['Int'],
  transactionsCount: Scalars['String'],
  startedAt: Scalars['DateTime'],
  lastBlockTime: Scalars['DateTime'],
};


export type EpochBlocksArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Block_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Block_Bool_Exp>
};


export type EpochBlocks_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Block_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Block_Bool_Exp>
};

export type Epoch_Aggregate = {
  __typename?: 'Epoch_aggregate',
  aggregate: Epoch_Aggregate_Fields,
};

export type Epoch_Aggregate_Fields = {
  __typename?: 'Epoch_aggregate_fields',
  count: Scalars['String'],
  max: Epoch_Max_Fields,
  min: Epoch_Min_Fields,
  sum: Epoch_Sum_Fields,
};

export type Epoch_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Epoch_Bool_Exp>>>,
  _not?: Maybe<Epoch_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Epoch_Bool_Exp>>>,
  blocks?: Maybe<Block_Bool_Exp>,
  number?: Maybe<Int_Comparison_Exp>,
  output?: Maybe<Text_Comparison_Exp>,
  transactionsCount?: Maybe<Text_Comparison_Exp>,
};

export type Epoch_Max_Fields = {
  __typename?: 'Epoch_max_fields',
  number: Scalars['String'],
  output: Scalars['String'],
  transactionsCount: Scalars['String'],
};

export type Epoch_Min_Fields = {
  __typename?: 'Epoch_min_fields',
  output: Scalars['String'],
  transactionsCount: Scalars['String'],
};

export type Epoch_Order_By = {
  number?: Maybe<Order_By>,
  output?: Maybe<Order_By>,
  transactionsCount?: Maybe<Order_By>,
};

export type Epoch_Sum_Fields = {
  __typename?: 'Epoch_sum_fields',
  output: Scalars['String'],
  transactionsCount: Scalars['String'],
};


/** All fields are combined with logical 'AND'. */
export type Hash32HexString_Comparison_Exp = {
  _eq?: Maybe<Scalars['Hash32HexString']>,
  _in?: Maybe<Array<Maybe<Scalars['Hash32HexString']>>>,
  _neq?: Maybe<Scalars['Hash32HexString']>,
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
  blocks_aggregate: Block_Aggregate,
  epochs: Array<Maybe<Epoch>>,
  epochs_aggregate: Epoch_Aggregate,
  cardano?: Maybe<Cardano>,
  transactions: Array<Maybe<Transaction>>,
  transactions_aggregate: Transaction_Aggregate,
  utxos: Array<Maybe<TransactionOutput>>,
  utxos_aggregate: Utxo_Aggregate,
};


export type QueryBlocksArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Block_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Block_Bool_Exp>
};


export type QueryBlocks_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Block_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Block_Bool_Exp>
};


export type QueryEpochsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Epoch_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Epoch_Bool_Exp>
};


export type QueryEpochs_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Epoch_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Epoch_Bool_Exp>
};


export type QueryTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Transaction_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transaction_Bool_Exp>
};


export type QueryTransactions_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Transaction_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transaction_Bool_Exp>
};


export type QueryUtxosArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Utxo_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Utxo_Bool_Exp>
};


export type QueryUtxos_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Utxo_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Utxo_Bool_Exp>
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
  inputs: Array<TransactionInput>,
  inputs_aggregate?: Maybe<Coin_Aggregate>,
  outputs: Array<TransactionOutput>,
  outputs_aggregate?: Maybe<Coin_Aggregate>,
  totalOutput: Scalars['String'],
  includedAt: Scalars['DateTime'],
};


export type TransactionInputsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Maybe<Coin_Order_By>>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Coin_Bool_Exp>
};


export type TransactionInputs_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Maybe<Coin_Order_By>>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Coin_Bool_Exp>
};


export type TransactionOutputsArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Maybe<Coin_Order_By>>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Coin_Bool_Exp>
};


export type TransactionOutputs_AggregateArgs = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Maybe<Coin_Order_By>>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Coin_Bool_Exp>
};

export type Transaction_Aggregate = {
  __typename?: 'Transaction_aggregate',
  aggregate?: Maybe<Transaction_Aggregate_Fields>,
};

export type Transaction_Aggregate_Fields = {
  __typename?: 'Transaction_aggregate_fields',
  avg?: Maybe<Transaction_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Transaction_Max_Fields>,
  min?: Maybe<Transaction_Min_Fields>,
  sum?: Maybe<Transaction_Sum_Fields>,
};

export type Transaction_Avg_Fields = {
  __typename?: 'Transaction_avg_fields',
  fee?: Maybe<Scalars['Float']>,
  totalOutput?: Maybe<Scalars['Float']>,
};

export type Transaction_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Transaction_Bool_Exp>>>,
  _not?: Maybe<Transaction_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Transaction_Bool_Exp>>>,
  block?: Maybe<Block_Bool_Exp>,
  fee?: Maybe<BigInt_Comparison_Exp>,
  id?: Maybe<Hash32HexString_Comparison_Exp>,
  includedAt?: Maybe<Date_Comparison_Exp>,
  inputs?: Maybe<Coin_Bool_Exp>,
  outputs?: Maybe<Coin_Bool_Exp>,
  totalOutput?: Maybe<Text_Comparison_Exp>,
};

export type Transaction_Max_Fields = {
  __typename?: 'Transaction_max_fields',
  fee?: Maybe<Scalars['BigInt']>,
  totalOutput?: Maybe<Scalars['BigInt']>,
};

export type Transaction_Min_Fields = {
  __typename?: 'Transaction_min_fields',
  fee?: Maybe<Scalars['BigInt']>,
  totalOutput?: Maybe<Scalars['BigInt']>,
};

export type Transaction_Order_By = {
  block?: Maybe<Order_By>,
  fee?: Maybe<Order_By>,
  includedAt?: Maybe<Order_By>,
  totalOutput?: Maybe<Order_By>,
};

export type Transaction_Sum_Fields = {
  __typename?: 'Transaction_sum_fields',
  fee?: Maybe<Scalars['BigInt']>,
  totalOutput?: Maybe<Scalars['BigInt']>,
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


export type Utxo_Aggregate = {
  __typename?: 'Utxo_aggregate',
  aggregate?: Maybe<Utxo_Aggregate_Fields>,
};

export type Utxo_Aggregate_Fields = {
  __typename?: 'Utxo_aggregate_fields',
  avg?: Maybe<Uxto_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Uxto_Max_Fields>,
  min?: Maybe<Uxto_Min_Fields>,
  sum?: Maybe<Uxto_Sum_Fields>,
};

export type Utxo_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Utxo_Bool_Exp>>>,
  _not?: Maybe<Utxo_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Utxo_Bool_Exp>>>,
  address?: Maybe<Text_Comparison_Exp>,
  value?: Maybe<Text_Comparison_Exp>,
};

export type Utxo_Order_By = {
  address?: Maybe<Order_By>,
  value?: Maybe<Order_By>,
  index?: Maybe<Order_By>,
};

export type Uxto_Avg_Fields = {
  __typename?: 'Uxto_avg_fields',
  value?: Maybe<Scalars['String']>,
};

export type Uxto_Max_Fields = {
  __typename?: 'Uxto_max_fields',
  value?: Maybe<Scalars['String']>,
};

export type Uxto_Min_Fields = {
  __typename?: 'Uxto_min_fields',
  value?: Maybe<Scalars['String']>,
};

export type Uxto_Sum_Fields = {
  __typename?: 'Uxto_sum_fields',
  value?: Maybe<Scalars['String']>,
};
export type BlockDetailsFragment = ({ __typename?: 'Block' } & Pick<Block, 'createdAt' | 'createdBy' | 'id' | 'merkelRootHash' | 'number' | 'size' | 'slotWithinEpoch'> & { epoch: Maybe<({ __typename?: 'Epoch' } & Pick<Epoch, 'number'>)>, previousBlock: Maybe<({ __typename?: 'Block' } & Pick<Block, 'id' | 'number'>)>, transactions_aggregate: ({ __typename?: 'Transaction_aggregate' } & { aggregate: Maybe<({ __typename?: 'Transaction_aggregate_fields' } & Pick<Transaction_Aggregate_Fields, 'count'> & { sum: Maybe<({ __typename?: 'Transaction_sum_fields' } & Pick<Transaction_Sum_Fields, 'totalOutput'>)> })> }) });

export type BlockInfoFragment = ({ __typename?: 'Block' } & Pick<Block, 'id' | 'number' | 'size' | 'slotWithinEpoch'>);

export type BlockOverviewFragment = ({ __typename?: 'Block' } & Pick<Block, 'createdAt' | 'createdBy' | 'id' | 'number' | 'size' | 'slotWithinEpoch'> & { epoch: Maybe<({ __typename?: 'Epoch' } & Pick<Epoch, 'number'>)>, transactions_aggregate: ({ __typename?: 'Transaction_aggregate' } & { aggregate: Maybe<({ __typename?: 'Transaction_aggregate_fields' } & Pick<Transaction_Aggregate_Fields, 'count'> & { sum: Maybe<({ __typename?: 'Transaction_sum_fields' } & Pick<Transaction_Sum_Fields, 'totalOutput'>)> })> }) });

export type GetBlocksInRangeQueryVariables = {
  lower: Scalars['Int'],
  upper: Scalars['Int']
};


export type GetBlocksInRangeQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & BlockOverviewFragment)>> });

export type GetLatestBlocksQueryVariables = {
  limit?: Maybe<Scalars['Int']>
};


export type GetLatestBlocksQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & BlockOverviewFragment)>> });

export type EpochDetailsFragment = ({ __typename?: 'Epoch' } & { blocks: Array<({ __typename?: 'Block' } & BlockInfoFragment)> } & EpochOverviewFragment);

export type EpochOverviewFragment = ({ __typename?: 'Epoch' } & Pick<Epoch, 'lastBlockTime' | 'number' | 'startedAt' | 'output' | 'transactionsCount'> & { blocks_aggregate: ({ __typename?: 'Block_aggregate' } & { aggregate: Maybe<({ __typename?: 'Block_aggregate_fields' } & Pick<Block_Aggregate_Fields, 'count'>)> }) });

export type GetEpochsInRangeQueryVariables = {
  lower: Scalars['Int'],
  upper: Scalars['Int']
};


export type GetEpochsInRangeQuery = ({ __typename?: 'Query' } & { epochs: Array<Maybe<({ __typename?: 'Epoch' } & EpochOverviewFragment)>> });

export type GetLatestEpochsQueryVariables = {
  limit?: Maybe<Scalars['Int']>
};


export type GetLatestEpochsQuery = ({ __typename?: 'Query' } & { epochs: Array<Maybe<({ __typename?: 'Epoch' } & EpochOverviewFragment)>> });

export type CardanoDynamicQueryVariables = {};


export type CardanoDynamicQuery = ({ __typename?: 'Query' } & { cardano: Maybe<({ __typename?: 'Cardano' } & Pick<Cardano, 'blockHeight'> & { currentEpoch: ({ __typename?: 'Epoch' } & Pick<Epoch, 'lastBlockTime' | 'number'>) })> });

export type CardanoStaticQueryVariables = {};


export type CardanoStaticQuery = ({ __typename?: 'Query' } & { cardano: Maybe<({ __typename?: 'Cardano' } & Pick<Cardano, 'protocolConst' | 'startTime' | 'slotDuration'>)> });

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

export type TransactionDetailsFragment = ({ __typename?: 'Transaction' } & Pick<Transaction, 'fee' | 'id' | 'includedAt' | 'totalOutput'> & { block: Maybe<({ __typename?: 'Block' } & Pick<Block, 'id' | 'slotWithinEpoch'> & { epoch: Maybe<({ __typename?: 'Epoch' } & Pick<Epoch, 'number'>)> })>, inputs: Array<({ __typename?: 'TransactionInput' } & Pick<TransactionInput, 'sourceTxIndex' | 'address' | 'value'>)>, outputs: Array<({ __typename?: 'TransactionOutput' } & Pick<TransactionOutput, 'address' | 'index' | 'txId' | 'value'>)> });
