import { action, computed, observable, runInAction } from 'mobx';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { addressDetailTransformer } from '../address/api/transformers';
import { IAddressDetail } from '../address/types';
import { blockDetailsTransformer } from '../blocks/api/transformers';
import { IBlockDetailed } from '../blocks/types';
import { epochDetailsTransformer } from '../epochs/api/transformers';
import { IEpochDetails } from '../epochs/types';
import { transactionDetailsTransformer } from '../transactions/api/transformers';
import { ITransactionDetails } from '../transactions/types';
import { SearchApi } from './api';
import {
  INavigationFeatureDependency,
  INetworkInfoFeatureDependency,
  SearchActions,
} from './index';

export enum SearchType {
  address = 'Address',
  id = 'ID',
  number = 'Number',
  unknown = 'Unknown',
}

export class SearchStore extends Store {
  @observable public addressSearchResult: IAddressDetail | null = null;
  @observable public blockSearchResult: IBlockDetailed | null = null;
  @observable public epochSearchResult: IEpochDetails | null = null;
  @observable public transactionSearchResult: ITransactionDetails | null = null;

  private readonly searchApi: SearchApi;
  private readonly searchActions: SearchActions;
  private readonly navigation: INavigationFeatureDependency;
  private readonly networkInfo: INetworkInfoFeatureDependency;

  constructor(
    searchActions: SearchActions,
    searchApi: SearchApi,
    navigation: INavigationFeatureDependency,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    this.searchApi = searchApi;
    this.searchActions = searchActions;
    this.navigation = navigation;
    this.networkInfo = networkInfo;

    this.registerActions(
      createActionBindings([
        [
          this.searchActions.addressSearchRequested,
          this.onAddressSearchRequested,
        ],
        [
          this.searchActions.blockNumberSearchRequested,
          this.onSearchByBlockNumberRequested,
        ],
        [this.searchActions.idSearchRequested, this.onIdSearchRequested],
        [
          this.searchActions.epochNumberSearchRequested,
          this.onSearchByEpochNumberRequested,
        ],
        [this.searchActions.searchById, this.searchById],
        [this.searchActions.searchForAddress, this.searchForAddress],
        [
          this.searchActions.searchForBlockByNumber,
          this.searchForBlockByNumber,
        ],
        [
          this.searchActions.searchForEpochByNumber,
          this.searchForEpochByNumber,
        ],
        [
          this.searchActions.unknownSearchRequested,
          this.onUnknownSearchRequested,
        ],
      ])
    );
  }

  @computed get isSearching() {
    return (
      this.searchApi.searchForAddressQuery.isExecuting ||
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.searchApi.searchByIdQuery.isExecuting ||
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.searchApi.searchForEpochByNumberQuery.isExecuting
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  private onAddressSearchRequested = async ({
    address,
  }: {
    address: string;
  }) => {
    this.navigation.actions.goToAddressDetailsPage.trigger({ address });
  };

  /**
   * Executes query for entities by ID, determining the intent from the result
   *
   * Redirects to the corresponding search result or "no result" page.
   *
   * @param id
   */
  private onIdSearchRequested = async ({ id }: { id: string }) => {
    const result = await this.searchApi.searchByIdQuery.execute({
      id,
    });
    let path = '';
    if (result?.data.blocks.length > 0) {
      const blockData = result.data.blocks[0];
      if (isNotNull(blockData)) {
        runInAction(() => {
          this.blockSearchResult = blockDetailsTransformer(blockData);
        });
        path = `/block?id=${id}`;
      }
    } else if (result?.data.transactions.length > 0) {
      const txSearchResult = result.data.transactions[0];
      if (isNotNull(txSearchResult)) {
        runInAction(() => {
          this.transactionSearchResult = transactionDetailsTransformer(
            txSearchResult
          );
        });
        path = `/transaction?id=${id}`;
      }
    } else {
      return this.onUnknownSearchRequested({ query: id });
    }
    if (path !== '') {
      this.navigation.actions.redirectTo.trigger({ path });
    }
  };

  @action private onSearchByBlockNumberRequested = async (params: {
    number: number;
  }) => {
    await this.searchForBlockByNumber({ number: params.number });
    if (this.blockSearchResult?.id) {
      this.navigation.actions.goToBlockDetailsPage.trigger({
        id: this.blockSearchResult?.id,
      });
    }
  };

  private onSearchByEpochNumberRequested = async (params: {
    number: number;
  }) => {
    this.navigation.actions.goToEpochDetailsPage.trigger({
      number: params.number,
    });
  };

  private onUnknownSearchRequested = async (params: { query: string }) => {
    this.navigation.actions.redirectTo.trigger({
      path: `/no-search-results?query=${params.query}`,
    });
  };

  @action private searchForAddress = async ({
    address,
  }: {
    address: string;
  }) => {
    // Do not execute queries more than necessary!
    if (
      this.searchApi.searchForAddressQuery.isExecuting ||
      this.addressSearchResult?.address === address
    ) {
      return;
    }
    this.addressSearchResult = null;
    const result = await this.searchApi.searchForAddressQuery.execute({
      address,
    });
    if (result) {
      const { data } = result;
      if (isNotNull(data)) {
        runInAction(() => {
          this.addressSearchResult = addressDetailTransformer(address, data);
        });
      }
    }
  };

  @action private searchById = async ({ id }: { id: string }) => {
    // Do not execute queries more than necessary!
    if (
      this.searchApi.searchByIdQuery.isExecuting ||
      this.blockSearchResult?.id === id ||
      this.transactionSearchResult?.id === id
    ) {
      return;
    }
    this.blockSearchResult = null;
    this.transactionSearchResult = null;
    return this.onIdSearchRequested({ id });
  };

  @action private searchForBlockByNumber = async (params: {
    number: number;
  }) => {
    // Do not trigger another search if we already have the requested data!
    if (
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.blockSearchResult?.number === params.number
    ) {
      return;
    }
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByNumberQuery.execute(
      params
    );
    if (result.data) {
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
      this.epochSearchResult?.number === params.number
    ) {
      return;
    }
    this.epochSearchResult = null;
    const result = await this.searchApi.searchForEpochByNumberQuery.execute(
      params
    );
    if (result.data) {
      const epochData = result.data.epochs[0];
      if (isNotNull(epochData)) {
        runInAction(() => {
          this.epochSearchResult = epochDetailsTransformer(
            epochData,
            this.networkInfo.store
          );
        });
      }
    }
  };
}
