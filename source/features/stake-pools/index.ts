// import { apolloClient } from '../../utils/graphql/GraphQLProvider';
import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';

// export const stakePoolsApi = new StakePoolsApi(apolloClient);
export const stakePoolsApi = new StakePoolsApi();
export const stakePoolsStore = new StakePoolsStore(stakePoolsApi);
stakePoolsStore.start();

export const blocksContextDefault = {
  api: stakePoolsApi,
  store: stakePoolsStore,
};
