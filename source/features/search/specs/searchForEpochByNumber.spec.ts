import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../../../lib/graphql/graphqlClient';
import { NavigationActions } from '../../navigation';
import { NetworkInfoActions } from '../../network-info';
import { NetworkInfoApi } from '../../network-info/api';
import { NetworkInfoStore } from '../../network-info/store';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleEpochData } from './helpers/exampleEpochData';

describe('Searching for an epoch', () => {
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
  describe('by number', () => {
    it('retrieves the epoch with expected data', async () => {
      // 1. Trigger action to search for a block by number
      search.actions.searchForEpochByNumber.trigger({
        number: exampleEpochData.number,
      });
      // 2. Check the API query status (e.g for showing loading spinners)
      expect(search.api.searchForEpochByNumberQuery.isExecuting).toBe(true);

      // 3. Expect the observable search result to be provided by the store
      await waitForExpect(() => {
        const { epochSearchResult } = search.store;
        expect(epochSearchResult?.blocksCount).toBe(21589);
        expect(epochSearchResult?.output).toBe('101402912214.21422');
        expect(epochSearchResult?.transactionsCount).toBe('12870');
      });
    });
  });
});
