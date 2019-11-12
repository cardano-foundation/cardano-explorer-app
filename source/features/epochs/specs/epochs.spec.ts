import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
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
      new NetworkInfoApi(apolloClient)
    );
    blocksStore = new BlocksStore(new BlocksApi(apolloClient), {
      store: networkInfoStore,
    });
    await networkInfoStore.start();
    epochs = createEpochsFeature(
      { store: blocksStore },
      { store: networkInfoStore },
      apolloClient
    );
  });

  afterEach(() => {
    networkInfoStore.stop();
  });

  describe('start', () => {
    beforeEach(async () => {
      await epochs.start();
    });

    it('fetches up to the latest 5 epochs, and provides a status', async () => {
      // Useful for showing loading spinners
      expect(epochs.store.isLoadingFirstTime).toBe(true);
      // Access the observable result provided by the store
      await waitForExpect(() => {
        expect(epochs.store.latestEpochs.length).toBe(2);
        expect(epochs.store.latestEpochs[0].number).toBe(1);
        expect(epochs.store.latestEpochs[0].blocksCount).toBe(9484);
        expect(epochs.store.latestEpochs[1].number).toBe(0);
      });
      expect(epochs.store.isLoadingFirstTime).toBe(false);
    });

    afterEach(() => {
      epochs.stop();
    });
  });
});
