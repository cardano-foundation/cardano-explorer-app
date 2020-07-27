import waitForExpect from 'wait-for-expect';
import { ISearchFeature } from '../index';
import { exampleBlockData } from './helpers/exampleBlockData';
import { setupSearchFeature } from './helpers/setup';

describe('Searching for a block', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = setupSearchFeature();
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  describe('by complete and valid ID', () => {
    it('retrieves the block with expected data', async () => {
      // 1. Trigger action to search for a block by id
      search.actions.searchById.trigger({
        id: exampleBlockData.id,
      });

      // 2. Check the API query status (e.g for showing loading spinners)
      expect(search.api.searchByIdQuery.isExecuting).toBe(true);

      // 3. Access the observable search result provided by the store
      await waitForExpect(() => {
        expect(search.store?.blockSearchResult?.createdAt).toBe(
          '2017-10-01T02:26:51Z'
        );
        expect(search.store?.blockSearchResult?.transactionsCount).toBe('0');
      });
    });
  });
});
