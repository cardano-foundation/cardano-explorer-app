import { GraphQLClient } from 'graphql-request';
import Action from '../../lib/Action';
import { NavigationActions } from '../navigation';
import { NavigationStore } from '../navigation/store';
import { NetworkInfoStore } from '../network-info/store';
import { SearchApi } from './api';
import { SearchStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class SearchActions {
  public addressNotFound: Action<{ address: string }> = new Action();
  public addressSearchRequested: Action<{ address: string }> = new Action();
  public blockNumberSearchRequested: Action<{ number: number }> = new Action();
  public epochNumberSearchRequested: Action<{ number: number }> = new Action();
  public idSearchRequested: Action<{ id: string }> = new Action();
  public searchById: Action<{ id: string }> = new Action();
  public searchForPaymentAddress: Action<{ address: string }> = new Action();
  public searchForStakeAddress: Action<{ address: string }> = new Action();
  public searchForBlockByNumber: Action<{ number: number }> = new Action();
  public searchForBlockBySlotNumber: Action<{ slotNo: number }> = new Action();
  public searchForEpochByNumber: Action<{ number: number }> = new Action();
  public slotNumberSearchRequested: Action<{ slotNo: number }> = new Action();
  public subscribeToEpoch: Action<{ number: number }> = new Action();
  public unknownSearchRequested: Action<{ query: string }> = new Action();
  public unsubscribeFromEpoch: Action<void> = new Action();
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
  store: NavigationStore;
}

export interface INetworkInfoFeatureDependency {
  store: NetworkInfoStore;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createSearchFeature = (
  graphqlClient: GraphQLClient,
  navigation: INavigationFeatureDependency,
  networkInfo: INetworkInfoFeatureDependency
): ISearchFeature => {
  const searchActions = new SearchActions();
  const searchApi = new SearchApi(graphqlClient);
  const searchStore = new SearchStore(
    searchActions,
    searchApi,
    navigation,
    networkInfo
  );

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
