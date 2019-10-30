import React from 'react';
import Action from '../../lib/Action';
import { apolloClient } from '../../lib/graphql/apolloClient';
import { ensureContextExists } from '../../lib/react/hooks';
import { EpochsApi } from './api';
import { EpochsStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class EpochsActions {
  public fetchLatestEpochs: Action<void> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface IEpochsFeature {
  actions: EpochsActions;
  api: EpochsApi;
  store: EpochsStore;
  start: () => void;
  stop: () => void;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createEpochsFeature = (): IEpochsFeature => {
  const epochsActions = new EpochsActions();
  const epochsApi = new EpochsApi(apolloClient);
  const epochsStore = new EpochsStore(epochsActions, epochsApi);
  return {
    actions: epochsActions,
    api: epochsApi,
    store: epochsStore,
    start() {
      epochsStore.start();
    },
    stop() {
      epochsStore.stop();
    },
  };
};

/**
 * React context used for this feature
 */
export const epochsContext = React.createContext<IEpochsFeature | null>(null);

/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useEpochsFeature = (): IEpochsFeature =>
  ensureContextExists<IEpochsFeature>(epochsContext);
