import { searchActions, searchApi, searchStore } from '../index';

describe('Searching', () => {
  describe('blocks', () => {
    describe('by id', () => {
      it('retrieves the block with given id', async () => {
        const searchedBlockId =
          '84e9de7924aba73f58b81e142f4bce7f1d00cf4630f94f631e6ca3594b2d1634';
        searchActions.searchBlockById.trigger({
          id: searchedBlockId,
        });
        const searchResult = await searchApi.getBlocksByIdsQuery.execution;
        if (searchResult) {
          const { blocks } = searchResult.data;
          expect(blocks).toHaveLength(1);
          const foundBlock = blocks[0];
          if (foundBlock) {
            expect(foundBlock.id).toEqual(searchedBlockId);
            expect(searchStore.searchedBlock).toEqual(blocks[0]);
          }
        } else {
          throw new Error('Expected a search result!');
        }
      });
    });
  });
});
