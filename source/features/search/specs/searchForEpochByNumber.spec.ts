import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { NavigationActions } from '../../navigation';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleEpochData } from './helpers/exampleEpochData';

describe('Searching for an epoch', () => {
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
        expect(epochSearchResult && epochSearchResult.blocksCount).toBe(9484);
        expect(epochSearchResult && epochSearchResult.output).toBe(
          '17282903106.01776'
        );
        expect(epochSearchResult && epochSearchResult.transactionsCount).toBe(
          '5344'
        );
      });
    });
  });
});
