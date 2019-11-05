import ApolloClient from 'apollo-client';
import Action from '../../lib/Action';
import { NetworkInfoApi } from './api';
import { NetworkInfoStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class NetworkInfoActions {
  public fetchDynamic: Action<{}> = new Action();
  public fetchStatic: Action<{}> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface INetworkInfoFeature {
  actions: NetworkInfoActions;
  api: NetworkInfoApi;
  store: NetworkInfoStore;
  start: () => void;
  stop: () => void;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createNetworkInfoFeature = (
  apolloClient: ApolloClient<object>
): INetworkInfoFeature => {
  const networkInfoActions = new NetworkInfoActions();
  const networkInfoApi = new NetworkInfoApi(apolloClient);
  const networkInfoStore = new NetworkInfoStore(
    networkInfoActions,
    networkInfoApi
  );
  let pollingInterval: NodeJS.Timeout;

  return {
    actions: networkInfoActions,
    api: networkInfoApi,
    store: networkInfoStore,
    start() {
      networkInfoStore.start();
      // Static information only needs to be fetched once
      networkInfoActions.fetchStatic.trigger({});
      // Dynamic information is assumed to be changing with slot duration
      // Polling frequency is set at double this rate.
      // (should be dynamic based networkInfoStore.slotDuration)
      pollingInterval = setInterval(() => {
        networkInfoActions.fetchDynamic.trigger({});
      }, 10000);
    },
    stop() {
      clearInterval(pollingInterval);
      networkInfoStore.stop();
    },
  };
};
