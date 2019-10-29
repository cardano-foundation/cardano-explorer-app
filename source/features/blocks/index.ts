import { apolloClient } from '../../lib/graphql/apolloClient';
import { BlocksActions } from './actions';
import { BlocksApi } from './api';
import { BlocksStore } from './store';

export const blocksActions = new BlocksActions();
export const blocksApi = new BlocksApi(apolloClient);
export const blocksStore = new BlocksStore(blocksActions, blocksApi);
blocksStore.start();

export const blocksContextDefault = {
  actions: blocksActions,
  api: blocksApi,
  store: blocksStore,
};
