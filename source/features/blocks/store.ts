import { action, computed, observable, runInAction } from 'mobx';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { GraphQLRequestVariables } from '../../lib/graphql/GraphQLRequest';
import Reaction, { createReactions } from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
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
    this.blocksActions = blocksActions;
    Object.assign(this, {
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
    const result = await this.fetchBlocksInRange({ lower, upper });
    if (result) {
      runInAction(() => {
        this.latestBlocks = result;
      });
    }
  };

  /**
   * Fetches the blocks in given range.
   */
  @action public browseBlocks = async ({
    lower,
    upper,
  }: ActionProps<typeof BlocksActions.prototype.browseBlocks>): Promise<
    void
  > => {
    const result = await this.fetchBlocksInRange({ lower, upper });
    if (result) {
      runInAction(() => {
        this.browsedBlocks = result;
      });
    }
  };

  @action public startPollingLatestBlocks = () => {
    this.startReactions(this.latestBlocksReactions);
  };

  @action public stopPollingLatestBlocks = () => {
    this.stopReactions(this.latestBlocksReactions);
  };

  @action protected transformBrowsedBlocksResult = ():
    | IBlockOverview[]
    | null => {
    const { result } = this.blocksApi.getBlocksInRangeQuery;
    return (
      result?.blocks.filter(isNotNull).map(blockOverviewTransformer) ?? null
    );
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
   * Fetches blocks in given range and returns the result.
   */
  private fetchBlocksInRange = async (
    params: GraphQLRequestVariables<
      typeof BlocksApi.prototype.getBlocksInRangeQuery
    >
  ): Promise<IBlockOverview[] | null> => {
    const { getBlocksInRangeQuery } = this.blocksApi;
    // Wait for potential current execution (only supports one queued query)
    if (getBlocksInRangeQuery.isExecuting) {
      return null;
    }
    await getBlocksInRangeQuery.execute(params);
    return this.transformBrowsedBlocksResult();
  };
}
