import { GraphQLClient } from 'graphql-request';
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
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createNetworkInfoFeature = (
  graphqlClient: GraphQLClient
): INetworkInfoFeature => {
  const networkInfoActions = new NetworkInfoActions();
  const networkInfoApi = new NetworkInfoApi(graphqlClient);
  const networkInfoStore = new NetworkInfoStore(
    networkInfoActions,
    networkInfoApi
  );
  return {
    actions: networkInfoActions,
    api: networkInfoApi,
    store: networkInfoStore,
    async start() {
      return networkInfoStore.start();
    },
    async stop() {
      return networkInfoStore.stop();
    },
  };
};
