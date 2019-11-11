import { action, computed, flow, observable, runInAction } from 'mobx';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { blockDetailsTransformer } from '../blocks/api/transformers';
import { IBlockDetailed } from '../blocks/types';
import { epochDetailsTransformer } from '../epochs/api/transformers';
import { IEpochDetails } from '../epochs/types';
import { transactionDetailsTransformer } from '../transactions/api/transformers';
import { ITransactionDetails } from '../transactions/types';
import { SearchApi } from './api';
import { INavigationFeatureDependency, SearchActions } from './index';

export class SearchStore extends Store {
  @observable public blockSearchResult: IBlockDetailed | null = null;
  @observable public epochSearchResult: IEpochDetails | null = null;
  @observable
  public transactionSearchResult: ITransactionDetails | null = null;

  private isRunningBackgroundSearch = false;
  private readonly searchApi: SearchApi;
  private readonly searchActions: SearchActions;
  private readonly navigation: INavigationFeatureDependency;

  constructor(
    searchActions: SearchActions,
    searchApi: SearchApi,
    navigation: INavigationFeatureDependency
  ) {
    super();
    this.searchApi = searchApi;
    this.searchActions = searchActions;
    this.navigation = navigation;

    this.registerActions(
      createActionBindings([
        [this.searchActions.idSearchRequested, this.onIdSearchRequested],
        [
          this.searchActions.numberSearchRequested,
          this.onNumberSearchRequested,
        ],
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
      !this.isRunningBackgroundSearch &&
      (this.searchApi.searchForBlockByIdQuery.isExecuting ||
        this.searchApi.searchForBlockByNumberQuery.isExecuting ||
        this.searchApi.searchForEpochByNumberQuery.isExecuting ||
        this.searchApi.searchForTransactionByIdQuery.isExecuting)
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  /**
   * Executes queries for block and transaction by id to see
   * what the user actually wanted to do.
   *
   * Redirects to the corresponding search result or "no result" page.
   *
   * @param id
   */
  private onIdSearchRequested = async ({ id }: { id: string }) => {
    if (this.isRunningBackgroundSearch) {
      return;
    }
    try {
      this.isRunningBackgroundSearch = true;
      const blocksResult = await this.searchApi.searchForBlockByIdQuery.execute(
        {
          id,
        }
      );
      const txResult = await this.searchApi.searchForTransactionByIdQuery.execute(
        { id }
      );
      let path = '';
      if (blocksResult && blocksResult.data.blocks.length > 0) {
        path = `/block?id=${id}`;
      } else if (txResult && txResult.data.transactions.length > 0) {
        path = `/transaction?id=${id}`;
      } else {
        path = '/no-search-results';
      }
      if (path !== '') {
        this.navigation.actions.redirectTo.trigger({ path });
      }
    } finally {
      this.isRunningBackgroundSearch = false;
    }
  };

  /**
   * Executes queries for block and epoch by number to see
   * what the user actually wanted to find. If there are results
   * for both types we need to ask the user what he wants.
   *
   * TODO: Ask user what he wants when block and epoch have been found
   *
   * Redirects to the corresponding search result or "no result" page.
   *
   * @param params
   */
  @action private onNumberSearchRequested = async (params: {
    number: number;
  }) => {
    if (this.isRunningBackgroundSearch) {
      return;
    }
    try {
      this.isRunningBackgroundSearch = true;
      const blocksResult = await this.searchApi.searchForBlockByNumberQuery.execute(
        params
      );
      const epochsResult = await this.searchApi.searchForEpochByNumberQuery.execute(
        params
      );
      let path = '';
      const hasFoundBlock = blocksResult && blocksResult.data.blocks.length > 0;
      const hasFoundEpoch = epochsResult && epochsResult.data.epochs.length > 0;
      if (hasFoundBlock && !hasFoundEpoch) {
        // https://github.com/kulshekhar/ts-jest/issues/1283
        path = `/block?id=${blocksResult.data &&
          blocksResult.data.blocks &&
          blocksResult.data.blocks[0] &&
          blocksResult.data.blocks[0].id}`;
      } else if (hasFoundEpoch && !hasFoundBlock) {
        path = `/epoch?number=${params.number}`;
      } else if (hasFoundEpoch && hasFoundBlock) {
        // TODO: Handle this case in the UI (e.g: ask user what he wants)
        // tslint:disable-next-line:no-console
        console.error(
          `Found both block and epoch with number ${params.number}`
        );
        // For now we just default to epoch:
        path = `/epoch?number=${params.number}`;
      } else {
        path = '/no-search-results';
      }
      if (path !== '') {
        this.navigation.actions.redirectTo.trigger({ path });
      }
    } finally {
      this.isRunningBackgroundSearch = false;
    }
  };

  @action private searchForBlockById = async ({ id }: { id: string }) => {
    // Do not execute queries more than necessary!
    if (
      this.searchApi.searchForBlockByIdQuery.isExecuting ||
      (this.blockSearchResult && this.blockSearchResult.id === id)
    ) {
      return;
    }
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByIdQuery.execute({ id });
    if (result) {
      const blockData = result.data.blocks[0];
      if (isNotNull(blockData)) {
        runInAction(() => {
          this.blockSearchResult = blockDetailsTransformer(blockData);
        });
      }
    }
  };

  @action private searchForBlockByNumber = async (params: {
    number: number;
  }) => {
    // Do not trigger another search if we already have the requested data!
    if (
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      (this.blockSearchResult &&
        this.blockSearchResult.number === params.number)
    ) {
      return;
    }
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByNumberQuery.execute(
      params
    );
    if (result) {
      const blockData = result.data.blocks[0];
      if (isNotNull(blockData)) {
        runInAction(() => {
          this.blockSearchResult = blockDetailsTransformer(blockData);
        });
      }
    }
  };

  @action private searchForEpochByNumber = async (params: {
    number: number;
  }) => {
    // Do not trigger another search if we already have the requested data!
    if (
      this.searchApi.searchForEpochByNumberQuery.isExecuting ||
      (this.epochSearchResult &&
        this.epochSearchResult.number === params.number)
    ) {
      return;
    }
    this.epochSearchResult = null;
    const result = await this.searchApi.searchForEpochByNumberQuery.execute(
      params
    );
    if (result) {
      const epochData = result.data.epochs[0];
      if (isNotNull(epochData)) {
        runInAction(() => {
          this.epochSearchResult = epochDetailsTransformer(epochData);
        });
      }
    }
  };

  private searchForTransactionById = async ({ id }: { id: string }) => {
    // Do not trigger another search if we already have the requested data!
    if (
      this.searchApi.searchForTransactionByIdQuery.isExecuting ||
      (this.transactionSearchResult && this.transactionSearchResult.id === id)
    ) {
      return;
    }
    this.transactionSearchResult = null;
    const result = await this.searchApi.searchForTransactionByIdQuery.execute({
      id,
    });
    if (result) {
      const txSearchResult = result.data.transactions[0];
      if (isNotNull(txSearchResult)) {
        runInAction(() => {
          this.transactionSearchResult = transactionDetailsTransformer(
            txSearchResult
          );
        });
      }
    }
  };
}
