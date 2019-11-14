import { lovelacesToAda } from 'cardano-js/dist/Currency';
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
  fee: lovelacesToAda(tx.fee),
  id: tx.id,
  includedAt: new Date(tx.includedAt),
  inputs: tx.inputs.map(i => ({
    ...i,
    value: lovelacesToAda(i.value),
  })),
  outputs: tx.outputs.map(i => ({
    ...i,
    value: lovelacesToAda(i.value),
  })),
  totalOutput: lovelacesToAda(tx.totalOutput),
});
