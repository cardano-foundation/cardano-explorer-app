import { get } from 'lodash';
import { TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { lovelacesToAda } from '../../../lib/unit-converters';
import { ITransactionDetails } from '../types';

export const transactionDetailsTransformer = (
  tx: TransactionDetailsFragment
): ITransactionDetails => ({
  address: '[ADDRESS]', // TODO: missing address in API
  block: get(tx, 'block.id'),
  epoch: get(tx, 'block.epoch.number'),
  fee: lovelacesToAda(parseInt(get(tx, 'fee'), 10)),
  id: get(tx, 'id'),
  receivedTime: get(tx, 'includedAt'),
  slot: get(tx, 'block.slotNo'),
  totalOutput: lovelacesToAda(parseInt(get(tx, 'totalOutput'), 10)),
});
