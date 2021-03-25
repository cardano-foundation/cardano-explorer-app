import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../../../lib/graphql/graphqlClient';
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
      new NetworkInfoApi(graphqlClient)
    );
    await networkInfoStore.start();
    blocks = createBlocksFeature({ store: networkInfoStore }, graphqlClient);
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
        expect(blocks.store.latestBlocks[0].number).toBeDefined();
        expect(blocks.store.latestBlocks[0].slotNo).toBeDefined();
        expect(blocks.store.latestBlocks[4].transactionsCount).toBeDefined();
        expect(blocks.store.latestBlocks[1].number).toBeDefined();
      });
      expect(blocks.store.isLoadingLatestBlocksFirstTime).toBe(false);
    });

    afterEach(() => {
      blocks.stop();
    });
  });
});
