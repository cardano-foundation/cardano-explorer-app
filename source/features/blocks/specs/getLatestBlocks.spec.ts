import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { createBlocksFeature, IBlocksFeature } from '../index';

describe('Fetching the latest blocks', () => {
  let blocks: IBlocksFeature;
  beforeEach(() => {
    blocks = createBlocksFeature(apolloClient);
    blocks.start();
  });
  afterEach(() => {
    blocks.stop();
  });

  it('retrieves the latest 10 blocks', async () => {
    // 1. Trigger action to search for a block by id
    blocks.actions.fetchLatestBlocks.trigger();

    // 2. Check the API query status (e.g for showing loading spinners)
    expect(blocks.api.getLatestBlocksQuery.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      expect(blocks.store.latestBlocks.length).toBe(10);
      expect(blocks.store.latestBlocks[0].id).toBe(
        '84e9de7924aba73f58b81e142f4bce7f1d00cf4630f94f631e6ca3594b2d1634'
      );
    });
  });
});
