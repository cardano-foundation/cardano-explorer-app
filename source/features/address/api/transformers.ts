import { Currency } from 'cardano-js';
import {
  Asset,
  SearchForPaymentAddressQuery,
  SearchForStakeAddressQuery,
} from '../../../../generated/typings/graphql-schema';
import { sortTokensDesc } from '../../../lib/arrays';
import { isDefined } from '../../../lib/types';
import { assetTransformer } from '../../assets/api/transformers';
import { IPaymentAddressSummary, IStakeAddressSummary } from '../types';

export const paymentAddressDetailTransformer = (
  address: string,
  s: SearchForPaymentAddressQuery
): IPaymentAddressSummary => ({
  address,
  finalBalance: Currency.Util.lovelacesToAda(
    s.paymentAddresses![0]?.summary?.assetBalances[0]?.quantity || '0'
  ),
  tokensBalance:
    s
      .paymentAddresses![0]?.summary?.assetBalances?.filter(isDefined)
      .filter(({ asset }) => asset.assetName !== 'ada')
      .map((t) => ({
        ...t,
        asset: assetTransformer(t.asset as Asset)
      }))
      .sort(sortTokensDesc) || [],
  transactionsCount:
    s.transactions_aggregate?.aggregate?.count.toString() || '0',
});

export const stakeAddressDetailTransformer = (
  address: string,
  s: SearchForStakeAddressQuery
): IStakeAddressSummary => ({
  address,
  totalWithdrawals:
    s.withdrawals_aggregate?.aggregate?.count.toString() || '0',
  totalWithdrawn: Currency.Util.lovelacesToAda(
    s.withdrawals_aggregate?.aggregate?.sum?.amount || '0'
  ),
  transactionsCount:
    s.transactions_aggregate?.aggregate?.count.toString() || '0',
});
