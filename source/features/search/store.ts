import { computed } from 'mobx';
import {
  GetBlocksQuery,
  GetTransactionsQuery,
} from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { SearchActions } from './actions';
import { SearchApi } from './api';

export class SearchStore extends Store {
  private readonly searchApi: SearchApi;
  private readonly searchActions: SearchActions;

  constructor(searchActions: SearchActions, searchApi: SearchApi) {
    super();
    this.searchApi = searchApi;
    this.searchActions = searchActions;

    this.registerActions(
      createActionBindings([
        [this.searchActions.searchBlockById, this.searchBlockById],
        [this.searchActions.searchTransactionById, this.searchTransactionById],
      ])
    );
  }

  // ========= PUBLIC GETTERS ==========

  @computed.struct get searchedBlock(): GetBlocksQuery['blocks'][0] | null {
    const { result } = this.searchApi.getBlockByIdQuery;
    if (result) {
      return result.data.blocks[0];
    }
    return null;
  }

  @computed.struct get searchedTransaction():
    | GetTransactionsQuery['transactions'][0]
    | null {
    const { result } = this.searchApi.getTransactionByIdQuery;
    if (result) {
      return result.data.transactions[0];
    }
    return null;
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  private searchBlockById = async ({ id }: { id: string }) => {
    try {
      await this.searchApi.getBlockByIdQuery.execute({
        where: { id: { _eq: id } },
      });
    } catch (error) {
      // TODO: handle network errors here
      throw error;
    }
  };

  private searchTransactionById = async ({ id }: { id: string }) => {
    try {
      await this.searchApi.getTransactionByIdQuery.execute({
        where: { id: { _eq: id } },
      });
    } catch (error) {
      // TODO: handle network errors here
      throw error;
    }
  };
}
