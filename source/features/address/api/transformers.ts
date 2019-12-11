import { Currency } from 'cardano-js';
import { SearchForAddressQuery } from '../../../../generated/typings/graphql-schema';
import { IAddressSummary } from '../types';

export const addressDetailTransformer = (
  address: string,
  s: SearchForAddressQuery
): IAddressSummary => ({
  address,
  finalBalance: Currency.Util.lovelacesToAda(
    s.utxos_aggregate?.aggregate?.sum?.value || '0'
  ),
  transactionsCount:
    s.transactions_aggregate?.aggregate?.count.toString() || '0',
});
