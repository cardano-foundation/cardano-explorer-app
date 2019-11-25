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
  return {
    createdAt: b.createdAt,
    createdBy: formatCreatedBy(b.createdBy),
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
  nextBlock: {
    id: b.nextBlock?.id || '',
    number: b.nextBlock?.number || null,
  },
  prevBlock: {
    id: b.previousBlock?.id || '',
    number: b.previousBlock?.number || null,
  },
  transactions: b.transactions
    .filter(isNotNull)
    .map(transactionDetailsTransformer),
});

function formatCreatedBy(value: IBlockOverview['createdBy']): string {
  switch (value.substring(0, 11)) {
    case 'SlotLeader-':
      return value.substring(11, 18);
    case 'Epoch bound':
      return 'EBB';
    case 'Genesis slo':
      return 'Genesis';
    default:
      throw new Error('Unexpected IBlockOverview.createdBy value');
  }
}
