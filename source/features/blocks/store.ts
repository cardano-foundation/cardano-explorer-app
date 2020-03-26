import { isNumber } from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { GraphQLRequestVariables } from '../../lib/graphql/GraphQLRequest';
import Reaction, { createReactions } from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { isDefined } from '../../lib/types';
import { BlocksApi } from './api';
import { blockOverviewTransformer } from './api/transformers';
import { BlocksActions, INetworkInfoFeatureDependency } from './index';
import { IBlockOverview } from './types';

export class BlocksStore extends Store {
  @observable public latestBlocks: IBlockOverview[] = [];
  @observable public browsedBlocks: IBlockOverview[] = [];

  private readonly blocksActions: BlocksActions;
  private readonly blocksApi: BlocksApi;
  private readonly networkInfo: INetworkInfoFeatureDependency;
  private readonly latestBlocksReactions: Reaction[];

  constructor(
    blocksActions: BlocksActions,
    blocksApi: BlocksApi,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    Object.assign(this, {
      blocksActions,
      blocksApi,
      networkInfo,
    });

    this.registerActions(
      createActionBindings([
        [this.blocksActions.browseBlocks, this.browseBlocks],
        [this.blocksActions.fetchLatestBlocks, this.fetchLatestBlocks],
        [
          this.blocksActions.startPollingLatestBlocks,
          this.startPollingLatestBlocks,
        ],
        [
          this.blocksActions.stopPollingLatestBlocks,
          this.stopPollingLatestBlocks,
        ],
      ])
    );
    this.latestBlocksReactions = createReactions([
      this.fetchLatestBlocksOnNetworkBlockHeightChange,
    ]);
  }

  // ============ COMPUTED GETTERS =============

  @computed get isLoadingLatestBlocksFirstTime() {
    const { getBlocksInRangeQuery } = this.blocksApi;
    return (
      !getBlocksInRangeQuery.hasBeenExecutedAtLeastOnce ||
      getBlocksInRangeQuery.isExecutingTheFirstTime
    );
  }

  // ============ ACTION HANDLERS =============

  /**
   * Fetches the latest 10 blocks.
   */
  @action public fetchLatestBlocks = async (): Promise<void> => {
    const { blockHeight } = this.networkInfo.store;
    const upper = blockHeight;
    const lower = Math.max(0, upper - 9);
    const result = await this.fetchBlocksInRange({
      lower,
      upper,
    });
    if (result) {
      runInAction(() => {
        this.latestBlocks = result;
      });
    }
  };

  /**
   * Fetches the blocks in given range.
   */
  public browseBlocks = async (
    params: ActionProps<typeof BlocksActions.prototype.browseBlocks>
  ): Promise<void> => {
    let result: IBlockOverview[] | null;
    const offset = (params.page - 1) * params.perPage;
    const limit = params.perPage;
    if (isNumber(params.epoch)) {
      result = await this.fetchBlocksInEpoch({
        epoch: params.epoch,
        limit,
        offset,
      });
    } else {
      result = await this.fetchBlocksInRange({
        lower: offset,
        upper: offset + limit,
      });
    }

    runInAction(() => {
      if (result) {
        this.browsedBlocks = result;
      }
    });
  };

  @action public startPollingLatestBlocks = () => {
    this.startReactions(this.latestBlocksReactions);
  };

  @action public stopPollingLatestBlocks = () => {
    this.stopReactions(this.latestBlocksReactions);
  };

  // ============ REACTIONS =============

  /**
   * Re-fetches blocks whenever the network block height changes.
   */
  private fetchLatestBlocksOnNetworkBlockHeightChange = () => {
    const { getBlocksInRangeQuery } = this.blocksApi;
    const networkStore = this.networkInfo.store;
    const { blockHeight } = networkStore;
    if (
      !blockHeight ||
      getBlocksInRangeQuery.isExecuting ||
      networkStore.isFetching ||
      (this.latestBlocks.length > 0 &&
        this.latestBlocks[0].number === blockHeight)
    ) {
      return;
    }
    this.blocksActions.fetchLatestBlocks.trigger();
  };

  // ============ HELPERS =============

  /**
   * Fetches blocks in given range.
   */
  private fetchBlocksInRange = async (
    params: GraphQLRequestVariables<
      typeof BlocksApi.prototype.getBlocksInRangeQuery
    >
  ): Promise<IBlockOverview[] | null> => {
    const { getBlocksInRangeQuery } = this.blocksApi;
    try {
      const result = await getBlocksInRangeQuery.execute(params);
      return (
        result?.blocks.filter(isDefined).map(blockOverviewTransformer) ?? null
      );
    } catch (error) {
      return null;
    }
  };

  /**
   * Fetches blocks in given epoch.
   */
  private fetchBlocksInEpoch = async (
    params: GraphQLRequestVariables<
      typeof BlocksApi.prototype.getBlocksInEpochQuery
    >
  ): Promise<IBlockOverview[] | null> => {
    const { getBlocksInEpochQuery } = this.blocksApi;
    try {
      const result = await getBlocksInEpochQuery.execute(params);
      return (
        result?.blocks.filter(isDefined).map(blockOverviewTransformer) ?? null
      );
    } catch (error) {
      return null;
    }
  };
}
