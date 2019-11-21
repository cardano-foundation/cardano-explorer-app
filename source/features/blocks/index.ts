import { ApolloClient } from 'apollo-client';

import Action from '../../lib/Action';
import { INetworkInfoFeature } from '../network-info';
import { BlocksApi } from './api';
import { BlocksStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class BlocksActions {
  public browseBlocks: Action<{ lower: number; upper: number }> = new Action();
  public fetchLatestBlocks: Action<void> = new Action();
  public startPollingLatestBlocks: Action<void> = new Action();
  public stopPollingLatestBlocks: Action<void> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface IBlocksFeature {
  actions: BlocksActions;
  api: BlocksApi;
  store: BlocksStore;
  start: () => void;
  stop: () => void;
}

/**
 * Interfaces to dependencies on other features:
 */
export interface INetworkInfoFeatureDependency {
  store: INetworkInfoFeature['store'];
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createBlocksFeature = (
  networkInfo: INetworkInfoFeatureDependency,
  apolloClient: ApolloClient<object>
): IBlocksFeature => {
  const blocksActions = new BlocksActions();
  const blocksApi = new BlocksApi(apolloClient);
  const blocksStore = new BlocksStore(blocksActions, blocksApi, networkInfo);
  return {
    actions: blocksActions,
    api: blocksApi,
    store: blocksStore,
    start() {
      blocksStore.start();
    },
    stop() {
      blocksStore.stop();
    },
  };
};
