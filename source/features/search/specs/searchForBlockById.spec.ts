import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../../../lib/graphql/apolloClient';
import { NavigationActions } from '../../navigation';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleBlockData } from './helpers/exampleBlockData';

describe('Searching for a block', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = createSearchFeature(new NavigationActions(), apolloClient);
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  describe('by complete and valid ID', () => {
    it('retrieves the block with expected data', async () => {
      // 1. Trigger action to search for a block by id
      search.actions.searchForBlockById.trigger({
        id: exampleBlockData.id,
      });

      // 2. Check the API query status (e.g for showing loading spinners)
      expect(search.api.searchForBlockByIdQuery.isExecuting).toBe(true);

      // 3. Access the observable search result provided by the store
      await waitForExpect(() => {
        expect(
          search &&
            search.store &&
            search.store.blockSearchResult &&
            search.store.blockSearchResult.createdAt
        ).toBe('2017-10-01T02:26:51');
        expect(
          search &&
            search.store &&
            search.store.blockSearchResult &&
            search.store.blockSearchResult.transactions
        ).toBe(0);
      });
    });
  });
});
