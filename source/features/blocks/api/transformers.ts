import { get } from 'lodash';
import {
  BlockDetailsFragment,
  BlockInfoFragment,
  BlockOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { lovelacesToAda } from '../../../lib/unit-converters';
import { IBlockDetailed, IBlockInfo, IBlockOverview } from '../types';

export const blockInfoTransformer = (b: BlockInfoFragment): IBlockInfo => ({
  id: b.id,
  number: b.number || 0,
  size: b.size,
  slotNo: b.slotNo ? b.slotNo : 0,
});

export const blockOverviewTransformer = (
  b: BlockOverviewFragment
): IBlockOverview => {
  const blockCreatorPrefix = b.createdBy.substring(0, 11);
  const createdBy =
    blockCreatorPrefix === 'SlotLeader-'
      ? b.createdBy.substring(12, 18)
      : b.createdBy;
  return {
    ...blockInfoTransformer(b),
    createdAt: b.createdAt,
    createdBy,
    epoch: get(b, 'epoch.number', 0),
    output: lovelacesToAda(
      get(b, 'transactions_aggregate.aggregate.sum.totalOutput', 0)
    ),
    transactions: get(b, 'transactions_aggregate.aggregate.count', 0),
  };
};

export const blockDetailsTransformer = (
  b: BlockDetailsFragment
): IBlockDetailed => ({
  ...blockOverviewTransformer(b),
  confirmations: 1, // TODO: Calculate confirmations using Cardano.blockHeight
  merkleRoot: get(b, 'merkelRootHash', ''),
  nextBlock: '', // TODO: missing API data
  prevBlock: get(b, 'previousBlock.id', ''),
});
