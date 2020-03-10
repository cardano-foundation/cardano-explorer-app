import { EPOCH_SEARCH_RESULT_PATH } from './config';

export const getEpochRoute = (epoch: number) =>
  `${EPOCH_SEARCH_RESULT_PATH}?number=${epoch}`;
