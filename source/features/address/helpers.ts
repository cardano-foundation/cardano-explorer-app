import { ADDRESS_SEARCH_RESULT_PATH } from './config';

export const getAddressRoute = (address: string) =>
  `${ADDRESS_SEARCH_RESULT_PATH}?address=${address}`;
