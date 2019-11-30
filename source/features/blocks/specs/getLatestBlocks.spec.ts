import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { NetworkInfoActions } from '../../network-info';
import { NetworkInfoApi } from '../../network-info/api';
import { NetworkInfoStore } from '../../network-info/store';
import { createBlocksFeature, IBlocksFeature } from '../index';

describe('Blocks feature', () => {
  let blocks: IBlocksFeature;
  let networkInfoStore: NetworkInfoStore;

  beforeEach(async () => {
    networkInfoStore = new NetworkInfoStore(
      new NetworkInfoActions(),
      new NetworkInfoApi(apolloClient)
    );
    await networkInfoStore.start();
    blocks = createBlocksFeature({ store: networkInfoStore }, apolloClient);
  });

  afterEach(() => {
    networkInfoStore.stop();
  });

  describe('startPollingLatestBlocks', () => {
    beforeEach(async () => {
      await blocks.start();
      blocks.actions.startPollingLatestBlocks.trigger();
    });

    it('fetches up to the latest 10 blocks, and provides a status', async () => {
      // Useful for showing loading spinners
      expect(blocks.store.isLoadingLatestBlocksFirstTime).toBe(true);
      // Access the observable result provided by the store
      await waitForExpect(() => {
        expect(blocks.store.latestBlocks.length).toBe(10);
        expect(blocks.store.latestBlocks[0].number).toBe(70205);
        expect(blocks.store.latestBlocks[0].slotWithinEpoch).toBe(5432);
        expect(blocks.store.latestBlocks[4].transactionsCount).toBe('0');
        expect(blocks.store.latestBlocks[1].number).toBe(70204);
      });
      expect(blocks.store.isLoadingLatestBlocksFirstTime).toBe(false);
    });

    afterEach(() => {
      blocks.stop();
    });
  });
});
