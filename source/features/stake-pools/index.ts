import { GraphQLClient } from 'graphql-request';
import Action from '../../lib/Action';
import { INetworkInfoFeature } from '../network-info';
import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class StakePoolsActions {
  public handleAcceptUnmoderatedData: Action<any> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface IStakePoolsFeature {
  actions: StakePoolsActions;
  api: StakePoolsApi;
  store: StakePoolsStore;
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
export const createStakePoolsFeature = (
  networkInfo: INetworkInfoFeatureDependency,
  graphqlClient: GraphQLClient
): IStakePoolsFeature => {
  const stakePoolsActions = new StakePoolsActions();
  const stakePoolsApi = new StakePoolsApi(graphqlClient);
  const stakePoolsStore = new StakePoolsStore(stakePoolsActions, stakePoolsApi);
  return {
    actions: stakePoolsActions,
    api: stakePoolsApi,
    store: stakePoolsStore,
    start() {
      return stakePoolsStore.start();
    },
    stop() {
      return stakePoolsStore.stop();
    },
  };
};
