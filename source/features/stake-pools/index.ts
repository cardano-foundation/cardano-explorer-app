import { StakePoolsActions } from './actions';
import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';

export const stakePoolsActions = new StakePoolsActions();
export const stakePoolsApi = new StakePoolsApi();
export const stakePoolsStore = new StakePoolsStore(
  stakePoolsActions,
  stakePoolsApi
);
stakePoolsStore.start();
export const stakePoolsContextDefault = {
  actions: stakePoolsActions,
  api: stakePoolsApi,
  store: stakePoolsStore,
};
