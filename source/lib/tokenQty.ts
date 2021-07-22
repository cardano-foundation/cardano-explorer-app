import BigNumber from 'bignumber.js';
import { IToken } from '../features/transactions/types';

export const tokenQty = (token: IToken): string =>
  token.asset?.decimals === undefined
    ? token.quantity
    : new BigNumber(token.quantity)
      .shiftedBy(-token.asset.decimals)
      .toString()
