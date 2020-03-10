import { BLOCK_SEARCH_RESULT_PATH } from './config';

export const getBlockRoute = (blockId: string) =>
  `${BLOCK_SEARCH_RESULT_PATH}?id=${blockId}`;
