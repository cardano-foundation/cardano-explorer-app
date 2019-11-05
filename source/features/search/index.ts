import ApolloClient from 'apollo-client';
import Action from '../../lib/Action';
import { NavigationActions } from '../navigation';
import { SearchApi } from './api';
import { SearchStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class SearchActions {
  public idSearchRequested: Action<{ id: string }> = new Action();
  public numberSearchRequested: Action<{ number: number }> = new Action();
  public unknownSearchRequested: Action<{ query: string }> = new Action();
  public searchForBlockById: Action<{ id: string }> = new Action();
  public searchForBlockByNumber: Action<{ number: number }> = new Action();
  public searchForEpochByNumber: Action<{ number: number }> = new Action();
  public searchForTransactionById: Action<{ id: string }> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface ISearchFeature {
  actions: SearchActions;
  api: SearchApi;
  store: SearchStore;
  start: () => void;
  stop: () => void;
}

/**
 * Interfaces to dependencies on other features:
 */
export interface INavigationFeatureDependency {
  actions: NavigationActions;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createSearchFeature = (
  navigation: INavigationFeatureDependency,
  apolloClient: ApolloClient<object>
): ISearchFeature => {
  const searchActions = new SearchActions();
  const searchApi = new SearchApi(apolloClient);
  const searchStore = new SearchStore(searchActions, searchApi, navigation);

  return {
    actions: searchActions,
    api: searchApi,
    store: searchStore,
    start() {
      searchStore.start();
    },
    stop() {
      searchStore.stop();
    },
  };
};
