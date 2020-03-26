import { Currency } from 'cardano-js';
import {
  BlockDetailsFragment,
  BlockOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isDefined } from '../../../lib/types';
import { transactionDetailsTransformer } from '../../transactions/api/transformers';
import { IBlockDetailed, IBlockOverview } from '../types';

export const blockOverviewTransformer = (
  b: BlockOverviewFragment
): IBlockOverview => {
  let epoch: number | '-';
  if (!b.epochNo && b.epochNo !== 0) {
    epoch = '-';
  } else {
    epoch = b.epochNo;
  }
  return {
    ...b,
    createdBy: formatCreatedBy(b.createdBy),
    epoch,
    number: b.number || '-',
    output: Currency.Util.lovelacesToAda(
      b.transactions_aggregate?.aggregate?.sum?.totalOutput || '0'
    ),
    slotWithinEpoch: formatSlotWithinEpoch(b.slotWithinEpoch),
    transactionsCount:
      b.transactions_aggregate?.aggregate?.count.toString() || '0',
  };
};

export const blockDetailsTransformer = (
  b: BlockDetailsFragment
): IBlockDetailed => ({
  ...blockOverviewTransformer(b),
  merkleRoot: b.merkelRootHash || '',
  nextBlock: {
    id: b.nextBlock?.id || '',
    number: b.nextBlock?.number || '-',
  },
  prevBlock: {
    id: b.previousBlock?.id || '',
    number: b.previousBlock?.number || '-',
  },
  transactions: b.transactions
    .filter(isDefined)
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

function formatSlotWithinEpoch(
  value: BlockOverviewFragment['slotWithinEpoch']
): IBlockOverview['slotWithinEpoch'] {
  switch (value) {
    case 0:
      return value;
    case null || undefined:
      return '-';
    default:
      return value || '-';
  }
}
