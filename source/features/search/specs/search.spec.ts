import { searchActions, searchApi, searchStore } from '../index';

describe('Searching', () => {
  describe('transactions', () => {
    describe('by complete valid transaction ID', () => {
      it('retrieves the transaction with expected data', async () => {
        const searchedTxId =
          '927edb96f3386ab91b5f5d85d84cb4253c65b1c2f65fa7df25f81fab1d62987a';
        searchActions.searchTransactionById.trigger({
          id: searchedTxId,
        });
        expect(searchApi.getTransactionByIdQuery.isExecuting).toBe(true);
        const searchResult = await searchApi.getTransactionByIdQuery.execution;
        if (searchResult) {
          const { transactions } = searchResult.data;
          const foundTx = transactions[0];
          expect(transactions).toHaveLength(1);
          expect(foundTx).toMatchObject({
            block: {
              id:
                '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
            },
            fee: '0',
            id: searchedTxId,
            inputs: [],
            outputs: [
              {
                address:
                  'Ae2tdPwUPEZ9vtyppa1FdJzvqJZkEcXgdHxVYAzTWcPaoNycVq5rc36LC1S',
                index: 0,
                txId:
                  '927edb96f3386ab91b5f5d85d84cb4253c65b1c2f65fa7df25f81fab1d62987a',
                value: '538861000000',
              },
            ],
            totalOutput: '538861000000',
          });
          expect(searchStore.searchedTransaction).toEqual(foundTx);
        } else {
          throw new Error('Expected a search result!');
        }
      });
    });
  });
  describe('blocks', () => {
    describe('by complete valid block ID', () => {
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
            id: searchedBlockId,
          });
          expect(searchStore.searchedBlock).toEqual(foundBlock);
        } else {
          throw new Error('Expected a search result!');
        }
      });
    });
  });
});
