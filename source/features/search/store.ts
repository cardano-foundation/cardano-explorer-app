import { computed } from 'mobx';
import {
  SearchForBlockByIdQuery,
  SearchForEpochByNumberQuery,
  SearchForTransactionByIdQuery,
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
          this.searchActions.searchForEpochByNumber,
          this.searchForEpochByNumber,
        ],
        [
          this.searchActions.searchForTransactionById,
          this.searchForTransactionById,
        ],
      ])
    );
  }

  // ========= PUBLIC GETTERS ==========

  @computed.struct get searchedBlock():
    | SearchForBlockByIdQuery['blocks'][0]
    | null {
    const { result } = this.searchApi.searchForBlockByIdQuery;
    if (result) {
      return result.data.blocks[0];
    }
    return null;
  }

  @computed.struct get searchedEpoch():
    | SearchForEpochByNumberQuery['epochs'][0]
    | null {
    const { result } = this.searchApi.searchForEpochByNumberQuery;
    if (result) {
      return result.data.epochs[0];
    }
    return null;
  }

  @computed.struct get searchedTransaction():
    | SearchForTransactionByIdQuery['transactions'][0]
    | null {
    const { result } = this.searchApi.searchForTransactionByIdQuery;
    if (result) {
      return result.data.transactions[0];
    }
    return null;
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  private searchForBlockById = async ({ id }: { id: string }) => {
    await this.searchApi.searchForBlockByIdQuery.execute({ id });
  };

  private searchForEpochByNumber = async (params: { number: number }) => {
    await this.searchApi.searchForEpochByNumberQuery.execute(params);
  };

  private searchForTransactionById = async ({ id }: { id: string }) => {
    await this.searchApi.searchForTransactionByIdQuery.execute({ id });
  };
}
