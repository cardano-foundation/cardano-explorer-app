import { apolloClient } from '../../../utils/graphql/GraphQLProvider';
import { SearchActions } from './actions';
import { SearchApi } from './api';
import { SearchStore } from './store';

export const searchActions = new SearchActions();
export const searchApi = new SearchApi(apolloClient);
export const searchStore = new SearchStore(searchActions, searchApi);
searchStore.start();

export const blocksContextDefault = {
  actions: searchActions,
  api: searchApi,
  store: searchStore,
};
