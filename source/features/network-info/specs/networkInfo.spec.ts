import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { createNetworkInfoFeature, INetworkInfoFeature } from '../index';

describe('Network information', () => {
  let networkInfo: INetworkInfoFeature;
  beforeEach(async () => {
    networkInfo = createNetworkInfoFeature(apolloClient);
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
      expect(networkInfo.store.slotDuration).toBe(20000);
      expect(networkInfo.store.protocolConst).toBe(2160);
      expect(networkInfo.store.startTime).toStrictEqual(
        new Date('2017-09-23T21:44:51')
      );
      expect(networkInfo.store.blockHeight).toBe(70205);
      expect(networkInfo.store.currentEpoch).toBe(3);
      expect(networkInfo.store.lastBlockTime).toStrictEqual(
        new Date('2017-10-09T16:54:31.000Z')
      );
    });
  });
});
