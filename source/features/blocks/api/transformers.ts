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
    slotWithinEpoch: formatSlotWithinEpoch(b.slotNo),
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
  switch (value.substring(0, 13)) {
    case 'ByronGenesis-':
      return value.substring(13, 21);
    case 'Epoch boundar':
      return 'EBB';
    case 'Genesis slot ':
      return 'Genesis';
    default:
      throw new Error('Unexpected IBlockOverview.createdBy value');
  }
}

function formatSlotWithinEpoch(
  value: BlockOverviewFragment['slotNo']
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
