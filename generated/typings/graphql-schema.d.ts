export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * BigInt can represent values between -(2^53) + 1 and 2^53 - 1. 
 */
  BigInt: any,
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
 */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



export type Block = {
  __typename?: 'Block',
  id: Scalars['ID'],
  merkelRootHash?: Maybe<Scalars['String']>,
  number: Scalars['Int'],
  previousBlockNo?: Maybe<Scalars['Int']>,
  /** previousBlock: Block */
  size: Scalars['Float'],
  slotNo?: Maybe<Scalars['Int']>,
  transactions: Array<Maybe<Transaction>>,
};


export type BlockTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>
};

export type BlockFilter = {
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>,
  numbers?: Maybe<Array<Maybe<Scalars['Int']>>>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Ledger = {
  __typename?: 'Ledger',
  blockHeight: Scalars['Int'],
};

export type Query = {
  __typename?: 'Query',
  blocks: Array<Maybe<Block>>,
  transactions: Array<Maybe<Transaction>>,
  ledger?: Maybe<Ledger>,
};


export type QueryBlocksArgs = {
  filter: BlockFilter,
  first?: Maybe<Scalars['Int']>
};


export type QueryTransactionsArgs = {
  filter: TransactionFilter,
  first?: Maybe<Scalars['Int']>
};

export type Transaction = {
  __typename?: 'Transaction',
  blockNo?: Maybe<Scalars['Int']>,
  fee: Scalars['Int'],
  id: Scalars['String'],
  inputs: Array<Maybe<TransactionInput>>,
  outputs: Array<TransactionOutput>,
};

export type TransactionFilter = {
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type TransactionInput = {
  __typename?: 'TransactionInput',
  sourceTxId: Scalars['String'],
  sourceTxIndex: Scalars['Int'],
  address: Scalars['String'],
  value: Scalars['BigInt'],
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput',
  txId: Scalars['String'],
  index: Scalars['Int'],
  value: Scalars['BigInt'],
  address: Scalars['String'],
};

export type GetBlocksQueryVariables = {
  filter: BlockFilter
};


export type GetBlocksQuery = ({ __typename?: 'Query' } & { blocks: Array<Maybe<({ __typename?: 'Block' } & Pick<Block, 'id'> & { transactions: Array<Maybe<({ __typename?: 'Transaction' } & Pick<Transaction, 'id'>)>> })>> });
