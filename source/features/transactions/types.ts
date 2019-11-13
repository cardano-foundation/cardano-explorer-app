import { IBlockDetailed } from '../blocks/types';

export interface ITransactionDetails {
  address: string;
  block: {
    id?: IBlockDetailed['id'];
    number?: IBlockDetailed['number'];
  };
  epoch?: number;
  id: string;
  fee: number;
  receivedTime: number;
  slot?: number | null;
  totalOutput: number;
}
