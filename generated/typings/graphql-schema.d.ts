export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type Block = {
  __typename?: 'Block',
  hash: Scalars['String'],
  id: Scalars['ID'],
  merkleRootHash: Scalars['String'],
  number: Scalars['Int'],
  previousBlock?: Maybe<Block>,
  size: Scalars['Float'],
  slot: Slot,
  transactions: Array<Maybe<Transaction>>,
};

export type BlockFilter = {
  afterHeight?: Maybe<Scalars['Int']>,
  beforeHeight?: Maybe<Scalars['Int']>,
  epoch?: Maybe<Scalars['Int']>,
  slot?: Maybe<Scalars['Int']>,
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}


export type Epoch = {
  __typename?: 'Epoch',
  blocks: Array<Maybe<Block>>,
  number: Scalars['Int'],
  slots: Array<Slot>,
  transactions?: Maybe<Array<Maybe<Transaction>>>,
};

export type Ledger = {
  __typename?: 'Ledger',
  blockHeight: Scalars['Int'],
};

export type Mempool = {
  __typename?: 'Mempool',
  transaction: Transaction,
  transactionCount: Scalars['Int'],
  transactions: Array<Maybe<Transaction>>,
};


export type MempoolTransactionArgs = {
  id: Scalars['ID']
};


export type MempoolTransactionsArgs = {
  id: Scalars['ID']
};

export type Query = {
  __typename?: 'Query',
  blocks: Array<Block>,
  epochs: Array<Epoch>,
  transactions: Array<Maybe<Transaction>>,
};


export type QueryBlocksArgs = {
  filter?: Maybe<BlockFilter>,
  ids?: Maybe<Array<Scalars['String']>>
};


export type QueryEpochsArgs = {
  numbers?: Maybe<Array<Scalars['Int']>>
};


export type QueryTransactionsArgs = {
  filter?: Maybe<TransactionFilter>,
  hashes?: Maybe<Array<Scalars['String']>>
};

export type Slot = {
  __typename?: 'Slot',
  block?: Maybe<Block>,
  epoch: Epoch,
};

export type Transaction = {
  __typename?: 'Transaction',
  fee: Scalars['Float'],
  hash: Scalars['String'],
  id: Scalars['ID'],
  inputs: Array<TransactionInput>,
  outputs: Array<TransactionOutput>,
};

export type TransactionFilter = {
  epoch?: Maybe<Scalars['Int']>,
  hashes?: Maybe<Array<Maybe<Scalars['String']>>>,
  inBlockId?: Maybe<Scalars['ID']>,
  inBlockNo?: Maybe<Scalars['Int']>,
  includedAfter?: Maybe<Scalars['DateTime']>,
  includedBefore?: Maybe<Scalars['DateTime']>,
  slot?: Maybe<Scalars['Int']>,
};

export type TransactionInput = {
  __typename?: 'TransactionInput',
  address: Scalars['String'],
  sourceTxId: Scalars['String'],
  sourceTxOutputIndex: Scalars['Int'],
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput',
  address: Scalars['String'],
  value: Scalars['Int'],
};

export type GetBlocksQueryVariables = {
  ids?: Maybe<Array<Scalars['String']>>
};


export type GetBlocksQuery = ({ __typename?: 'Query' } & { blocks: Array<({ __typename?: 'Block' } & Pick<Block, 'id'> & { transactions: Array<Maybe<({ __typename?: 'Transaction' } & Pick<Transaction, 'hash'>)>> })> });
