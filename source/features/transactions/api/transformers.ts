import { Currency } from 'cardano-js';
import { TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { ITransactionDetails } from '../types';

export const transactionDetailsTransformer = (
  tx: TransactionDetailsFragment
): ITransactionDetails => ({
  block: {
    epoch: tx.block?.epoch?.number,
    id: tx.block?.id,
    number: tx.block?.number,
  },
  fee: Currency.Util.lovelacesToAda(tx.fee),
  id: tx.id,
  includedAt: new Date(tx.includedAt),
  inputs: tx.inputs.map(i => ({
    ...i,
    value: Currency.Util.lovelacesToAda(i.value),
  })),
  outputs: tx.outputs.map(i => ({
    ...i,
    value: Currency.Util.lovelacesToAda(i.value),
  })),
  totalOutput: Currency.Util.lovelacesToAda(tx.totalOutput),
});
