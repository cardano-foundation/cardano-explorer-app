import { searchActions, searchApi, searchStore } from '../index';

describe('Searching for a transaction', () => {
  describe('by a complete and valid ID', () => {
    it('retrieves the transaction with expected data', async () => {
      const searchedTxId =
        '927edb96f3386ab91b5f5d85d84cb4253c65b1c2f65fa7df25f81fab1d62987a';
      searchActions.searchForTransactionById.trigger({
        id: searchedTxId,
      });
      expect(searchApi.searchForTransactionByIdQuery.isExecuting).toBe(true);
      const searchResult = await searchApi.searchForTransactionByIdQuery
        .execution;
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
