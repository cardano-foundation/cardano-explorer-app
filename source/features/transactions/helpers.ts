import { TRANSACTION_SEARCH_RESULT_PATH } from './config';

export const getTransactionRoute = (txId: string) =>
  `${TRANSACTION_SEARCH_RESULT_PATH}?id=${txId}`;
