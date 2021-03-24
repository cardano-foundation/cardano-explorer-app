import { BLOCK_SEARCH_RESULT_PATH } from '../blocks/config';
import { EPOCH_SEARCH_RESULT_PATH } from '../epochs/config';
import { TRANSACTION_SEARCH_RESULT_PATH } from './config';

export const getTransactionRoute = (txId: string) =>
  `${TRANSACTION_SEARCH_RESULT_PATH}?id=${txId}`;

export const getEpochRoute = (epoch: number) =>
  `${EPOCH_SEARCH_RESULT_PATH}?number=${epoch}`;

export const getBlockRoute = (blockId: string) =>
  `${BLOCK_SEARCH_RESULT_PATH}?id=${blockId}`;

