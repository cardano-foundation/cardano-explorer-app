import { GraphQLClient } from 'graphql-request';
import Action from '../../lib/Action';
import { TransactionsApi } from './api';
import { TransactionsStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class TransactionsActions {
  public browseBlocksTransactions: Action<{
    blockId: string;
    offset: number;
    limit: number;
  }> = new Action();
  public browseAddressTransactions: Action<{
    address: string;
    offset: number;
    limit: number;
  }> = new Action();
  public handleAcceptUnmoderatedData: Action<any> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface ITransactionsFeature {
  actions: TransactionsActions;
  api: TransactionsApi;
  store: TransactionsStore;
  start: () => void;
  stop: () => void;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createTransactionsFeature = (
  graphqlClient: GraphQLClient
): ITransactionsFeature => {
  const actions = new TransactionsActions();
  const api = new TransactionsApi(graphqlClient);
  const store = new TransactionsStore(actions, api);
  return {
    actions,
    api,
    store,
    start() {
      store.start();
    },
    stop() {
      store.stop();
    },
  };
};
