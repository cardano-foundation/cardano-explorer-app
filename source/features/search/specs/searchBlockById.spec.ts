import { searchActions, searchApi, searchStore } from '../index';

describe('searchBlockById', () => {
  describe('searching an existing block by complete valid ID', () => {
    it('retrieves the block with expected data', async () => {
      const searchedBlockId =
        '84e9de7924aba73f58b81e142f4bce7f1d00cf4630f94f631e6ca3594b2d1634';
      searchActions.searchBlockById.trigger({
        id: searchedBlockId,
      });
      expect(searchApi.getBlockByIdQuery.isExecuting).toBe(true);
      const searchResult = await searchApi.getBlockByIdQuery.execution;
      if (searchResult) {
        const { blocks } = searchResult.data;
        expect(blocks).toHaveLength(1);
        const foundBlock = blocks[0];
        expect(foundBlock).toMatchObject({
          epoch: {
            number: 1,
          },
          id: searchedBlockId,
          merkelRootHash:
            '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8',
          number: 31070,
          previousBlock: {
            id:
              '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec',
          },
          size: 666,
          slot: {
            number: 31086,
          },
          transactions: [],
        });
        expect(searchStore.searchedBlock).toEqual(foundBlock);
      } else {
        throw new Error('Expected a search result!');
      }
    });
  });
});
