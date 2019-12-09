import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../../../lib/graphql/graphqlClient';
import { NavigationActions } from '../../navigation';
import { NetworkInfoActions } from '../../network-info';
import { NetworkInfoApi } from '../../network-info/api';
import { NetworkInfoStore } from '../../network-info/store';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleTransactionData } from './helpers/exampleTransactionData';

describe('Searching for a transaction', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = createSearchFeature(
      graphqlClient,
      { actions: new NavigationActions() },
      {
        store: new NetworkInfoStore(
          new NetworkInfoActions(),
          new NetworkInfoApi(graphqlClient)
        ),
      }
    );
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  describe('by a complete and valid ID', () => {
    it('retrieves the transaction with expected data', async () => {
      // 1. Trigger action to search for a transaction by id
      search.actions.searchById.trigger({
        id: exampleTransactionData.id,
      });

      // 2. Check the API query status (e.g for showing loading spinners)
      expect(search.api.searchByIdQuery.isExecuting).toBe(true);

      // 3. Access the observable search result provided by the store
      await waitForExpect(() => {
        expect(search.store?.transactionSearchResult?.totalOutput).toEqual(
          '538861'
        );
      });
    });
  });
});
