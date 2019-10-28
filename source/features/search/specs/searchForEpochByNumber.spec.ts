import { searchActions, searchApi, searchStore } from '../index';

describe('Searching for an epoch', () => {
  describe('by number', () => {
    it('retrieves the epoch with expected data', async () => {
      const searchedEpochNumber = 1;
      searchActions.searchForEpochByNumber.trigger({
        number: searchedEpochNumber,
      });
      expect(searchApi.searchForEpochByNumberQuery.isExecuting).toBe(true);
      const searchResult = await searchApi.searchForEpochByNumberQuery
        .execution;
      if (searchResult) {
        const { epochs } = searchResult.data;
        expect(epochs).toHaveLength(1);
        const foundEpoch = epochs[0];
        expect(foundEpoch).toMatchObject({
          endedAt: '2017-10-01T02:25:51+00:00',
          output: '17282903106017760',
          startedAt: '2017-09-28T21:45:51+00:00',
          transactionsCount: '5344',
        });
        if (foundEpoch) {
          expect(foundEpoch.slots).toHaveLength(9484);
          expect(foundEpoch.slots[0]).toMatchObject({ number: 21600 });
          expect(foundEpoch.blocks).toHaveLength(9485);
          if (foundEpoch.blocks) {
            expect(foundEpoch.blocks[0]).toMatchObject({
              id:
                '1941d944df546dea699791c318aeb9cc63b94e4cdb133d79856cda35bf7ecbb1',
            });
          }
        }
        expect(searchStore.searchedEpoch).toEqual(foundEpoch);
      } else {
        throw new Error('Expected a search result!');
      }
    });
  });
});
