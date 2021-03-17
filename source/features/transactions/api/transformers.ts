import BigNumber from 'bignumber.js';
import { Currency } from 'cardano-js';
import { Asset, TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { sortTokensDesc } from '../../../lib/arrays';
import { isDefined } from '../../../lib/types';
import { assetTransformer } from '../../assets/api/transformers';
import { ITransactionDetails } from '../types';

export const transactionDetailsTransformer = (
  tx: TransactionDetailsFragment
): ITransactionDetails => ({
  block: {
    epoch: tx.block?.epochNo || '-',
    id: tx.block?.hash,
    number: tx.block?.number,
  },
  burn:
    tx.mint
      ?.filter((m) => new BigNumber(m.quantity).isLessThan(0))
      .map((t) => ({
        ...t,
        asset: assetTransformer(t.asset as Asset),
        quantity: t.quantity.substring(1),
      }))
      .sort(sortTokensDesc) || [],
  deposit: Currency.Util.lovelacesToAda(tx.deposit),
  fee: Currency.Util.lovelacesToAda(tx.fee),
  id: tx.hash,
  includedAt: new Date(tx.includedAt),
  inputs: tx.inputs.map((i) => ({
    ...i,
    sourceTxId: i.sourceTxHash,
    tokens: i.tokens
      .map((t) => ({
        ...t,
        asset: assetTransformer(t.asset as Asset)
      }))
      .sort(sortTokensDesc),
    value: Currency.Util.lovelacesToAda(i.value),
  })),
  metadata: tx.metadata?.filter(isDefined).map((i) => ({
    key: i.key,
    value: i.value,
  })),
  mint:
    tx.mint
      ?.filter((m) => new BigNumber(m.quantity).isGreaterThan(0))
      .map((t) => ({
        ...t,
        asset: assetTransformer(t.asset as Asset)
      }))
      .sort(sortTokensDesc) || [],
  outputs: tx.outputs?.filter(isDefined).map((i) => ({
    ...i,
    tokens: i.tokens
      .map((t) => ({
        ...t,
        asset: assetTransformer(t.asset as Asset)
      }))
      .sort(sortTokensDesc),
    value: Currency.Util.lovelacesToAda(i.value),
  })),
  totalOutput: Currency.Util.lovelacesToAda(tx.totalOutput),
  withdrawals:
    tx.withdrawals?.filter(isDefined).map((i) => ({
      address: i.address,
      value: Currency.Util.lovelacesToAda(i.amount),
    })) || [],
});
