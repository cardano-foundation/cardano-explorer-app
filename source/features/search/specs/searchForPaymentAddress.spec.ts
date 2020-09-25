import waitForExpect from 'wait-for-expect';
import { ISearchFeature } from '../index';
import { examplePaymentAddressData } from './helpers/exampleAddressData';
import { setupSearchFeature } from './helpers/setup';

describe('Searching for a payment address summary', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = setupSearchFeature();
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  it('searches for a summary related to the provided payment address', async () => {
    // 1. Trigger action
    search.actions.searchForPaymentAddress.trigger({
      address: examplePaymentAddressData.address,
    });

    // 2. Check the API query status
    expect(search.api.searchForPaymentAddressQuery.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      expect(search.store?.paymentAddressSearchResult?.finalBalance).toBe(
        examplePaymentAddressData.finalBalance
      );
      expect(search.store?.paymentAddressSearchResult?.transactionsCount).toBe(
        examplePaymentAddressData.transactionsCount
      );
    });
  });
});
