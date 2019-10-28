import { apolloClient } from '../../lib/graphql/apolloClient';
import { SearchActions } from './actions';
import { SearchApi } from './api';
import { SearchStore } from './store';

export const searchActions = new SearchActions();
export const searchApi = new SearchApi(apolloClient);
export const searchStore = new SearchStore(searchActions, searchApi);
searchStore.start();

export const searchContextDefault = {
  actions: searchActions,
  api: searchApi,
  store: searchStore,
};
