import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { createEpochsFeature, IEpochsFeature } from '../index';

describe('Fetching the latest epochs', () => {
  let epochs: IEpochsFeature;
  beforeEach(() => {
    epochs = createEpochsFeature(apolloClient);
    epochs.start();
  });
  afterEach(() => {
    epochs.stop();
  });

  it('retrieves the latest 5 epochs', async () => {
    // 1. Trigger action to search for a block by id
    epochs.actions.fetchLatestEpochs.trigger();

    // 2. Check the API query status (e.g for showing loading spinners)
    expect(epochs.api.getLatestEpochsQuery.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      expect(epochs.store.latestEpochs.length).toBe(2);
      expect(epochs.store.latestEpochs[0].blocksCount).toBe(9485);
    });
  });
});
