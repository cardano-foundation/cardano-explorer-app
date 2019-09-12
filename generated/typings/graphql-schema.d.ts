export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
 */
  DateTime: any,
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * BigInt can represent values between -(2^53) + 1 and 2^53 - 1. 
 */
  BigInt: any,
  /** PublicKeyHash string */
  PublicKeyHash: any,
  /** LoveLaces, the atomic unit of ADA */
  LoveLaces: any,
  /** 0-100 */
  Percentage: any,
  /** Unique ticker code for a stake pool, up to 4 characters */
  StakePoolTicker: any,
  /** TransactionHash string */
  TransactionHash: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export type Address = {
  __typename?: 'Address',
  addressType: AddressType,
  delegation?: Maybe<StakePool>,
};

export enum AddressType {
  /** The staking key is directly linked to the address. */
  Base = 'Base',
  /** A pointer to a delegation certificate on the blockchain which defines the staking key. */
  Pointer = 'Pointer',
  /** Staking is not possible. This address type is meant for exchanges, who are not
   * supposed to use funds entrusted to them for protocol participation.
 */
  Enterprise = 'Enterprise'
}


export type Block = {
  __typename?: 'Block',
  createdAt: Scalars['DateTime'],
  epoch?: Maybe<Epoch>,
  fees: Scalars['Int'],
  id: Scalars['ID'],
  merkelRootHash?: Maybe<Scalars['String']>,
  number: Scalars['Int'],
  previousBlock?: Maybe<Block>,
  size: Scalars['Float'],
  slot: Slot,
  transactions: Array<Maybe<Transaction>>,
};


export type BlockTransactionsArgs = {
  limit: Scalars['Int'],
  orderBy?: Maybe<Array<Transactions_Order_By>>,
  offset?: Maybe<Scalars['Int']>
};

export type Blocks_Filter = {
  dateCreated?: Maybe<Date_Comparison_Exp>,
  id?: Maybe<Id_Comparison_Exp>,
  number?: Maybe<Int_Comparison_Exp>,
};

export type Blocks_Order_By = {
  number?: Maybe<Order_By>,
  size?: Maybe<Order_By>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cardano = {
  __typename?: 'Cardano',
  blockHeight: Scalars['BigInt'],
  configuration: Configuration,
  currentEpoch: Epoch,
  latestBlock: Block,
  stakeDistribution: Array<StakePool>,
};

export type Configuration = {
  __typename?: 'Configuration',
  fees?: Maybe<FeeConfiguration>,
};

export enum Currency {
  Ada = 'ADA'
}

export type CurrencyValue = {
  __typename?: 'CurrencyValue',
  currency: Currency,
  amount: Scalars['BigInt'],
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
  output?: Maybe<Array<Maybe<CurrencyValue>>>,
  number: Scalars['Int'],
  slots?: Maybe<Array<Slot>>,
  stakeDistribution?: Maybe<Array<StakePool>>,
  startedAt?: Maybe<Scalars['DateTime']>,
  transactions?: Maybe<Array<Maybe<Transaction>>>,
  transactionsCount?: Maybe<Scalars['Int']>,
};

export type Epochs_Filter = {
  afterDate?: Maybe<Scalars['DateTime']>,
  beforeDate?: Maybe<Scalars['DateTime']>,
  number?: Maybe<Int_Comparison_Exp>,
};

export type Epochs_Order_By = {
  blockCount?: Maybe<Order_By>,
  number?: Maybe<Order_By>,
  fees?: Maybe<Order_By>,
};

export type FeeConfiguration = {
  __typename?: 'FeeConfiguration',
  base?: Maybe<Scalars['LoveLaces']>,
  coefficient?: Maybe<Scalars['LoveLaces']>,
};

/** All fields are combined with logical 'AND'. */
export type Id_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>,
  _in?: Maybe<Array<Maybe<Scalars['String']>>>,
  _nin?: Maybe<Array<Maybe<Scalars['String']>>>,
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

export type Mutation = {
  __typename?: 'Mutation',
  delegateStake: Scalars['Boolean'],
  registerStakePool: Scalars['Boolean'],
  submitTransaction: Scalars['Boolean'],
};


export type MutationDelegateStakeArgs = {
  transaction?: Maybe<Scalars['TransactionHash']>
};


export type MutationRegisterStakePoolArgs = {
  transaction?: Maybe<Scalars['TransactionHash']>
};


export type MutationSubmitTransactionArgs = {
  transaction?: Maybe<Scalars['TransactionHash']>
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
  stakePools: Array<StakePool>,
  transactions: Array<Maybe<Transaction>>,
  utxoSet: Array<Maybe<TransactionOutput>>,
};


export type QueryBlocksArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Blocks_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Blocks_Filter>
};


export type QueryEpochsArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Epochs_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Epochs_Filter>
};


export type QueryStakePoolsArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<StakePools_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<StakePools_Filter>
};


export type QueryTransactionsArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<Transactions_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Transactions_Filter>
};


export type QueryUtxoSetArgs = {
  limit: Scalars['Int'],
  order_by?: Maybe<Array<UtxoSet_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<UtxoSet_Filter>
};

export type RewardPayout = {
  __typename?: 'RewardPayout',
  slot?: Maybe<Slot>,
  amount?: Maybe<Scalars['LoveLaces']>,
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

export type StakePool = {
  __typename?: 'StakePool',
  controlledStake: Scalars['LoveLaces'],
  createdAt: Scalars['DateTime'],
  description: Scalars['String'],
  id: Scalars['String'],
  isCharity: Scalars['Boolean'],
  ownStake: Scalars['LoveLaces'],
  performance?: Maybe<Scalars['Percentage']>,
  profitMargin: Scalars['Int'],
  name: Scalars['String'],
  ranking: Scalars['Int'],
  retirement?: Maybe<Scalars['DateTime']>,
  retiring: Scalars['Boolean'],
  rewardPayouts: Array<Maybe<RewardPayout>>,
  slotsElected: Array<Maybe<Slot>>,
  ticker: Scalars['StakePoolTicker'],
  url: Scalars['String'],
};

export type StakePools_Filter = {
  createdAt?: Maybe<Date_Comparison_Exp>,
  controlledStake?: Maybe<Lovelaces_Comparison_Exp>,
  isCharity?: Maybe<Scalars['Boolean']>,
  ownStake?: Maybe<Lovelaces_Comparison_Exp>,
  performance?: Maybe<Percentage_Comparison_Exp>,
  profitMargin?: Maybe<Int_Comparison_Exp>,
  ranking?: Maybe<Int_Comparison_Exp>,
  retiring?: Maybe<Scalars['Boolean']>,
};

export type StakePools_Order_By = {
  createdAt?: Maybe<Order_By>,
  controlledStake?: Maybe<Order_By>,
  isCharity?: Maybe<Order_By>,
  ownStake?: Maybe<Order_By>,
  performance?: Maybe<Order_By>,
  profitMargin?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  ranking?: Maybe<Order_By>,
  retiring?: Maybe<Order_By>,
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
  /** Date the transaction was included in the blockchain, referencing the slot start date */
  fee: Scalars['Int'],
  id: Scalars['String'],
  includedAt: Scalars['DateTime'],
  inputs: Array<Maybe<TransactionInput>>,
  outputs: Array<TransactionOutput>,
};


export type TransactionInput = {
  __typename?: 'TransactionInput',
  sourceTxId: Scalars['String'],
  sourceTxIndex: Scalars['Int'],
  address: Scalars['String'],
  value: CurrencyValue,
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput',
  address: Scalars['String'],
  index: Scalars['Int'],
  txId: Scalars['String'],
  value: CurrencyValue,
};

export type Transactions_Filter = {
  /** dateCreated: Date_comparison_exp */
  id?: Maybe<Id_Comparison_Exp>,
  block?: Maybe<Blocks_Filter>,
};

export type Transactions_Order_By = {
  block?: Maybe<Order_By>,
  fee?: Maybe<Order_By>,
};


export type UtxoSet_Filter = {
  address?: Maybe<Text_Comparison_Exp>,
};

export type UtxoSet_Order_By = {
  address?: Maybe<Order_By>,
};
export type GetBlocksQueryVariables = {
  limit?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Blocks_Order_By>>,
  offset?: Maybe<Scalars['Int']>,
  where?: Maybe<Blocks_Filter>
};


export type GetBlocksQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & Pick<Block, 'id'> & { transactions: Array<Maybe<({ __typename?: 'Transaction' } & Pick<Transaction, 'id'>)>> })>> });
