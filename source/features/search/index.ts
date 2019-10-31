import ApolloClient from 'apollo-client';
import React, { useContext } from 'react';
import Action from '../../lib/Action';
import { SearchApi } from './api';
import { SearchStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class SearchActions {
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
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createSearchFeature = (
  apolloClient: ApolloClient<object>
): ISearchFeature => {
  const searchActions = new SearchActions();
  const searchApi = new SearchApi(apolloClient);
  const searchStore = new SearchStore(searchActions, searchApi);

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

/**
 * The React context that can be reused and configured with instances
 * of the search feature (also multiple times on one page)
 */
export const searchContext = React.createContext<ISearchFeature | null>(null);

/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useSearchFeature = () => {
  const inbox = useContext(searchContext);
  if (!inbox) {
    throw new Error('You need to setup the inbox context before using it.');
  }
  return inbox;
};
