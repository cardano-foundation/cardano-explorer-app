import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { NavigationActions } from '../../navigation';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleTransactionData } from './helpers/exampleTransactionData';

describe('Searching for a transaction', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = createSearchFeature(
      { actions: new NavigationActions() },
      apolloClient
    );
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  describe('by a complete and valid ID', () => {
    it('retrieves the transaction with expected data', async () => {
      // 1. Trigger action to search for a transaction by id
      search.actions.searchForTransactionById.trigger({
        id: exampleTransactionData.id,
      });

      // 2. Check the API query status (e.g for showing loading spinners)
      expect(search.api.searchForTransactionByIdQuery.isExecuting).toBe(true);

      // 3. Access the observable search result provided by the store
      await waitForExpect(() => {
        expect(
          search &&
            search.store &&
            search.store.transactionSearchResult &&
            search.store.transactionSearchResult.totalOutput
        ).toEqual(538861);
      });
    });
  });
});
