import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { blockOverviewTransformer } from '../api/transformers';
import { createBlocksFeature, IBlocksFeature } from '../index';
import { latestBlocksExample } from './helpers/latestBlocksExample';

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
      expect(blocks.store.latestBlocks).toEqual(
        expect.arrayContaining(
          latestBlocksExample.map(blockOverviewTransformer)
        )
      );
    }, 8000);
  }, 10000);
});
