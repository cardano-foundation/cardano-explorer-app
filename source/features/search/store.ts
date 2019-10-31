import { action, computed, observable } from 'mobx';
import {
  BlockOverviewFragment,
  EpochDetailsFragment,
  TransactionDetailsFragment,
} from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { blockDetailsTransformer } from '../blocks/api/transformers';
import { IBlockDetailed } from '../blocks/types';
import { epochDetailsTransformer } from '../epochs/api/transformers';
import { IEpochDetails } from '../epochs/types';
import { SearchApi } from './api';
import { SearchActions } from './index';

export class SearchStore extends Store {
  @observable public blockSearchResult: IBlockDetailed | null = null;
  @observable public epochSearchResult: IEpochDetails | null = null;
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

  @computed get isSearching() {
    return (
      this.searchApi.searchForBlockByIdQuery.isExecuting ||
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.searchApi.searchForEpochByNumberQuery.isExecuting ||
      this.searchApi.searchForTransactionByIdQuery.isExecuting
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  @action private searchForBlockById = async ({ id }: { id: string }) => {
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByIdQuery.execute({ id });
    if (result) {
      const isBlock = (b: any): b is BlockOverviewFragment => b != null;
      const blockData = result.data.blocks[0];
      if (isBlock(blockData)) {
        this.blockSearchResult = blockDetailsTransformer(blockData);
      }
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
      const isBlock = (b: any): b is BlockOverviewFragment => b != null;
      const blockData = result.data.blocks[0];
      if (isBlock(blockData)) {
        this.blockSearchResult = blockDetailsTransformer(blockData);
      }
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
      const isEpoch = (b: any): b is EpochDetailsFragment => b != null;
      const epochData = result.data.epochs[0];
      if (isEpoch(epochData)) {
        this.epochSearchResult = epochDetailsTransformer(epochData);
      }
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
