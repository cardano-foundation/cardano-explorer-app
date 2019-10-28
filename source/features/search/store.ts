import { computed } from 'mobx';
import {
  GetTransactionsQuery,
  SearchBlockByIdQuery,
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
        [this.searchActions.searchForBlockById, this.searchForBlockById],
        [
          this.searchActions.searchForTransactionById,
          this.searchForTransactionById,
        ],
      ])
    );
  }

  // ========= PUBLIC GETTERS ==========

  @computed.struct get searchedBlock():
    | SearchBlockByIdQuery['blocks'][0]
    | null {
    const { result } = this.searchApi.searchForBlockByIdQuery;
    if (result) {
      return result.data.blocks[0];
    }
    return null;
  }

  @computed.struct get searchedTransaction():
    | GetTransactionsQuery['transactions'][0]
    | null {
    const { result } = this.searchApi.searchForTransactionByIdQuery;
    if (result) {
      return result.data.transactions[0];
    }
    return null;
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  private searchForBlockById = async ({ id }: { id: string }) => {
    try {
      await this.searchApi.searchForBlockByIdQuery.execute({ id });
    } catch (error) {
      // TODO: handle network errors here
      throw error;
    }
  };

  private searchForTransactionById = async ({ id }: { id: string }) => {
    try {
      await this.searchApi.searchForTransactionByIdQuery.execute({
        where: { id: { _eq: id } },
      });
    } catch (error) {
      // TODO: handle network errors here
      throw error;
    }
  };
}
