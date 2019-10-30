import React, { useContext } from 'react';
import Action from '../../lib/Action';
import { apolloClient } from '../../lib/graphql/apolloClient';
import { BlocksApi } from './api';
import { BlocksStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class BlocksActions {
  public fetchLatestBlocks: Action<void> = new Action();
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
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createBlocksFeature = () => {
  const blocksActions = new BlocksActions();
  const blocksApi = new BlocksApi(apolloClient);
  const blocksStore = new BlocksStore(blocksActions, blocksApi);
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

export const blocksContext = React.createContext<IBlocksFeature | null>(null);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useBlocksFeature = () => {
  const inbox = useContext(blocksContext);
  if (!inbox) {
    throw new Error('You need to setup the context before using it.');
  }
  return inbox;
};
