import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';
import { StakePoolsActions } from './actions';

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
