import { Currency } from 'cardano-js';
import { TransactionDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { sortTokensDesc } from '../../../lib/arrays';
import { decodeHex } from '../../../lib/decodeHex';
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
  burn:
    tx.mint
      ?.filter((m) => m.quantity < '0')
      .map((i) => ({
        ...i,
        assetName: decodeHex(i.assetName!.substr(2)) || '-',
        quantity: i.quantity.substring(1),
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
        assetName: decodeHex(t.assetName!.substr(2)) || '-',
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
      ?.filter((m) => m.quantity > '0')
      .map((i) => ({
        ...i,
        assetName: decodeHex(i.assetName!.substr(2)) || '-',
      }))
      .sort(sortTokensDesc) || [],
  outputs: tx.outputs?.filter(isDefined).map((i) => ({
    ...i,
    tokens: i.tokens
      .map((t) => ({
        ...t,
        assetName: decodeHex(t.assetName!.substr(2)) || '-',
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
