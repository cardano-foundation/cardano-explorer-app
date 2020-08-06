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
    createdAt: b.forgedAt,
    createdBy: formatCreatedBy(b.slotLeader.description),
    epoch,
    id: b.hash,
    number: b.number || '-',
    output: Currency.Util.lovelacesToAda(
      b.transactions_aggregate?.aggregate?.sum?.totalOutput || '0'
    ),
    slotWithinEpoch: formatSlotWithinEpoch(b.slotInEpoch),
    transactionsCount:
      b.transactions_aggregate?.aggregate?.count.toString() || '0',
  };
};

export const blockDetailsTransformer = (
  b: BlockDetailsFragment
): IBlockDetailed => ({
  ...blockOverviewTransformer(b),
  merkleRoot: b.merkelRoot || '',
  nextBlock: {
    id: b.nextBlock?.hash || '',
    number: b.nextBlock?.number || '-',
  },
  prevBlock: {
    id: b.previousBlock?.hash || '',
    number: b.previousBlock?.number || '-',
  },
  transactions: b.transactions
    .filter(isDefined)
    .map(transactionDetailsTransformer),
});

function formatCreatedBy(value: IBlockOverview['createdBy']): string {
  switch (value) {
    case 'Genesis slot leader':
      return 'Genesis';
    case 'Epoch boundary slot leader':
      return 'EBB';
    default:
      const selection = value.split('-');
      if (!Array.isArray(selection)) {
        return '';
      }
      return selection[1].substring(0, 7);
  }
}

function formatSlotWithinEpoch(
  value: BlockOverviewFragment['slotInEpoch']
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
