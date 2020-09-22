import waitForExpect from 'wait-for-expect';
import { ISearchFeature } from '../index';
import { exampleStakeAddressData } from './helpers/exampleAddressData';
import { setupSearchFeature } from './helpers/setup';

describe('Searching for a stake address summary', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = setupSearchFeature();
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  it('searches for a summary related to the provided stake address', async () => {
    // 1. Trigger action
    search.actions.searchForStakeAddress.trigger({
      address: exampleStakeAddressData.address,
    });

    // 2. Check the API query status
    expect(search.api.searchForStakeAddressQuery.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      expect(search.store?.stakeAddressSearchResult?.totalWithdrawn).toBe(
        exampleStakeAddressData.totalWithdrawn
      );
      expect(search.store?.stakeAddressSearchResult?.transactionsCount).toBe(
        exampleStakeAddressData.transactionsCount
      );
    });
  });
});
