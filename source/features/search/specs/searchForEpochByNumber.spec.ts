import waitForExpect from 'wait-for-expect';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleEpochData } from './helpers/exampleEpochData';

describe('Searching for an epoch', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = createSearchFeature();
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
        expect(epochSearchResult).toMatchObject(exampleEpochData);
        if (epochSearchResult) {
          expect(epochSearchResult.slots).toHaveLength(9484);
          expect(epochSearchResult.slots[0]).toMatchObject({
            number: 21600,
          });
          expect(epochSearchResult.blocks).toHaveLength(9485);
          if (epochSearchResult.blocks) {
            expect(epochSearchResult.blocks[0]).toMatchObject({
              id:
                '1941d944df546dea699791c318aeb9cc63b94e4cdb133d79856cda35bf7ecbb1',
            });
          }
        }
      }, 3000);
    });
  });
});
