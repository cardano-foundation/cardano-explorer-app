import { BlocksActions } from './actions';
import { BlocksApi } from './api';
import { BlocksStore } from './store';

export interface IBlocksContext {
  actions: BlocksActions;
  api: BlocksApi;
  store: BlocksStore;
}
