import { get } from 'lodash';
import { TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { ITransactionDetails } from '../types';

export const transactionDetailsTransformer = (
  tx: TransactionDetailsFragment
): ITransactionDetails => ({
  address: '[ADDRESS]', // TODO: missing address in API
  block: get(tx, 'block.id'),
  epoch: get(tx, 'block.epoch.number'),
  fee: parseInt(get(tx, 'fee'), 10),
  receivedTime: get(tx, 'includedAt'),
  slot: get(tx, 'block.slotNo'),
  totalOutput: parseInt(get(tx, 'totalOutput'), 10),
});
