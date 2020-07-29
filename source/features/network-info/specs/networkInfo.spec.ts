import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../../../lib/graphql/graphqlClient';
import { createNetworkInfoFeature, INetworkInfoFeature } from '../index';

describe('Network information', () => {
  let networkInfo: INetworkInfoFeature;
  beforeEach(async () => {
    networkInfo = createNetworkInfoFeature(graphqlClient);
    await networkInfo.start();
  });
  afterEach(() => {
    networkInfo.stop();
  });

  it('separates static and dynamic network fetching', async () => {
    // 1. Trigger action to search for a block by id
    networkInfo.actions.fetchStatic.trigger({});
    networkInfo.actions.fetchDynamic.trigger({});

    // 2. Check the API query status (e.g for showing loading spinners)
    expect(networkInfo.api.fetchStatic.isExecuting).toBe(true);
    expect(networkInfo.api.fetchDynamic.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      // expect(networkInfo.store.slotDuration).toBe(20000);
      // expect(networkInfo.store.slotsPerPresentEpoch).toBe(21600);
      expect(networkInfo.store.blockHeight).toBeGreaterThan(4000893);
      expect(networkInfo.store.currentEpoch).toBeGreaterThan(184);
    });
  });
});
