import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { NavigationActions } from '../../navigation';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleBlockData } from './helpers/exampleBlockData';

describe('Searching for a block', () => {
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
  describe('by its number', () => {
    it('retrieves the block with expected data', async () => {
      // 1. Trigger action to search for a block by number
      search.actions.searchForBlockByNumber.trigger({
        number: exampleBlockData.number,
      });

      // 2. Check the API query status (e.g for showing loading spinners)
      expect(search.api.searchForBlockByNumberQuery.isExecuting).toBe(true);

      // 3. Access the observable search result provided by the store
      await waitForExpect(() => {
        expect(
          search.store.blockSearchResult &&
            search.store.blockSearchResult.prevBlock
        ).toBe(
          '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec'
        );
        expect(
          search.store.blockSearchResult &&
            search.store.blockSearchResult.transactions
        ).toBe(0);
      });
    });
  });
});
