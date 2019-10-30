import { action, observable } from 'mobx';
import {
  BlockDetailsFragment,
  EpochDetailsFragment,
  TransactionDetailsFragment,
} from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { SearchApi } from './api';
import { SearchActions } from './index';

export class SearchStore extends Store {
  @observable public blockSearchResult: BlockDetailsFragment | null = null;
  @observable public epochSearchResult: EpochDetailsFragment | null = null;
  @observable
  public transactionSearchResult: TransactionDetailsFragment | null = null;

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
          this.searchActions.searchForBlockByNumber,
          this.searchForBlockByNumber,
        ],
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

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private searchForBlockById = async ({ id }: { id: string }) => {
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByIdQuery.execute({ id });
    if (result) {
      this.blockSearchResult = result.data.blocks[0];
    }
  };

  @action private searchForBlockByNumber = async (params: {
    number: number;
  }) => {
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByNumberQuery.execute(
      params
    );
    if (result) {
      this.blockSearchResult = result.data.blocks[0];
    }
  };

  @action private searchForEpochByNumber = async (params: {
    number: number;
  }) => {
    this.epochSearchResult = null;
    const result = await this.searchApi.searchForEpochByNumberQuery.execute(
      params
    );
    if (result) {
      this.epochSearchResult = result.data.epochs[0];
    }
  };

  private searchForTransactionById = async ({ id }: { id: string }) => {
    this.transactionSearchResult = null;
    const result = await this.searchApi.searchForTransactionByIdQuery.execute({
      id,
    });
    if (result) {
      this.transactionSearchResult = result.data.transactions[0];
    }
  };
}
