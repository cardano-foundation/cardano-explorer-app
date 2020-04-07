import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../../../lib/graphql/graphqlClient';
import { BlocksActions } from '../../blocks';
import { BlocksApi } from '../../blocks/api';
import { BlocksStore } from '../../blocks/store';
import { NetworkInfoActions } from '../../network-info';
import { NetworkInfoApi } from '../../network-info/api';
import { NetworkInfoStore } from '../../network-info/store';
import { createEpochsFeature, IEpochsFeature } from '../index';

describe('Epochs feature', () => {
  let epochs: IEpochsFeature;
  let networkInfoStore: NetworkInfoStore;
  let blocksStore: BlocksStore;

  beforeEach(async () => {
    networkInfoStore = new NetworkInfoStore(
      new NetworkInfoActions(),
      new NetworkInfoApi(graphqlClient)
    );
    blocksStore = new BlocksStore(
      new BlocksActions(),
      new BlocksApi(graphqlClient),
      {
        store: networkInfoStore,
      }
    );
    await networkInfoStore.start();
    epochs = createEpochsFeature(
      { store: blocksStore },
      { store: networkInfoStore },
      graphqlClient
    );
  });

  afterEach(() => {
    networkInfoStore.stop();
  });

  describe('start', () => {
    beforeEach(async () => {
      await epochs.start();
      epochs.actions.startPollingLatestEpochs.trigger();
    });

    it('fetches up to the latest 5 epochs, and provides a status', async () => {
      // Useful for showing loading spinners
      expect(epochs.store.isLoadingLatestEpochsFirstTime).toBe(true);
      // Access the observable result provided by the store
      await waitForExpect(() => {
        expect(epochs.store.latestEpochs.length).toBe(5);
        expect(epochs.store.latestEpochs[0].number).toBeDefined();
        expect(epochs.store.latestEpochs[0].blocksCount).toBeDefined();
        expect(epochs.store.latestEpochs[1].number).toBeDefined();
      });
      expect(epochs.store.isLoadingLatestEpochsFirstTime).toBe(false);
    });

    afterEach(() => {
      epochs.stop();
    });
  });
});
