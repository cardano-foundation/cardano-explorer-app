import { BlocksActions } from './actions';
import { BlocksApi } from './api';
import { BlocksStore } from './store';

export interface IBlocksContext {
  actions: BlocksActions;
  api: BlocksApi;
  store: BlocksStore;
}

export interface IBlockOverview {
  number: number;
  createdAt: number;
  createdBy: string;
  epoch: number;
  output: number;
  size: number;
  transactions: number;
}
