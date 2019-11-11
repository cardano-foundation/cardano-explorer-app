import { TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { lovelacesStringToAdaNumber } from '../../../lib/unit-converters';
import { ITransactionDetails } from '../types';

export const transactionDetailsTransformer = (
  tx: TransactionDetailsFragment
): ITransactionDetails => ({
  address: '[ADDRESS]', // TODO: missing address in API
  block: {
    height: tx.block?.number,
    id: tx.block?.id,
  },
  epoch: tx.block?.epoch?.number,
  fee: lovelacesStringToAdaNumber(tx.fee),
  id: tx.id,
  receivedTime: tx.includedAt,
  slot: tx.block?.slotWithinEpoch,
  totalOutput: lovelacesStringToAdaNumber(tx.totalOutput),
});
