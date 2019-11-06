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

  describe('start', () => {
    beforeEach(async () => {
      await blocks.start();
    });

    it('fetches up to the latest 10 blocks, and provides a status', async () => {
      // Useful for showing loading spinners
      expect(blocks.store.isLoadingFirstTime).toBe(true);
      // Access the observable result provided by the store
      await waitForExpect(() => {
        expect(blocks.store.latestBlocks.length).toBe(10);
        expect(blocks.store.latestBlocks[0].number).toBe(31070);
        expect(blocks.store.latestBlocks[4].transactions).toBe(2);
        expect(blocks.store.latestBlocks[1].number).toBe(31069);
      });
      expect(blocks.store.isLoadingFirstTime).toBe(false);
    });

    afterEach(() => {
      blocks.stop();
    });
  });
});
