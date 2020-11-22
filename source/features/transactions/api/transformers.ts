import { Currency } from 'cardano-js';
import { TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { isDefined } from '../../../lib/types';
import { ITransactionDetails } from '../types';

export const transactionDetailsTransformer = (
  tx: TransactionDetailsFragment
): ITransactionDetails => ({
  block: {
    epoch: tx.block?.epochNo || '-',
    id: tx.block?.hash,
    number: tx.block?.number,
  },
  deposit: Currency.Util.lovelacesToAda(tx.deposit),
  fee: Currency.Util.lovelacesToAda(tx.fee),
  id: tx.hash,
  includedAt: new Date(tx.includedAt),
  inputs: tx.inputs.map((i) => ({
    ...i,
    sourceTxId: i.sourceTxHash,
    value: Currency.Util.lovelacesToAda(i.value),
  })),
  metadata: tx.metadata,
  outputs: tx.outputs?.filter(isDefined).map((i) => ({
    ...i,
    value: Currency.Util.lovelacesToAda(i.value),
  })),
  totalOutput: Currency.Util.lovelacesToAda(tx.totalOutput),
  withdrawals:
    tx.withdrawals?.filter(isDefined).map((i) => ({
      address: i.address,
      value: Currency.Util.lovelacesToAda(i.amount),
    })) || [],
});
