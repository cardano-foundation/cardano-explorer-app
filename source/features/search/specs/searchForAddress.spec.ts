import waitForExpect from 'wait-for-expect';
import { ISearchFeature } from '../index';
import { exampleAddressData } from './helpers/exampleAddressData';
import { setupSearchFeature } from './helpers/setup';

describe('Searching for an address summary', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = setupSearchFeature();
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  it('searches for a summary related to the provided address', async () => {
    // 1. Trigger action
    search.actions.searchForAddress.trigger({
      address: exampleAddressData.address,
    });

    // 2. Check the API query status
    expect(search.api.searchForAddressQuery.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      expect(search.store?.addressSearchResult?.finalBalance).toBe(
        exampleAddressData.finalBalance
      );
      expect(search.store?.addressSearchResult?.transactionsCount).toBe(
        exampleAddressData.transactionsCount
      );
    });
  });
});
