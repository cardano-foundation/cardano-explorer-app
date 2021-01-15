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
    tokens: i.tokens
      .filter(({ assetName }) => assetName !== 'ada')
      .map((t) => ({
        ...t,
        assetName: t.assetName || '-',
      })),
  })),
  metadata: tx.metadata?.filter(isDefined).map((i) => ({
    key: i.key,
    value: i.value,
  })),
  outputs: tx.outputs?.filter(isDefined).map((i) => ({
    ...i,
    value: Currency.Util.lovelacesToAda(i.value),
    tokens: i.tokens
      .filter(({ assetName }) => assetName !== 'ada')
      .map((t) => ({
        ...t,
        assetName: t.assetName || '-',
      })),
  })),
  totalOutput: Currency.Util.lovelacesToAda(tx.totalOutput),
  withdrawals:
    tx.withdrawals?.filter(isDefined).map((i) => ({
      address: i.address,
      value: Currency.Util.lovelacesToAda(i.amount),
    })) || [],
  mint:
    tx.mint
      ?.filter((m) => m.quantity > '0')
      .map((i) => ({
        ...i,
        assetName: i.assetName || '-',
      })) || [],
  burn:
    tx.mint
      ?.filter((m) => m.quantity < '0')
      .map((i) => ({
        quantity: i.quantity.substring(1),
        assetName: i.assetName || '-',
      })) || [],
});
