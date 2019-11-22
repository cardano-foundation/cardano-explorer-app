import {
  BlockDetailsFragment,
  BlockOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isNotNull } from '../../../lib/types';
import { lovelacesToAda } from '../../../lib/unit-converters';
import { transactionDetailsTransformer } from '../../transactions/api/transformers';
import { IBlockDetailed, IBlockOverview } from '../types';

export const blockOverviewTransformer = (
  b: BlockOverviewFragment
): IBlockOverview => {
  const blockCreatorPrefix = b.createdBy.substring(0, 11);
  const createdBy =
    blockCreatorPrefix === 'SlotLeader-'
      ? b.createdBy.substring(11, 18)
      : b.createdBy;
  return {
    createdAt: b.createdAt,
    createdBy,
    epoch: b.epochNo,
    id: b.id,
    number: b.number || 0,
    output: lovelacesToAda(
      b.transactions_aggregate?.aggregate?.sum?.totalOutput
    ),
    size: b.size,
    slotWithinEpoch: b.slotWithinEpoch || null,
    transactionsCount: b.transactions_aggregate?.aggregate?.count || 0,
  };
};

export const blockDetailsTransformer = (
  b: BlockDetailsFragment
): IBlockDetailed => ({
  ...blockOverviewTransformer(b),
  merkleRoot: b.merkelRootHash || '',
  nextBlock: '', // TODO: missing API data
  prevBlock: {
    id: b.previousBlock?.id || '',
    number: b.previousBlock?.number || null,
  },
  transactions: b.transactions
    .filter(isNotNull)
    .map(transactionDetailsTransformer),
});
